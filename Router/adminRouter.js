const express=require("express")
const router=express.Router()
const adminController=require("../Controller/adminController")
const tryCatch=require('../Middleware/tryCatch')
const upload= require("../Middleware/multer")
const{tokenVerifyUser}=require("../utils/jwtToken")

router

.post("/admin/login",tryCatch(adminController.adminLogin))
.get('/admin/getallusers',tryCatch(adminController.getAllUsers))
// .post("/admin/category",tryCatch(adminController.addCategories))
.post("/admin/category/upload",upload.single("file"),tryCatch(adminController.uploadCategoryAndImage))
.get('/admin/getallcategory',tryCatch(adminController.getAllCategories))
.post("/admin/items/upload",upload.single("file"),tryCatch(adminController.addItems))
.get("/admin/getItems",tryCatch(adminController.getAllItems))
.post("/admin/addInstructions",tryCatch(adminController.addInstructions))
.get("/admin/getUser",tokenVerifyUser,tryCatch(adminController.getUserById))

module.exports=router
