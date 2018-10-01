const jwt = require('jsonwebtoken');
var handleError = require('../config/app');

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    handleError(res, error.message, 'Autoryzacja nie powiodła się.', 401);
  }
};

module.exports = verifyToken;