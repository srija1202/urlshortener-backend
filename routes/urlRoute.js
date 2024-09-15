const express = require('express');
const { shortenUrl, redirectUrl, getAnalytics, getClickedUrls } = require('../controllers/urlController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Shorten URL route
router.post('/shorten', authenticateToken, shortenUrl);

// Get URLs clicked by the user
router.get('/clicked-urls', authenticateToken, getClickedUrls);

// Redirect to original URL
router.get('/:shortUrl', redirectUrl);

module.exports = router;
