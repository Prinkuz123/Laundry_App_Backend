const express=require('express')
const mongoose=require("mongoose")
const app=express()
const jwt=require('jsonwebtoken')
require ('dotenv').config()

app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hi aall")
})


//Connecting mongodb 
const Url=process.env.DB_URL
mongoose.connect(Url)
.then(()=>{console.log("connected to mongoDB")})
.catch((e)=>{console.log("Error found",e)})




const Port=8080        
app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`)
})

const authUser=require('./Router/userRouter')
app.use('/api',authUser)
const authAdmin=require("./Router/adminRouter")
app.use("/api",authAdmin)