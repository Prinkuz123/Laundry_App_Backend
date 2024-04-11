const express=require("express")
const router=express.Router()
const adminController=require("../Controller/adminController")
const tryCatch=require('../Middleware/tryCatch')
router

.post("/admin/login",tryCatch(adminController.adminLogin))
module.exports=router
