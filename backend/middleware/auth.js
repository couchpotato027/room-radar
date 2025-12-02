const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.query.token || 
                  req.body.token;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // For development, allow demo token
    if (token === 'demo-token-123') {
      // Try to get user from database or use demo user
      try {
        const user = await prisma.user.findUnique({
          where: { email: 'demo@roomradar.com' }
        });
        if (user) {
          req.user = { ...user, _id: user.id };
          return next();
        }
      } catch (e) {
        // Ignore
      }
      req.user = { id: 'demo-user-id', _id: 'demo-user-id' };
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const userId = decoded.id;
      
      if (!userId) {
        return res.status(401).json({ error: 'Invalid token: missing user ID' });
      }
      
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) }
      });
      
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      req.user = { ...user, _id: user.id };
      next();
    } catch (error) {
      console.error('JWT verification error:', error.message);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = auth;
