const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong MONGODB ID ERROR
  //  What if wrong id ho toh for egs sab id length ki length same hoti hai agar 7 hai lenght aur maine 5 dala toh handle karna padega isliye ye part 
  if(err.name ==="CastError"){
    const message = `Resources Not found. Invalid :${err.path}`;
    err = new ErrorHandler(message,400);
  }

  //MongoDB duplicate key error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,400);
  }


  //Wrong JWT error
  if(err.code === "JsonWebTokenError"){
    const message = `Json Web Token is invalid , try again`;
    err = new ErrorHandler(message,400);
  }

  // JWT expire error 
  if(err.code === "ToekenExpiredError"){
    const message = `Json Web Token is Expired , try again`;
    err = new ErrorHandler(message,400);
  }


 res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
