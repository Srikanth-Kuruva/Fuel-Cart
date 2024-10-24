import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fuelcart.2025@gmail.com',  
    pass: 'hufo qyom vvjg mftv'  // Consider using environment variables for security
  },
});

// POST route for helpline requests
router.post('/request', async (req, res) => {
  const { name, contact, issue } = req.body;

  // Validate input fields
  if (!name || !contact || !issue) {
    return res.status(400).json({ success: false, message: 'Please fill all the fields' });
  }

  try {
    // Set up email options
    const mailOptions = {
      from: 'fuelcart.2025@gmail.com',
      to: 'fuelcart.2025@gmail.com', // You can change this to another email if needed
      subject: 'New Helpline Request',
      html: `
        <h2>New Helpline Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Issue:</strong> ${issue}</p>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a success response
    return res.status(200).json({ success: true, message: 'Helpline request submitted and email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
  }
});

export default router;
