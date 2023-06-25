const mongoose = require("mongoose");
 
const orderSchema = new mongoose.Schema({
    shippinginfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},

        state:{type:String,required:true},

        country:{type:String,required:true},
        pincode:{type:Number , required:true},
        phonenumber:{type:Number ,required:true}

    },
    orderitems:[{
        name:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
        image:{type:String,required:true},
        product:{type:mongoose.Schema.ObjectId,ref:"Product",required:true},
    }
    ],
    user:{
        type:mongoose.Schema.ObjectId,ref:"User",required:true
    },
    paymentinfo:{
        id:{type:String,required:true},
        status:{type:String,required:true}, 
    },
    paidat:{
      type:Date,required:true
    },
    itemsprice:{
        type:Number,default:0
      },
      taxprice:{
        type:Number,default:0
      },
      shippingprice:{
        type:Number,default:0
      },
      totalprice:{
        type:Number,default:0
      }
      ,orderstatus:{
        type:String,required:true,default:"Processing"
      },
      deliveredat :Date,
      createat:{
        type:Date,
        default:Date.now
      }
});

module.exports = mongoose.model("Order",orderSchema);