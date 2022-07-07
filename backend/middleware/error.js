const ErrorHandler = require("../utils/Errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongoDb Id error

  if (err.name === "CastError") {
    const message = `Resource not found. ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    // const message = "Duplicate email entered"
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;

    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "TokenExpireError") {
    const message = `Json web token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
