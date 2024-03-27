const mongoose=require('mongoose')
const otpSchema=new mongoose.Schema({
    // email:{type:String,},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
otp:{type:Number},
expiresAt:{
    type:Date,
    expires:300
}},
{timestamps:true}
)
const otp=mongoose.model("otp",otpSchema)