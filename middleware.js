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

//stocker le token dans le locale stoge aprés le login
//a chque requete envoyer le token dans headers autorisation qui est stocké dans  le locale storge

/*
mport axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
"autorisation ": "brearer token",
  }
})

import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
"autorisation ": "brearer "+localestorge.getItem("token")
  }
});
*/