import mongoose from "mongoose";

const ProductData=new mongoose.Schema({
name:{
     type:String,
     required:true
},
price:{
     type:Number,
     required:true,
     min:0
},
description:{
     type:String,
     required:true,
},
image:{
     type:String,
     required:[true,"the image is required"]
},
category:{
     type:String,
     required:true,
    
},
isFeatured: {
     type: Boolean,
     default: false,
},

},{timestamps:true})

const ProData=mongoose.model("Product",ProductData);
export default ProData;