const { Resend } = require('resend');

/**
 * Serverless function to handle contact form submissions via Resend
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

    // Send email via Resend
    const result = await resend.emails.send({
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

    if (result.error) {
      console.error('Resend error:', result.error);
      return res.status(502).json({ error: 'Email sending failed', details: result.error });
    }

    console.log(`Contact form email sent. ID: ${result.data?.id}`);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
