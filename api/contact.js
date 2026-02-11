const { Resend } = require('resend');

/**
 * Serverless function to handle contact form submissions via Resend
 * Sends two emails:
 * 1. Notification to the business owner
 * 2. Instant auto-reply to the client
 */
module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, investmentGoal, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'myservice@juniperbroz.com';
    const resend = new Resend(process.env.RESEND_API_KEY);

    // --- Email 1: Notification to Business ---
    const adminEmailPromise = resend.emails.send({
      from: 'Juniper Broz <myservice@resend.juniperbroz.com>',
      to: contactEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Investment Interest:</strong> ${investmentGoal || 'Not specified'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    // --- Email 2: Instant Auto-Reply to Client ---
    const clientReplyPromise = resend.emails.send({
      from: 'Juniper Broz <myservice@resend.juniperbroz.com>',
      to: email,
      subject: `Thank you for contacting Juniper Broz`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <h3>Hello ${name},</h3>
          <p>Thank you for reaching out to Juniper Broz Investment Services. We have received your message regarding <strong>${investmentGoal || 'investment opportunities'}</strong>.</p>
          <p>This is an automated confirmation to let you know your inquiry is in our queue. Our team is reviewing your message and will get back to you shortly with a more detailed response.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Juniper Broz Investment Services</strong></p>
          <p><a href="https://juniperbroz.com" style="color: #0066cc;">juniperbroz.com</a></p>
        </div>
      `
    });

    // Send both in parallel
    const [adminResult, clientResult] = await Promise.all([adminEmailPromise, clientReplyPromise]);

    if (adminResult.error) {
      console.error('Resend error (admin email):', adminResult.error);
      // We still return success to the frontend if client email potentially worked, 
      // but log the error. 
    }

    if (clientResult.error) {
      console.error('Resend error (client auto-reply):', clientResult.error);
    }

    console.log(`Emails sent. Admin ID: ${adminResult.data?.id}, Client ID: ${clientResult.data?.id}`);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
