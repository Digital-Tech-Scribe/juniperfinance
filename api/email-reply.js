const { Resend } = require('resend');

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

    console.log(`[email-reply] Initial data - From: ${from}, Subject: ${subject}`);

    // --- SMART PARSING FOR CONTACT FORM SUBMISSIONS ---
    // Detect if the email is a system notification from the contact form
    const isContactForm = from.includes('resend.juniperbroz.com') || subject.includes('New Contact Form Submission');
    
    if (isContactForm) {
      console.log('[email-reply] Detected Contact Form notification. Parsing body...');

      // Improved Regex for extracting client email from single-line summaries
      // Matches "Email: value" until next keyword or space
      const emailMatch = body.match(/Email:\s*([^\s<>]+)/i) || body.match(/Email:\s*<([^>]+)>/i);
      
      // Matches "Name: value" until "Email:" or end
      const nameMatch = body.match(/Name:\s*(.+?)(?=\s*Email:|$)/i);

      if (emailMatch && emailMatch[1]) {
        from = emailMatch[1].trim(); 
        console.log(`[email-reply] Extracted real client email: ${from}`);
      } else {
        console.warn('[email-reply] Parser FAILED: Could not extract client email from body');
        // We log success but skip processing to prevent an error loop
        return res.status(200).json({ success: false, reason: 'unparseable_contact_form_email' });
      }

      const clientName = nameMatch ? nameMatch[1].trim() : 'Client';
      
      // Update body with context so the AI knows it's a form submission
      body = `[CONTEXT: This is a website contact form submission from ${clientName}]\n\nRAW MESSAGE: ${body}`;
    }

    // --- Step 1: Generate AI Reply via GitHub Models API ---
    console.log(`[email-reply] Calling AI for: ${from}`);
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
- Format: Clean HTML paragraphs.
- If it's a contact form summary, address the user's specific questions mentioned in the text.`
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
      return res.status(502).json({ error: 'AI service unreachable' });
    }

    const aiData = await aiResponse.json();
    const aiReply = aiData.choices?.[0]?.message?.content;

    if (!aiReply) {
      return res.status(502).json({ error: 'AI generated no content' });
    }

    // --- Step 2: Send Reply via Resend ---
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: 'Juniper Broz <myservice@resend.juniperbroz.com>',
      to: from, // Extracted client email
      subject: `Re: ${subject.replace('New Contact Form Submission from', 'Inquiry from')}`,
      html: aiReply
    });

    if (emailResult.error) {
      console.error('[email-reply] Resend send error:', emailResult.error);
      return res.status(502).json({ error: 'Email sending failed' });
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
