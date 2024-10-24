const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return Promise.reject(new Error("unauthorized"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return Promise.reject(new Error("unauthorized 2"));
  }
};
