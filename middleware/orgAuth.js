const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header (use a dedicated org-specific header)
  const token = req.header('x-org-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No organization token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.org = decoded.org; // { id: org._id }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Organization token is not valid' });
  }
};
