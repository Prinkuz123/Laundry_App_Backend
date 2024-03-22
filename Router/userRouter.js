const express=require('express')
const router=express.Router()
const user=require("../Controller/userController")
const tryCatch=require('../Middleware/tryCatch')

router.route("/user")
.post(tryCatch(user.registerUser))



module.exports=router