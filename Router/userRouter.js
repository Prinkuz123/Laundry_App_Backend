const express=require('express')
const router=express.Router()
const user=require("../Controller/userController")
const tryCatch=require('../Middleware/tryCatch')
const adminController = require('../Controller/adminController')
const userController = require('../Controller/userController')

router
.post("/register",tryCatch(user.userRegistration))
.post("/login",tryCatch(user.userLogin)) 
.post("/login/:id",tryCatch(user.verifyOtp))
.post('/resend',tryCatch(user.userLogin))
.post("/forgot/password",tryCatch(user.forgotPassword))
.post("/create/password/:id",tryCatch(user.createPassword))
.get("/getallcategory",tryCatch(adminController.getAllCategories))
.get("/getallitems",tryCatch(adminController.getAllItems))
.post('/addInstructions',tryCatch(adminController.addInstructions))
.post ("/addAddress/:id",tryCatch(userController.addAddressOfUser))
// router.post("/addAddress/:userId", tryCatch(userController.addAddressOfUser));


module.exports=router