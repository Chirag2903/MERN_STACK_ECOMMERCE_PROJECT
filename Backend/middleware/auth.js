const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror = require("./catchasyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");



exports.isauthenticateduser = catchasyncerror(async (req,res,next)=>{
const {token} =req.cookies;
// console.log(token);
if(!token){
    next(new ErrorHandler("Please Login to access this resources",401));
}

const decodeddata= jwt.verify(token,process.env.JWT_SECRET);

req.user= await User.findById(decodeddata.id);
 
next();
})


exports.authorizerole= (...roles)=>{


    return (req,res,next)=>{


        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resources`,403))

        }
        next();
    }
}