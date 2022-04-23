const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "JWTPRIVATEKEY");
    const userId = decodedToken.userId;

    console.log('UserId', userId)
    req.auth = { userId };
    if (!userId) {
      res.status(401).json({
        error: 'Invalid user!',
      })
    } else {
      next();
    }
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: 'Invalid token/user!' });
  }
}
