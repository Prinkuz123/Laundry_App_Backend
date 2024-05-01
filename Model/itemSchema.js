const mongoose=require('mongoose')
const itemSchema =new mongoose.Schema({
  
    name:{
        type:String,
        require:true

    },
    price:{
        type:Number,
        require:true
        
    },
    
    image:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }

})
const Item=mongoose.model("Item",itemSchema)
module.exports=Item