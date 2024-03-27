const userModel = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const otpModel = require("../Model/otepSchema");
// const { sendEmail } = require("../utils/nodeMailer");
const { sendOtpAndSave } = require("../utils/sendOtp");

module.exports = {
  userRegistration: async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body;

    // Check if either email or phoneNumber is provided
    if (!userName || (!email && !phoneNumber) || !password) {
      return res.status(400).json({
        message: "Email or phone number is mandatory to register",
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
    // const findCriteria = email ? { email } : { phoneNumber };
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
    // if (!findCriteria) {
    //   return res.status(400).json({
    //     message: "Missing required fields",
    //     status: "failure",
    //   });
    // }

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
  // verifyOtp: async (req, res) => {
  //   const { email, otp } = req.body;
  //   const otpCode = otpModel.findOne({ email: emai }, { otp: otp });
  //   if (!otpCode) {
  //     res.status(404).json({
  //       message: "Incorrect OTP",
  //       status: "failure",
  //     });
  //   }
  //   return res.status(200).json({
  //     message: "OTP Verification su",
  //   });
  // },
};

