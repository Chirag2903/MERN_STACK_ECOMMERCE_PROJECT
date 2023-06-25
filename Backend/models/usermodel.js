const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type : String ,
        requied : [true,"Please Enter Your Name"],
        maxLength :[30,"Cannot exceed 30 characters"],
        minLenght :[4,"Name Should have more than 4 characters"]
    },
    email:{
        type : String ,
        requied : [true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type : String ,
        requied : [true,"Please Enter Your Email"],
        minLenght :[8,"Password Should have more than 4 characters"],
        select:false  // Jab bhi find( ) call karte h toh saari information aati hai , select false se password chhod kar sab info dega
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
    },
    role:{
         type:String,
         default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetpasswordToken: String,
    resetpasswordExpire: Date,
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,10); 
    //Dobara hash hone ke bachayega 
})


//JWT Token //jwt.sign function(web token banata ,id,secret key and expire time ko lekar )
// The userSchema.methods property is used to add instance methods to the user schema. These methods can be accessed on individual user instances.
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

// Comapre Paasowrd
userSchema.methods.comparePassword= async function(enteredpassword){
 return await bcrypt.compare(enteredpassword,this.password);            //Decrypt karna padega na password ko jo database mein save hai , compare karne ke liye
}
 

//Generating Password Reset token
userSchema.methods.getResetpasswordToken = function(){
 
    //Generating Token 
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to user schema 
    this.resetpasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    // konsa algorithm use karna hai isliye createHash , kya update karna hai aur output hex ke format mein chahiye warna buffer return hoga
    this.resetpasswordExpire = Date.now()+ 15*60*1000;
    return resetToken;
}


module.exports = mongoose.model("User",userSchema);