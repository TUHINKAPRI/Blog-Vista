const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomErrors");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return next(new CustomError("Token not provided", 401));
  }
  jwt.verify(token, process.env.SECRECT_KEY, (err, user) => {
    if (err) {
      return next(new CustomError("Unauthorized", 401));
    }
    req.id = user.id;
    next();
  });
};
exports.verifyTokenAndAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token)
  if (!token) {
    return next(new CustomError("token not provided", 401));
  }
  jwt.verify(token, process.env.SECRECT_KEY, (err, decoded) => {
    if (err) {
      return next(new CustomError("Unauthorized", 401));
    }
    req.id = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next()
  });
};
