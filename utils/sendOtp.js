const otpModel=require('../Model/otepSchema')
const {sendEmail}=require('../utils/nodeMailer')
const{sendSms}=require('../utils/twillio')

module.exports={
    sendOtpAndSave:async(email,phoneNumber,userId,userName)=>{
       
       //Generate OTP
        const otpCode=Math.floor(1000+Math.random()*9000).toString()
        let otpSent=false
        let otpMessage;

        if(email){
            otpSent = await sendEmail(email, otpCode, userName);

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
    


    
