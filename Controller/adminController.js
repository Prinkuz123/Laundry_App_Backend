// const adminSchema=require("../Model/adminSchema")
const categorySchema=require('../Model/categoriesSchema')
const itemSchema=require("../Model/itemSchema")
const instructionSchema=require("../Model/instructionSchema")
const userSchema=require("../Model/userSchema")

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
getAllUsers:async(req,res)=>{
    const findUser= await userSchema.find()
    if (!findUser){
res.status(400).json({
    message:"No user found",
    status:"failure"
})
    }
    res.status(200).json({
        message:"Users found",
        status:"success",
        data:findUser
    })

},

uploadCategoryAndImage:async(req,res)=>{
    // console.log(req.file)
    const {name}=req.body;
    const existingcategory= await categorySchema.findOne({name})
    if(existingcategory){
        res.status(400).json({
            message:"Category already exist",
            status:"failure"
        })
    }
    const newCategory = new categorySchema({
        name,
        image: req.file.filename
      });
   
    await newCategory.save()
    res.status(200).json({
        status: "success",
        message: "Category added and image uploaded successfully",
        data: newCategory
    });

},
//---get products----
getAllCategories:async(req,res)=>{
    const findCategory=await categorySchema.find()
    if(findCategory.length===0){
        res.status(400).json({
            message:"No category",
            status:"failure"
        })
        }
        return res.status(200).json({
            message:"category found",
            status:"success",
            data:findCategory
        })
},
//---------add items------------
addItems:async(req,res)=>{
    const{name,price,quantity}=req.body
    // if (!req.file) {
    //     return res.status(400).json({
    //         message: "No file uploaded",
    //         status: "failure"
    //     });
    // }

    const existingItems=await itemSchema.findOne({name})
    if(existingItems){
        res.status(400).json({
            message:"Item already exists",
            status:"failure"
        })
    }
    const newItems=  new itemSchema({
         name,
         price,
         quantity,
        image: req.file.filename
    })
   await newItems.save()
   res.status(200).json({
    message:"Item added and image uploaded successfully",
    status:"success",
    data:newItems
   })
},
//--------getall items---
getAllItems:async(req,res)=>{
    const findItems=await itemSchema.find()
    if(findItems.length===0){
        res.status(400).json({
            message:"No items found",
            status:"failure"
        })
    }
    return res.status(200).json({
        message:"items fetched successfully",
        status:"success",
        data:findItems
    })
},
//-------post instructions------
addInstructions:async(req,res)=>{
    const {water,fabricSoftener,detergent,note}=req.body
    const newInstruction=new instructionSchema({
        water,fabricSoftener,detergent,note
    })
    await newInstruction.save()
    res.status(200).json({
        message:"Instructions posted",
        status:"success",
        data:newInstruction
    })   
}

    
}