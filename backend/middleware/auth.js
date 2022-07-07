const ErrorHander = require("../utils/Errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next)=>{
    //just getting token value withhiout json object
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHander("Please login to access this resource",401));
    }

    //if have have token then 
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    //id is that which we created when creating jwt token
   req.user =  await User.findById(decodedData.id);

    next();

});

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHander(`Role:${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    };
};
