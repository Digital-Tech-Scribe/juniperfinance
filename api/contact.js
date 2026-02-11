const nodemailer = require('nodemailer');

/**
 * Serverless function to handle contact form submissions via Zoho SMTP
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

    // Verify environment variables are present
    if (!process.env.ZOHO_USER || !process.env.ZOHO_PASS) {
      console.error('Missing ZOHO credentials in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Configure Nodemailer with Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.ZOHO_USER, // Must match authenticated user
      to: process.env.ZOHO_USER,   // Sending to yourself
      replyTo: email,              // Allow replying directly to the user
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Investment Goal: ${investmentGoal || 'Not specified'}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Investment Goal:</strong> ${investmentGoal || 'Not specified'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
