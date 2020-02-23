const jwt = require('jsonwebtoken');
require('dotenv/config');

function auth(req, res, next) {
  const token = req.header('x-auth-token');  
  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });
  try {
    // Verify token
    const tokenPayload = jwt.verify(token, process.env.jwtSecret);
    // Add user from payload
    req.user = tokenPayload;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;