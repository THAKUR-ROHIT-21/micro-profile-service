const jwt = require('jsonwebtoken');

const JWT_SECRET =
  process.env.JWT_SECRET || 'change-this-in-production';

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      detail: 'Missing or invalid token',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });

    console.log('Decoded JWT payload:', payload);

    req.userId = Number.parseInt(payload.sub, 10);

    if (Number.isNaN(req.userId)) {
      return res.status(401).json({
        detail: 'Invalid user ID in token',
      });
    }

    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);

    return res.status(401).json({
      detail: 'Invalid or expired token',
    });
  }
}

module.exports = { requireAuth };