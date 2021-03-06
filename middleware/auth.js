const jwt = require("jsonwebtoken");

const tokenKey = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token;

  if (!token) {
    return res.status(403).send("Only admin may access this route");
  }
  try {
    const decoded = jwt.verify(token, tokenKey);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
