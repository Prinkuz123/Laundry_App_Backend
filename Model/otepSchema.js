const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    
  userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
},
  otp:{
    type:Number,
    unique:true
  },
  expireAt: {
    // default:Date.now,
    type: Date,
    expires: 60,

}


},{timestamps:true});

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;