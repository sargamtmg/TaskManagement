const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateToken = (req, res, next) => {
  // const tokenHeader = req.headers["authorization"];
  // const token = tokenHeader && tokenHeader.split(" ")[1];
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({ message: "No JWT token provided." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token." });
    req.user = decodedUser;
    next();
  });
};
