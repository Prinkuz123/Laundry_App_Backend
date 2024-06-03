const mongoose=require('mongoose')
const orderSchema= new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    date:{
        type:String,
        require:true
    },
    timeSlot:{
        type:String,
        require:true
    },
    pickUpAddress:{
        type:String,
        require:true
    },
    deliveryAddress:{
        type:String,
        require:true
    },
    categories: [{
        name: { type: String, required: true }, // Name of the category
        items: [{
          itemName: { type: String ,required:true},
          itemPrice: { type: Number ,required:true},
          itemQuantity: { type: Number,required:true },
          total: { type: Number,required:true }
        }]
      }]
  


}, { timestamps: true })
const Order=mongoose.model("Order",orderSchema)
module.exports=Order
