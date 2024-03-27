const otpModel=require('../Model/otepSchema')
const {sendMail}=require('../utils/nodeMailer')

module.exports={
    sendOtpAndSave:async(email,phoneNumber,userName,userId)=>{
       
       //Generate OTP
        const otpCode=Math.floor(1000+Math.random()*9000).toString()
        const otpSent=false
        let otpMessage;

        if(email){
            otpSent=await sendMail(email,otpCode,userName)
                otpMessage="A verification code has been sent to your email address";
        }
        else if(phoneNumber){
            otpSent=await sendSms(phoneNumber,otpCode,userName)
            otpMessage="A verification code has been sent to your phoneNumber"
        }


        if(otpSent){
            const otp=new otpModel({
                userId,
                otp:otpCode,
                expireAt:new Date()
            })

             //save otp
        await otp.save()
        return {otpMessage,data:userId}
        }
        else{
            throw new error("failed to send verification code ")

        }  
    }
    }
    


    
