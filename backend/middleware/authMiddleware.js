const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Remove 'Bearer ' if it exists in the header
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    // Verify token using JWT_SECRET from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
