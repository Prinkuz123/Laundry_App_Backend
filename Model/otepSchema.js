const mongoose=require('mongoose')
const otpSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
otp:{type:Number},
expiresAt:{
    type:Date,
    expires:900
}},
{timestamps:true}
)
const otp=mongoose.model("otp",otpSchema)
module.exports =otp