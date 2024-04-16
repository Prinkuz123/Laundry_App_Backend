const adminSchema=require("../Model/adminSchema")
const categorySchema=require('../Model/categoriesSchema')
module.exports={

    //-------admin login-----
   adminLogin: async(req,res)=>{
    const {userName,passWord}=req.body

const username=process.env.ADMIN_NAME
const password=process.env.ADMIN_PASSWORD

if(userName==username&&passWord==password){
    return res.status(200).json({
        message:"Admin logged in successfully",
        status:"success",
    })
}
res.status(401).json({
    status:"failure",
    message:"Wrong password or username"
})


   },
   //---create categories------
 addCategories:async (req,res)=>{
    const categories=new categorySchema(req.body)
    const newCategory= await categories.save()
    // console.log(newCategory)
res.json({
    message:"Categories added ",
status:"Success",
data:newCategory
}) 
},
//------getAllUsers-----
getAllUsers:async(req,res)=>{

}

    
}