const adminSchema=require("../Model/adminSchema")

module.exports={
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


   }
    
}