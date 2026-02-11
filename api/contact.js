const { Resend } = require('resend');
const nodemailer = require('nodemailer');

/**
 * Serverless function to handle contact form submissions
 * Sends two emails:
 * 1. Notification to the business owner (via Resend)
 * 2. Instant auto-reply to the client (via Zoho SMTP/NodeMailer to save Resend quota)
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

    // --- Email 1: Notification to Business (via Resend) ---
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

    // --- Email 2: Instant Auto-Reply to Client (via NodeMailer/Zoho SMTP) ---
    // This saves Resend quota by using your Zoho account directly.
    let clientReplyPromise;
    if (process.env.ZOHO_EMAIL && process.env.ZOHO_PASSWORD) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ZOHO_EMAIL,
                pass: process.env.ZOHO_PASSWORD
            }
        });

        clientReplyPromise = transporter.sendMail({
            from: `"Juniper Broz" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: 'Thank you for contacting Juniper Broz',
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
    } else {
        console.warn('ZOHO_EMAIL or ZOHO_PASSWORD missing. Falling back to Resend for auto-reply.');
        clientReplyPromise = resend.emails.send({
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
    }

    // Send both in parallel
    const [adminResult, clientResult] = await Promise.all([adminEmailPromise, clientReplyPromise]);

    if (adminResult.error) {
      console.error('Resend error (admin email):', adminResult.error);
    }

    console.log(`Contact form results: Admin Notification sent. Client Auto-reply processed.`);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
