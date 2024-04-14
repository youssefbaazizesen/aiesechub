const jwt = require('jsonwebtoken');

function refreshVerifyToken(req, res, next) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is missing' });
  }

  jwt.verify(refreshToken, 'refreshkeymustbeverylongorgetbug69', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
}

module.exports = refreshVerifyToken;
