const express=require("express")
const router=express.Router()
const adminController=require("../Controller/adminController")
const tryCatch=require('../Middleware/tryCatch')
const upload= require("../Middleware/multer")
router

.post("/admin/login",tryCatch(adminController.adminLogin))
// .post("/admin/category",tryCatch(adminController.addCategories))
.post("/admin/category/upload",upload.single("file"),tryCatch(adminController.uploadCategoryAndImage))
.get('/admin/getallcategory',tryCatch(adminController.getAllCategories))
.post("/admin/items/upload",upload.single("file"),tryCatch(adminController.addItems))
.get("/admin/getItems",tryCatch(adminController.getAllItems))
module.exports=router