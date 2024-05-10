const express=require('express')
const router=express.Router()
const user=require("../Controller/userController")
const tryCatch=require('../Middleware/tryCatch')
const adminController = require('../Controller/adminController')
const userController = require('../Controller/userController')
const {tokenVerifyUser}=require('../utils/jwtToken')

router
.post("/register",tryCatch(user.userRegistration))
.post("/login",tryCatch(user.userLogin)) 
.post("/verify/:id",tryCatch(user.verifyOtp))
.post('/resend',tryCatch(user.userLogin))
.post("/forgotpassword",tryCatch(user.forgotPassword))
.post("/createpassword/:id",tryCatch(user.createPassword))
.get("/getallcategory",tryCatch(adminController.getAllCategories))
.get("/getallitems",tryCatch(adminController.getAllItems))
.post('/addInstructions',tryCatch(adminController.addInstructions))
.post ("/addAddress/:id",tryCatch(userController.addAddressOfUser))
.put("/updateAddress/address/:id",tokenVerifyUser,tryCatch(userController.editAddressOfUser))
.get("/getUser",tokenVerifyUser,tryCatch(adminController.getAllUsers))
// router.post("/addAddress/:userId", tryCatch(userController.addAddressOfUser));


module.exports=router

