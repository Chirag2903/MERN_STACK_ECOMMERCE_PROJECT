const Order = require("../models/ordermodel");
const Product = require("../models/productmmodel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchasyncerror")


//Create New Order

exports.neworder = catchAsyncErrors(async(req,res,next)=>{

    const {shippinginfo,orderitems,paymentinfo,itemsprice,taxprice,shippingprice,totalprice}= req.body;
    
    const order = await Order.create({
        shippinginfo,orderitems,paymentinfo,itemsprice,taxprice,shippingprice,totalprice,paidat:Date.now(),user:req.user._id,
    });
    
    res.status(201).json({
        success:true,order
    })
    });
    
    
    //Get Single order 
    exports.getsingleorder = catchAsyncErrors(async(req,res,next)=>{
    
        const order = await Order.findById(req.params.id).populate("user","name email");
    //req.aprams.id se user ki id milegi jise woh user wala databade se jakar vo user ka name and email lekar aayega isliye populate use kiya h
        if(!order){
            return next(new ErrorHandler(`Order Not found with this id : ${req.params.id}`,404));
        }
    
        res.status(200).json({
            success:true,order
        })
    });
    
    
    
    //Get logged in user order 
    exports.myorders = catchAsyncErrors(async(req,res,next)=>{
    
        const orders = await Order.find({user:req.user._id})
    
        res.status(200).json({
            success:true,orders
        })
    });
    
    
    
    //Get ALL orders -->admin 
    exports.getallorders = catchAsyncErrors(async(req,res,next)=>{
    
        const orders = await Order.find();
    
        let totalamount=0;
        orders.forEach(order=>{
           totalamount+= order.totalprice;
        })
    
        res.status(200).json({
            success:true,totalamount, orders
        })
    });
    
    
    
    //Update order Status -->admin 
    exports.updateorder = catchAsyncErrors(async(req,res,next)=>{
    
        const order = await Order.findById(req.params.id);
    
        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
          }    
    
        if(order.orderstatus==="Delivered"){
            return next(new ErrorHandler("You have already delivered this order",400));
        }
        
        if(req.body.status==="Shipped"){
        order.orderitems.forEach(async(o)=>{
            await updateStock(o.product,o.quantity);
        });
    }
        order.orderstatus=req.body.status;
    
        if(req.body.status==="Delivered"){
        order.deliveredat= Date.now();
        }
        
        await order.save({validateBeforeSave:false})
        res.status(200).json({
            success:true
        })
    });
    
    async function updateStock (id , quantity){
        const product = await Product.findById(id);
    
        product.Stock -= quantity;
      
        await product.save({ validateBeforeSave: false });
    }
    
    
    
    // delete Order -- Admin
    exports.deleteorder = catchAsyncErrors(async (req, res, next) => {
        const order = await Order.findById(req.params.id);
      
        if (!order) {
          return next(new ErrorHandler("Order not found with this Id", 404));
        }
      
        await order.deleteOne();
      
        res.status(200).json({
          success: true,
        });
      });