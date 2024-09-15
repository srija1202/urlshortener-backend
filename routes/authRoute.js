const express = require('express');
const { register, login, forgetPassword, resetPassword, activateAccount } = require('../controllers/authController');
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Forgot password route
router.post('/forget-password', forgetPassword);

// Reset password route
router.post('/reset-password/:token', resetPassword);

// Account activation route
router.get('/activate/:token', activateAccount);

module.exports = router;
