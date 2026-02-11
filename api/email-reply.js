const { Resend } = require('resend');
const { createClient } = require('redis'); // Using standard Redis for external URL

/**
 * Serverless endpoint for automated email replies.
 * Pipeline: Zoho Mail → Activepieces → This Endpoint → GitHub Models API → Resend
 */
module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret
  const authHeader = req.headers['authorization'];
  const expectedToken = `Bearer ${process.env.WEBHOOK_SECRET}`;
  if (!authHeader || authHeader !== expectedToken) {
    console.error('Unauthorized webhook call');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let { from, subject, body } = req.body;

    // Validate required fields
    if (!from || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: from, subject, body' });
    }

    // Verify environment variables
    if (!process.env.GITHUB_PAT || !process.env.RESEND_API_KEY) {
      console.error('Missing GITHUB_PAT or RESEND_API_KEY environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // --- RATE LIMITING CHECK ---
    // Key format: rate_limit:user_email:YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    const rateLimitKey = `rate_limit:${from}:${today}`;

    let alreadyReplied = false;
    let redisClient = null;

    if (process.env.REDIS_URL) {
      try {
        redisClient = createClient({ url: process.env.REDIS_URL });
        await redisClient.connect();
        
        const value = await redisClient.get(rateLimitKey);
        if (value) {
          alreadyReplied = true;
          console.log(`[Rate Limit] Skipping reply to ${from} (already replied today).`);
        }
      } catch (redisError) {
        console.error('[Rate Limit] Redis connection error:', redisError.message);
        // We continue anyway even if Redis fails, but rate limiting won't work
      }
    } else {
      console.warn('[Rate Limit] REDIS_URL not configured. Infinite loop protection disabled.');
    }

    if (alreadyReplied) {
      if (redisClient) await redisClient.disconnect();
      return res.status(200).json({ 
        skipped: true, 
        reason: 'Rate limit exceeded: One reply per sender per day.' 
      });
    }

    console.log(`[email-reply] Initial data - From: ${from}, Subject: ${subject}`);

    // --- SMART PARSING FOR CONTACT FORM SUBMISSIONS ---
    const isContactForm = from.includes('resend.juniperbroz.com') || subject.includes('New Contact Form Submission');
    
    if (isContactForm) {
      console.log('[email-reply] Detected Contact Form notification. Parsing body...');
      const emailMatch = body.match(/Email:\s*([^\s<>]+)/i) || body.match(/Email:\s*<([^>]+)>/i);
      const nameMatch = body.match(/Name:\s*(.+?)(?=\s*Email:|$)/i);

      if (emailMatch && emailMatch[1]) {
        from = emailMatch[1].trim(); 
        console.log(`[email-reply] Extracted real client email: ${from}`);
      } else {
        console.warn('[email-reply] Parser FAILED: Could not extract client email from body');
        if (redisClient) await redisClient.disconnect();
        return res.status(200).json({ success: false, reason: 'unparseable_contact_form_email' });
      }

      const clientName = nameMatch ? nameMatch[1].trim() : 'Client';
      body = `[CONTEXT: This is a website contact form submission from ${clientName}]\n\nRAW MESSAGE: ${body}`;
    }

    // --- Step 1: Generate AI Reply via GitHub Models API ---
    const aiResponse = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_PAT}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional email assistant for Juniper Broz Investment Services. 
Write polite, clear, and concise email replies. 
- Tone: Professional, warm, and helpful.
- Sign off: "Juniper Broz Investment Services".
- Format: Clean HTML paragraphs.`
          },
          {
            role: 'user',
            content: `Generate a professional reply to this client email:\n\nClient: ${from}\nSubject: ${subject}\n\nContent: ${body}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error(`[email-reply] AI Error: ${aiResponse.status} - ${errText}`);
      if (redisClient) await redisClient.disconnect();
      return res.status(502).json({ error: 'AI service unreachable' });
    }

    const aiData = await aiResponse.json();
    const aiReply = aiData.choices?.[0]?.message?.content;

    if (!aiReply) {
      if (redisClient) await redisClient.disconnect();
      return res.status(502).json({ error: 'AI generated no content' });
    }

    // --- Step 2: Send Reply via Resend ---
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailResult = await resend.emails.send({
      from: 'Juniper Broz <myservice@resend.juniperbroz.com>',
      to: from,
      subject: `Re: ${subject.replace('New Contact Form Submission from', 'Inquiry from')}`,
      html: aiReply
    });

    if (emailResult.error) {
      console.error('[email-reply] Resend send error:', emailResult.error);
      if (redisClient) await redisClient.disconnect();
      return res.status(502).json({ error: 'Email sending failed' });
    }

    // --- SET RATE LIMIT AFTER SUCCESSFUL SEND ---
    if (redisClient) {
      try {
        await redisClient.set(rateLimitKey, 'sent', { EX: 86400 });
        console.log(`[Rate Limit] Marked ${from} as replied for today.`);
        await redisClient.disconnect();
      } catch (limitError) {
        console.error('[Rate Limit] Error setting limit:', limitError.message);
      }
    }

    console.log(`[email-reply] SUCCESS: Reply sent to ${from}`);

    return res.status(200).json({
      success: true,
      emailId: emailResult.data?.id
    });

  } catch (error) {
    console.error('[email-reply] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
