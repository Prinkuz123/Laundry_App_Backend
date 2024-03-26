const express=require('express')
const router=express.Router()
const user=require("../Controller/userController")
const tryCatch=require('../Middleware/tryCatch')

router
.post("/register",tryCatch(user.userRegistration))
.post("/login",tryCatch(user.userLogin))




module.exports=router