const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendActivationEmail, sendResetPasswordEmail } = require('../utils/emailService');

// Registration logic
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        
        // Send activation email
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        const activationUrl = `${process.env.FRONTEND_URL}/activate/${token}`;
        await sendActivationEmail(email, activationUrl);

        await newUser.save();
        res.json({ message: 'Registered successfully, please activate your account via email' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User does not exist' });
        if (!user.isActive) return res.status(400).json({ message: 'Account not activated' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Forgot password logic
exports.forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User does not exist' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        
        // Send reset password email
        await sendResetPasswordEmail(email, resetLink);
        res.json({ message: 'Reset password link sent to your email' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset password logic
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Account activation logic
exports.activateAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(400).json({ message: 'Invalid activation token' });

        user.isActive = true;
        await user.save();

        res.json({ message: 'Account activated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
