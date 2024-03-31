const userModel = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const otpModel = require("../Model/otepSchema");
// const { sendEmail } = require("../utils/nodeMailer");
const { sendOtpAndSave } = require("../utils/sendOtp");

module.exports = {
  userRegistration: async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body;

    // Check if either email ,phoneNumber, userid and password is provided
    if (!userName || (!email && !phoneNumber) || !password) {
      return res.status(400).json({
        message: "Email or phonenumber is mandatory to register",
        status: "failure",
      });
    }

    // Prepare the query to find an existing user based on email or phone number
    const findCategory = email ? { email } : { phoneNumber };
    
    // Check if user already exists
    const user = await userModel.findOne(findCategory);
    if (user) {
      return res.status(422).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    return res.status(200).json({
      message: "User registered successfully. Please login.",
      status: "success",
      data: newUser,
    });
  },

  //------------userLogin-------------
  userLogin: async (req, res) => {
    const { email, password, phoneNumber } = req.body;
    const findCategory={}
    if(email){
      findCategory.email=email
    }
    else if(phoneNumber){
      findCategory.phoneNumber=phoneNumber
    }
else{
  return res.status(400).json({
    message:"Missing required fields email or phoneNumber",
    status:"failure"
  })
}
   

    const findUser = await userModel.findOne(findCategory);
    if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
      res.status(400).json({
        staus: "failure",
        message: "Invalid email,phoneNumber or password ",
      });
    }

    if (!findUser) {
      return res.status(400).json({
        message: "User Not found",
        status: "failure",
      });
    }
    const { otpMessage, data } = await sendOtpAndSave(
      email,
      phoneNumber,
      findUser._id,
      findUser.userName
    );
  
    res.status(200).json({
      status: "success",
      message: otpMessage,
      data: data,
    });
  },
  


  //-------otp verification------
 
  verifyOtp:async(req,res)=>{
   const {otp}=req.body
    const userId=req.params.id
    //to convert to number
    const numOtp=+otp
    // console.log(numOtp)
    const findOtp=await otpModel.findOne({userId}).sort({createdAt:-1}).limit(-1)
// console.log("findOtP",findOtp)
    if(!findOtp){
     return  res.status(400).json(
      {  message:"Incorrect  otp number",
        status:"failure"}
      )
    }
    // const findOtpData=findOtp[0]
     const otpData=findOtp.otp
     if(otpData!==numOtp){
return res.status(400).json({
  message:"Incorrect Otp",
  status:"failure"

})
     }

     return res.status(200).json({
      message:" OTP Validation success",
      status:"Success"
     })
  },


  //-----------forgotpassword--------------
 forgotPassword:async(req,res)=>{
  const{email,phoneNumber}=req.body

  let findCriteria={}
  if(email){
findCriteria.email=email
  }
  else if(phoneNumber){
    findCriteria.phoneNumber=phoneNumber
  }
  else return res.status(400).json({
    message:"Missing required fields: email or password",
    status:"failure"
  })
const findUser= await userModel.findOne(findCriteria)
console.log(findUser)
if(!findUser){
  res.staus(400).json({
    message:"User not found",
    status:"Failure"
  })
}
const {otpMessage,data}=await sendOtpAndSave(
  email,
      phoneNumber,
      findUser._id,
      findUser.userName
)
return res.status(200).json({
  message:otpMessage,
  status:"success",
  data:data
}) 
  },


  // ----------------create password-----------

  createPassword: async (req,res)=>{
    const{newPassword}=req.body
    const userId=req.params.id
    const hashedPassword=await bcrypt.hash(newPassword,10)
    const updatedUser=await userModel.findByIdAndUpdate(userId,{password:hashedPassword},{new:true})
    if(!updatedUser){
     return  res.status(400).json({
        message:"User not found",
        status:"Failure",

      })

    }
    return res.status(200).json({
      message:"Password updated successfully",
      satus:"success"
    })


  }



};

