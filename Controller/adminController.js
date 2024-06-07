// const adminSchema=require("../Model/adminSchema")
const categorySchema = require("../Model/categoriesSchema");
const itemSchema = require("../Model/itemSchema");
const instructionSchema = require("../Model/instructionSchema");
const userSchema = require("../Model/userSchema");
const trackingModel=require('../Model/trackingSchema')
const reviewModel=require('../Model/reviewSchema')

module.exports = {
  //-------admin login-----
  adminLogin: async (req, res) => {
    const { userName, passWord } = req.body;

    const username = process.env.ADMIN_NAME;
    const password = process.env.ADMIN_PASSWORD;

    if (userName == username && passWord == password) {
      return res.status(200).json({
        message: "Admin logged in successfully",
        status: "success",
      });
    }
    res.status(401).json({
      status: "failure",
      message: "Wrong password or username",
    });
  },
  getAllUsers: async (req, res) => {
    // const query=req?.user?.userId
    // console.log("query",query);
    const findUser = await userSchema.find();
    if (findUser.length === 0) {
      res.status(400).json({
        message: "No user found",
        status: "failure",
      });
    }
    res.status(200).json({
      message: "Users found",
      status: "success",
      data: findUser,
    });
  },
  getUser: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const findUser = await userSchema.findById(id);
    console.log("finduser:", findUser);
    if (!findUser) {
      return res.status(400).json({
        message: "User not found ",
        status: "failure",
      });
    }
   return  res.status(200).json({
      message: "User details retrieved successfully",
      status: "success",
      user: findUser,
    });
  },

  uploadCategoryAndImage: async (req, res) => {
    // console.log(req.file)
    const { name } = req.body;
    const existingcategory = await categorySchema.findOne({ name });
    if (existingcategory) {
      res.status(400).json({
        message: "Category already exist",
        status: "failure",
      });
    }
    const newCategory = new categorySchema({
      name,
      image: req.file.filename,
    });

    await newCategory.save();
    res.status(200).json({
      status: "success",
      message: "Category added and image uploaded successfully",
      data: newCategory,
    });
  },
  //---get products----
  getAllCategories: async (req, res) => {
    const findCategory = await categorySchema.find();
    if (findCategory.length === 0) {
      res.status(400).json({
        message: "No category",
        status: "failure",
      });
    }
    return res.status(200).json({
      message: "category found",
      status: "success",
      data: findCategory,
    });
  },
  //---------add items------------
  addItems: async (req, res) => {
    const { name, price, quantity } = req.body;

    const existingItems = await itemSchema.findOne({ name });
    if (existingItems) {
      res.status(400).json({
        message: "Item already exists",
        status: "failure",
      });
    }
    const newItems = new itemSchema({
      name,
      price,
      quantity,
      image: req.file.filename,
    });
    await newItems.save();
    res.status(200).json({
      message: "Item added and image uploaded successfully",
      status: "success",
      data: newItems,
    });
  },
  //--------getall items---
  getAllItems: async (req, res) => {
    const findItems = await itemSchema.find();
    if (findItems.length === 0) {
      res.status(400).json({
        message: "No items found",
        status: "failure",
      });
    }
    return res.status(200).json({
      message: "items fetched successfully",
      status: "success",
      data: findItems,
    });
  },
  //-------post instructions------
  addInstructions: async (req, res) => {
    const { water, fabricSoftener, detergent, note } = req.body;
    const newInstruction = new instructionSchema({
      water,
      fabricSoftener,
      detergent,
      note,
    });
    await newInstruction.save();
    res.status(200).json({
      message: "Instructions posted",
      status: "success",
      data: newInstruction,
    });
  },


//---get all reviews-----
getAllReviews:async(req,res)=>{
const reviews=await reviewModel.find()
if(!reviews){
  return res.status(400).json({
    message:"No review found",
    status:"failure",
    error:true
  })
}
return res.status(200).json({
  message:"Fetched all reviews",
  data:reviews,
  error:false,
  status:"success"

})
},



//------Post tracking------
postTrackingStatus:async(req,res)=>{
  const{currentStatus,orderId}=req.body

    // Automatically set the estimated delivery time to 5 days from now at 15:00:00 (3 PM)
    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setDate(estimatedDeliveryTime.getDate() + 5);
    estimatedDeliveryTime.setUTCHours(15, 0, 0, 0); // Set time to 15:00:00 UTC
  const newTracking= new trackingModel({
    orderId,
    currentStatus,
    estimatedDeliveryTime
  })
  await newTracking.save()
  return res.status(200).json({
    message:"Tracking posted",
    status:"succees",
    error:false,
    data:newTracking
    
  })
  
    },

//---------------updating tracking status---------
updateTrackingStatus:async(req,res)=>{
const trackingId=req.params.trackingId
const{currentStatus}=req.body 
const findtrackingStatus=await trackingModel.findById(trackingId)
if(!findtrackingStatus){
  return res.status(400).json({
    message:"No tracking status found ",
    status:"failure",
    error:true
  })
}
findtrackingStatus.currentStatus=currentStatus
await findtrackingStatus.save()
return res.status(200).json({
  message:"Tracking updated",
  data:findtrackingStatus,
  error:false,
  status:"success"
})
},


//----gettracking status-------

getTrackigStatus:async(req,res)=>{
  const orderId=req.params.orderId
  const findTrackingStatus= await trackingModel.findOne({orderId})
  if(!findTrackingStatus){
    return res.status(400).json({
      message:"Not found any orders",
      data:findTrackingStatus,
      error:false
    })
  }
  return res.status(200).json({
    message:"fetched tracking status",
    data:findTrackingStatus,
    error:false,
    status:"success",
  })
}
   


};
