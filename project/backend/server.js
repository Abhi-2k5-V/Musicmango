const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Turn off CSP if serving SPA in production to simplify assets loading
}));
app.use(cors());
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// Rate limiter for contact submissions (max 5 requests per 15 mins per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Test email delivery route
app.get('/api/test-email', async (req, res) => {
  const isMockMode = !process.env.EMAIL_PASS || 
                     process.env.EMAIL_PASS === 'change-me-to-your-app-password';
  if (isMockMode) {
    return res.status(500).json({
      success: false,
      message: 'Server is in MOCK MODE. No real email sent. Please configure a valid EMAIL_PASS app password in .env to test real delivery.'
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: `"Music Mango Test" <${process.env.EMAIL_USER || process.env.EMAIL_TO || 'musicmangoaudios@gmail.com'}>`,
      to: process.env.EMAIL_TO || 'musicmangoaudios@gmail.com',
      subject: 'Music Mango SMTP Test Email',
      text: 'SMTP configuration is working correctly! Real emails will be delivered.',
      html: '<p>SMTP configuration is working correctly! Real emails will be delivered.</p>'
    });
    res.status(200).json({ success: true, message: 'Test email sent successfully to musicmangoaudios@gmail.com!' });
  } catch (error) {
    console.error('SMTP Test Error:', error);
    res.status(500).json({ success: false, message: `SMTP verification failed: ${error.message}` });
  }
});

// Contact form API route
app.post(
  '/api/contact',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').trim().isEmail().withMessage('A valid email address is required').normalizeEmail(),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 digits'),
    body('service').trim().notEmpty().withMessage('Service selection is required').escape(),
    body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters').escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, phone, service, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    console.log(`[Inquiry Received] ${timestamp} - Name: ${name}, Email: ${email}, Service: ${service}`);

    // Check if SMTP is configured (fallback to mock for testing)
    const isMockMode = !process.env.EMAIL_PASS || 
                       process.env.EMAIL_PASS === 'change-me-to-your-app-password' || 
                       process.env.EMAIL_USER === 'musicmangoaudios@gmail.com' && process.env.EMAIL_PASS === 'change-me-to-your-app-password';

    if (isMockMode) {
      console.warn('⚠️ SMTP credentials not configured in .env. Form submission handled in MOCK MODE.');
      console.log('--- MOCK EMAIL OUTBOX ---');
      console.log(`To: ${process.env.EMAIL_TO || 'musicmangoaudios@gmail.com'}`);
      console.log(`Subject: New Music Mango Website Inquiry - ${name}`);
      console.log(`Body:\n
        Customer Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Service Required: ${service}
        Message: ${message}
        Date & Time: ${timestamp} (IST)
      `);
      console.log('-------------------------');

      return res.status(500).json({
        success: false,
        message: 'Email delivery is not configured on this server (Mock Mode is active). Please configure SMTP credentials in .env to send real emails.'
      });
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER || process.env.EMAIL_TO || 'musicmangoaudios@gmail.com'}>`, // Send on behalf of client via authenticated SMTP user
      to: process.env.EMAIL_TO || 'musicmangoaudios@gmail.com',
      replyTo: email,
      subject: `New Music Mango Website Inquiry - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #F08A1A 0%, #F6C000 100%); padding: 20px; text-align: center; color: black;">
            <h2 style="margin: 0; font-size: 24px;">New Website Inquiry</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">Music Mango Audio & Video Creations</p>
          </div>
          <div style="padding: 24px; background: #fff; color: #333; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #eee;">Customer Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Service Required:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #F08A1A; font-weight: bold;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Date & Time (IST):</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${timestamp}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #F08A1A; border-radius: 4px;">
              <h4 style="margin: 0 0 8px 0; color: #333;">Message:</h4>
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #555;">${message}</p>
            </div>
          </div>
          <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #eee;">
            This email was automatically generated by the Music Mango website contact form.
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Inquiry sent successfully!' });
    } catch (error) {
      console.error('Nodemailer Error:', error);
      res.status(500).json({ success: false, message: 'Failed to send inquiry email. Please try again later.' });
    }
  }
);

// Fallback index.html for React router support in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Music Mango server is running on port ${PORT}`);
});
