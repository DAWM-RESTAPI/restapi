const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Asegúrate de definir esto en tu .env

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader); // Logging para depuración

  if (!authHeader) {
    return res.status(408).send('Request Timeout. No token provided.');
  }


  const token = authHeader;
  console.log('Extracted Token:', token); // Logging para depuración

  if (!token) {
    return res.status(408).send('Request Timeout. Invalid token format.');
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    console.log('Decoded Token:', decodedToken); // Logging para depuración
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(408).send('Request Timeout. Invalid token.');
  }
};
