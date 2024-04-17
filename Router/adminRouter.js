const express=require("express")
const router=express.Router()
const adminController=require("../Controller/adminController")
const tryCatch=require('../Middleware/tryCatch')
const upload = require("../Middleware/multer")
router

.post("/admin/login",tryCatch(adminController.adminLogin))
.post("/admin/category",tryCatch(adminController.addCategories))
.post("/admin/uploadimage",upload.single("file"),tryCatch(adminController.uploadImage))
module.exports=router
