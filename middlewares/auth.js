// middlewares/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  verifyToken,
};
