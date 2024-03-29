//A middleware to authenticate the user based on the Authorization header.
//Header must be in form of, 
//bearer "jwtToken.from.localstorage"

const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.jwtSECRET;
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, number) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log(number);
      req.number = number.phoneNumber;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJwt,
  SECRET,
};
