const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token

    // If no token is provided
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' });

        // Attach the decoded user ID to the request object
        req.user = decoded.userId;
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = { authenticateToken };
