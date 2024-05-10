const jwt =require('jsonwebtoken')

module.exports={
    tokenVerifyUser:(req,res,next)=>{
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                error:"Unauthorized "
            })
        }
        const token=authHeader.split(" ")[1]
        // console.log(token);
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err){
                return res.status(403).json({ 
                    error:"Invalid token "
                })
            }
            req.user=decoded
            // console.log("req.user",req.user);
            next()
        }
        )
    }
}