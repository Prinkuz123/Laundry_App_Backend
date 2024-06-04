const userModel = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const otpModel = require("../Model/otepSchema");
const itemModel = require("../Model/itemSchema");
const orderModel = require("../Model/orderSchema");
const jwt = require("jsonwebtoken");
// const { sendEmail } = require("../utils/nodeMailer");
const { sendOtpAndSave } = require("../utils/sendOtp");
const reviewModel=require('../Model/reviewSchema')

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
      error: false,
      message: "User registered successfully. Please login.",
      status: "success",
      data: newUser,
    });
  },

  //------------userLogin-------------
  userLogin: async (req, res) => {
    const { email, password, phoneNumber } = req.body;
    //performing combined check for email or phone number
    const findCategory = {};
    if (email) {
      findCategory.email = email;
    } else if (phoneNumber) {
      findCategory.phoneNumber = phoneNumber;
    } else {
      return res.status(400).json({
        message: "Missing required fields email or phoneNumber",
        status: "failure",
      });
    }

    const findUser = await userModel.findOne(findCategory);
    if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
      return res.status(401).json({
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
    const { otpMessage,otpCode } = await sendOtpAndSave(
      email,
      phoneNumber,
      findUser._id,
      findUser.userName,
      
    );

    res.status(200).json({
      status: "success",
      message: otpMessage,
      id: findUser._id,
      otp:otpCode
    });
  },

  //-------otp verification------

  verifyOtp: async (req, res) => {
    const { otp } = req.body;
    console.log(otp);
    const userId = req.params.id;
    console.log(userId);
    //to convert to number
    const numOtp = +otp;

    // console.log(numOtp)
    const findOtp = await otpModel
      .findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(-1);
    // console.log("findOtP", findOtp);
    if (!findOtp) {
      return res
        .status(400)
        .json({ message: "Incorrect  otp number", status: "failure" });
    }
    // const findOtpData=findOtp[0]
    const otpData = findOtp.otp;
    console.log("otpdaata:-", otpData);
    if (otpData !== numOtp) {
      return res.status(400).json({
        message: "Incorrect Otp",
        status: "failure",
      });
    }

    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        userId: userId,
      },
      secret,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: " OTP Validation success",
      status: "Success",
      token: token,
    });
  },

  //-----------forgotpassword--------------
  forgotPassword: async (req, res) => {
    const { email, phoneNumber } = req.body;

    let findCriteria = {};
    if (email) {
      findCriteria.email = email;
    } else if (phoneNumber) {
      findCriteria.phoneNumber = phoneNumber;
    } else
      return res.status(400).json({
        message: "Missing required fields: email or password",
        status: "failure",
      });
    const findUser = await userModel.findOne(findCriteria);
    console.log(findUser);
    if (!findUser) {
      return res.staus(400).json({
        message: "User not found",
        status: "Failure",
      });
    }
    const { otpMessage, otpCode} = await sendOtpAndSave(
      email,
      phoneNumber,
      findUser._id,
      findUser.userName
    );
    return res.status(200).json({
      message: otpMessage,
      status: "success",
      id: findUser._id,
      otp:otpCode
    });
  },

  // ----------------create password-----------

  createPassword: async (req, res) => {
    const { newPassword } = req.body;
    // console.log(req.body);
    const userId = req.params.id;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        message: "User not found",
        status: "Failure",
      });
    }
    return res.status(200).json({
      message: "Password updated successfully",
      status: "success",
    });
  },

  //--add address of user ----

  addAddressOfUser: async (req, res) => {
    const userId = req.user.userId;
    console.log("userId", userId);
    const { street, city, state, postalCode } = req.body;
    const existingUser = await userModel.findById(userId);
    console.log("existingUser", existingUser);
    if (!existingUser) {
      return res.status(400).json({
        message: "No user found",
        status: "failure",
      });
    }
    // Check if the address already exists
    const addressExists = existingUser.address.some(
      (address) =>
        address.street === street &&
        address.city === city &&
        address.state === state &&
        address.postalCode === postalCode
    );

    if (addressExists) {
      return res.status(400).json({
        message: "This address already exists for the user",
        status: "failure",
      });
    }
    // Construct the new address object
    const newAddress = {
      street,
      city,
      state,
      postalCode,
    };
    // Update the user's address
    existingUser.address.push(newAddress);
    // Save the updated user document
    await existingUser.save();
    return res.status(200).json({
      message: "Address added to user",
      status: "success",
      data: existingUser,
    });
  },

  //-----Edit address---------
  editAddressOfUser: async (req, res) => {
    // const id=req.params.id
    const userId = req.user?.userId;
    console.log("userid", userId);
    const address_id = req.params.id;
    console.log("addressid", address_id);
    const { street, city, state, postalCode } = req.body;
    const existingUser = await userModel.findById(userId);
    console.log("existingUser", existingUser);
    if (!existingUser) {
      res.status(400).json({
        message: "No user found",
        status: "failure",
      });
    }
    const addressToUpdate = existingUser.address.id(address_id);
    console.log(addressToUpdate);
    if (!addressToUpdate) {
      return res.status(400).json({
        message: "Address not found for the user",
        status: "failure",
      });
    }
    (addressToUpdate.street = street), (addressToUpdate.city = city);
    addressToUpdate.state = state;
    addressToUpdate.postalCode = postalCode;
    await existingUser.save();
    return res.status(200).json({
      error: "false",
      message: "Address updated successfully",
      status: "success",
      data: addressToUpdate,
    });
  },



  createOrder: async (req, res) => {
    const userId = req.user.userId;
    const { categories,date,timeSlot,  pickUpAddress, deliveryAddress } = req.body;

    const User = await userModel.findById(userId);
    if (!User) {
      return res.status(400).json({
        message: "No user found",
        status: "failure",
      });
    }
    // Construct the order object
    // Create a new category object
    const newOrder = new orderModel({
      userId,
      categories: categories,
      date:date,
      timeSlot:timeSlot,
      pickUpAddress:pickUpAddress,
      deliveryAddress:deliveryAddress,
  
    });
    await newOrder.save();

    return res
      .status(201)
      .json({ error:"failure",
      status:"success",
      message: "Order created successfully", order: newOrder });
  },
  
  getParticularOrderDetails:async(req,res)=>{
    const orderId=req.params.id
    console.log("orderId",orderId);
    const order=await orderModel.findById(orderId)
    console.log("order",order);
 
    if (!order){
      return res.status(400).json({
        message:"No order found ",
        status:"failure",
        error:"true"

      })
    }
    
    return res.status(200).json({
      message:"Oder data fetched success fully",
      data:order,
      status:"succes",
      error:"false"
    })
    

  },
  getAllOrderDetails:async(req,res)=>{
    const orders=await  orderModel.find()
    if(!orders){
      return res.status(400).json({
        message:"No orders found",
        status:"failure",
        error:"true"
      })
    }
    return res.status(200).json({
      message:"Fetched all orders ",
      data:orders,
      error:"false",
      status:"success"
    })
  },
  deleteOrder:async(req,res)=>{
    const orderId=req.params.id
    const order=await orderModel.findByIdAndDelete(orderId)
    if(order){
      return res.status(200).json({
        message:"Order cancelled",
        status:"success",
        error:"false"
      })
    }
    return res.status(400).json({
      message:"internal error",
      status:"failure",
      error:"true"
    })

  },
  addReviewOfUser:async(req,res)=>{
    const userId=req.user.userId
    const {comment,rating}=req.body
    const User=await userModel.findById(userId)
    if(!User){
      return res.status(400).json({
        message:"No user found",
        status:"Failure"
      })
    }
    const newReview= new reviewModel({
      userId,
      rating,
      comment
    }) 
    await newReview.save()
    res.json({
      message:"review posted",
      status:"success",
      error:"false",
      data:userId
    })
  },
  getReviewOfUser:async(req,res)=>{
    
  }

  


};
