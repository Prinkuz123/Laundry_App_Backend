const mongoose=require('mongoose')
const imageSchema=new mongoose.Schema({
    image: {
        type: String 
    }
})
const image=mongoose.model("Image",imageSchema)
module.exports=image