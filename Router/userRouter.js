const express=require('express')
const router=express.Router()
const user=require("../Controller/userController")
const tryCatch=require('../Middleware/tryCatch')

router
.post("/user/register",tryCatch(user.userRegistration))
.post("/user/login",tryCatch(user.userLogin)) 
.post("/user/login/:id",tryCatch(user.verifyOtp))
.post('/user/resend',tryCatch(user.userLogin))
.post("/user/forgot/password",tryCatch(user.forgotPassword))
.post("/user/create/password/:id",tryCatch(user.createPassword))



 



module.exports=router