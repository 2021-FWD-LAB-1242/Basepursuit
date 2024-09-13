const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();

// OTP Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    try {
        const otp = generateOTP();
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, otp });
        } else {
            user.otp = otp;
        }

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

// Verify OTP and login
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        user.isVerified = true;
        user.otp = null;
        await user.save();

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP' });
    }
});

// Guest login
router.post('/guest-login', (req, res) => {
    const token = jwt.sign({ guest: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Guest login successful', token });
});

module.exports = router;
