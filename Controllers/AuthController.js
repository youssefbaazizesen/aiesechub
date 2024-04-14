const User = require("../User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Convert the secret keys to base64 encoding
const base64EncodedSecret = Buffer.from('securedkeymustbeverylongorgetbug69').toString('base64');
const base64EncodedRefreshSecret = Buffer.from('refreshkeymustbeverylongorgetbug69').toString('base64');

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Address not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      base64EncodedSecret,
      {
        // Token expiration time (adjust as needed)
        expiresIn: "1m", 
        algorithm: 'HS256', // Make sure this is consistent
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      base64EncodedRefreshSecret,
      {
        expiresIn: "1m", // Refresh token expiration time (adjust as needed)
      }
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Authentication failed" });
  }
}

function refreshToken(req, res) {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, base64EncodedRefreshSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      base64EncodedSecret,
      {
        expiresIn: '1m', // Token expiration time (adjust as needed)
      }
    );

    res.json({ accessToken });
  });
}

module.exports = {
  loginUser,
  refreshToken
};
