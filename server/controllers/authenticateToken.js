const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({ message: "No JWT token provided." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token." });
    console.log("decoded user : " + JSON.stringify(decodedUser));
    req.user = decodedUser;
    next();
  });
};
