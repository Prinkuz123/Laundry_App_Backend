const mongoose=require('mongoose')
const otpSchema=new mongoose.Schema({
    email:{String,
    require:"true"
},
otp:{Number,
},
expiresAt:{
    type:Date,
    expires:300
}},
{timestamps:true}
)
const otp=mongoose.model(otp,otpSchema)