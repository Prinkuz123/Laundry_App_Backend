const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: { type:String, required: true},
  email: { type:String},
  password:{type:String,required:true},
  phoneNumber:{type:Number},
   address: [
    {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String }
    },{unique:true}
  ]
},{ 
  versionKey: false // Setting versionKey to false to exclude the __v field
});
const user = mongoose.model("user", userSchema);
module.exports = user;
