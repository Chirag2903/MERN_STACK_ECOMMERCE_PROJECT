const catchAsyncErrors = require("../middleware/catchasyncerror")
const User = require("../models/usermodel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary");


//Register our User
exports.registeruser = catchAsyncErrors( async (req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

const {name,email,password} = req.body;

const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
// const token  = user.getJWTToken();
// res.status(201).json({success:true,token});
//iske badle ek function bana kar call kar diya
sendToken(user,201,res);
});



//Login User 
exports.loginuser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}= req.body;
  // check if user has given password and email both
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }

   const user = await User.findOne({email}).select("+password");

    if(!user){
       return next(new ErrorHandler("Invlid Email and Password ",401) )
    }

    const ispasswordmatched = await user.comparePassword(password)  //Ye comparePassword wala function maine userSchema mein likha h(usermodel.js)
    if(!ispasswordmatched){
        return next(new ErrorHandler("Invlid Email and Password ",401) )
     }
 sendToken(user,200,res);
})




//Logout User
exports.logout = catchAsyncErrors(async(req,res,next)=>{
res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
})


res.status(200).json({
    success:true,
    message:"Logged out"
})
})



//Forgot Password 
exports.forgotpassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User Not Found ",404));
    }

    //Get ResetPassword Token;
    const resetToken = user.getResetpasswordToken();

    await user.save({validateBeforeSave:false});

    const resetpasswordurl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message =`Your Password reset Token is :- \n\n ${resetpasswordurl}\n\nIf you have not requested this email then, please ignore it`;

    try{
        await sendEmail({
            email:user.email,
            subject:' Password recovery ',
            message
        })
        
        // Await lagaya h toh jab tak woh nhi hoga toh niche wala run nhi hoga
        res.status(200).json({
            success:true,
            message : `Email sent to ${user.email} successfully`
        })
    }
    catch(error){
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;

    await user.save({validateBeforeSave:false});

    return next(new ErrorHandler(error.message,500));

    }

})



//Reset Password 
 exports.resetpassword = catchAsyncErrors(async(req,res,next)=>{

    const resetpasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetpasswordToken,resetpasswordExpire:{
$gt:Date.now()
        }
    })
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",404));
    }
    if(req.body.password!==req.body.confirmpassword){
        return next(new ErrorHandler(" Password does not match ",400));
    }

    user.password = req.body.password;
    user.resetpasswordToken = undefined;
    user.resetpasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);

});



//Get User Details
exports.getuserdetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User .findById(req.user.id);
    res.status(200).json({
    success:true,user
   });
});



//Upate User Password
exports.updatepassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User .findById(req.user.id).select("+password");

    const ispasswordmatched = await user.comparePassword(req.body.oldpassword)  //Ye comparePassword wala function maine userSchema mein likha h(usermodel.js)
    if(!ispasswordmatched){
        return next(new ErrorHandler("Old Password is incorrect",400) )
     } 

     if(req.body.newpassword!==req.body.confirmpassword){
        return next(new ErrorHandler(" Password does not match",400) ) 
     }

     user.password= req.body.newpassword ;

     await user.save();

   sendToken(user,200,res);
});



//Upate User Profile
exports.updateprofile = catchAsyncErrors(async(req,res,next)=>{
    const newuserdata= {
        name:req.body.name,
        email:req.body.email
    } 


    if(req.body.avatar!==""){
        const user = await User.findById(req.user.id);

        const imageid= user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageid);

        const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",width:150,crop:"scale",
        })

        newuserdata.avatar = {
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
    }



    const user = await User.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

   res.status(200).json({
    success:true,
   })
});



//GET ALL USERS  Admin

exports.getalluser  = catchAsyncErrors(async(req,res,next)=>{
    const users  = await User.find();

    res.status(200).json({
        success:true,
        users
    });
});


//(Admin ko single user ki details dekhna ho)
exports.getsingleuser  = catchAsyncErrors(async(req,res,next)=>{
    const user  = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exit with id:${req.params.id}`,401));
    }

    res.status(200).json({
        success:true,
        user
    });
});

 
 
//User Role Update -->ADMIN
exports.updateuserrole = catchAsyncErrors(async(req,res,next)=>{
    const newuserdata= {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    } 
    const user = await User.findByIdAndUpdate(req.params.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

   res.status(200).json({
    success:true,
   })
});




//Delete User -->ADMIN
exports.deleteuser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exit with id :${req.params.id}`,404))
    }

    const imageid=user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageid);

    await user.deleteOne();

   res.status(200).json({
    success:true,message: "User Deleted Successfully",
   })
});