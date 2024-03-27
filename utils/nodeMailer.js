const nodeMailer=require('nodemailer')
require('dotenv').config()

module.exports={
    sendEmail:async (email,name,otp)=>{

        const transporter = nodeMailer.createTransport({
            // service:"gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
              user: process.env.APP_EMAIL,
              pass:process.env.APP_PASSWORD,
            },
            requireTLS:true,
            logger:true
            
          });
          const info = await transporter.sendMail({
            from: process.env.APP_EMAIL ,// sender address
            to: email, // list of receivers
            subject: "OTP for laundry", // Subject line
            text: "Hello ", // plain text body
            html: `<h4>Dear ${name},</h4>
            <ul>
                <li>OTP:${otp}</li>
            </ul> `
            ,
            headers:{'x-myheader':'test header'}// html body

        });
        if(info.accepted .includes(email))return true
        else return false


    }


   

}

