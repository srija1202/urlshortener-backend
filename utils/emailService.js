const nodemailer = require('nodemailer');

// Setup transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'yahoo', 'hotmail', or custom SMTP
    auth: {
        user: process.env.EMAIL_USER, // Your email address from the .env file
        pass: process.env.EMAIL_PASS, // Email password from .env
    },
});

// Function to send activation email
exports.sendActivationEmail = async (email, activationUrl) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Activate Your Account',
        html: `<p>Click <a href="${activationUrl}">here</a> to activate your account.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Failed to send activation email');
    }
};

// Function to send reset password email
exports.sendResetPasswordEmail = async (email, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Failed to send reset password email');
    }
};
