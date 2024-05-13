const mongoose=require('mongoose')
const orderSchema= new mongoose.Schema({
    date:{
        type:String,
        require:true
    },
    timeSlot:{
        type:Number,
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
    items:{
        type:String,
        require:true
    },


})
const Order=mongoose.model("Order",orderSchema)
module.exports=Order
