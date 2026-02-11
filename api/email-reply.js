const { Resend } = require('resend');

/**
 * Serverless endpoint for automated email replies.
 * Pipeline: Zoho Mail → Make.com → This Endpoint → GitHub Models API → Resend
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
    const { from, subject, body } = req.body;

    // Validate required fields
    if (!from || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: from, subject, body' });
    }

    // Verify environment variables
    if (!process.env.GITHUB_PAT || !process.env.RESEND_API_KEY) {
      console.error('Missing GITHUB_PAT or RESEND_API_KEY environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log(`[email-reply] Processing email from: ${from}, subject: ${subject}`);

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
- Use a professional but warm tone.
- Address the sender's questions or concerns directly.
- Sign off as "Juniper Broz Investment Services".
- Do NOT include a subject line in the reply body.
- Format the reply as clean HTML paragraphs.`
          },
          {
            role: 'user',
            content: `Read the following client email and generate a professional reply:\n\nFrom: ${from}\nSubject: ${subject}\n\n${body}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error(`[email-reply] GitHub Models API error: ${aiResponse.status} - ${errText}`);
      return res.status(502).json({ error: 'AI service error', details: errText });
    }

    const aiData = await aiResponse.json();
    const aiReply = aiData.choices?.[0]?.message?.content;

    if (!aiReply) {
      console.error('[email-reply] No reply generated from AI');
      return res.status(502).json({ error: 'AI generated empty response' });
    }

    console.log(`[email-reply] AI reply generated (${aiReply.length} chars)`);

    // --- Step 2: Send Reply via Resend ---
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: 'Juniper Broz <myservice@resend.juniperbroz.com>',
      to: from,
      subject: `Re: ${subject}`,
      html: aiReply
    });

    if (emailResult.error) {
      console.error('[email-reply] Resend error:', emailResult.error);
      return res.status(502).json({ error: 'Email sending failed', details: emailResult.error });
    }

    console.log(`[email-reply] Reply sent successfully. Email ID: ${emailResult.data?.id}`);

    return res.status(200).json({
      success: true,
      emailId: emailResult.data?.id,
      aiReplyLength: aiReply.length
    });

  } catch (error) {
    console.error('[email-reply] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
