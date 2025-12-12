// backend/controllers/contactController.js
import nodemailer from 'nodemailer';
import { ContactFormSchema } from '../schemas/contactSchema.js';

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Configure the email transporter using environment variables
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * POST /api/contact
 * Public endpoint for general inquiries
 */
export const sendContactEmail = asyncHandler(async (req, res) => {
    // 1. Input Validation
    const result = ContactFormSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

    const { name, email, message } = result.data;
    
    // 2. Prepare Email Content
    const mailOptions = {
        // Sender is the configured account
        from: `"${name}" <${process.env.EMAIL_USER}>`, 
        // Receiver is the business owner
        to: process.env.CONTACT_RECEIVER, 
        subject: `New Inquiry from Commerce Site: ${name}`,
        html: `
            <h1>New Contact Form Submission</h1>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong></p>
            <p style="border: 1px solid #ccc; padding: 15px; background-color: #f9f9f9;">${message}</p>
            <p>Please reply directly to ${email} to contact the user.</p>
        `,
        // Reply-To header allows the owner to hit 'Reply' and respond directly to the user
        replyTo: email, 
    };

    // 3. Send Email
    const info = await transporter.sendMail(mailOptions);
    
    // Log the message ID for debugging (optional)
    console.log("Message sent: %s", info.messageId);

    // 4. Send success response
    res.status(200).json({ 
        message: 'Your message has been sent successfully. The owner will be in touch shortly.' 
    });
});