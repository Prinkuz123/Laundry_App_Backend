const nodeMailer=require('nodemailer')
require('dotenv').config()

module.exports={
    sendEmail:async (email,name,otp)=>{

        const transporter = nodeMailer.createTransport({
            // service:"gmail",
            host: "smtp.gmail.com",
            port: 496,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.APP_EMAIL,
              pass:process.env.APP_PASSWORD,
            },
            
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

