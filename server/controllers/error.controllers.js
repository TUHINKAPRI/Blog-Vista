const CustomError = require("../utils/CustomErrors");

exports.globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "Error";
  err.statusCode = err.statusCode || 500;
  if(err.code===11000&& err.keyValue?.email){
     err=new CustomError(`Eamil is already presend in the db`,400)
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Internal server error",
  });
};
