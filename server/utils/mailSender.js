const nodemailer=require("nodemailer")
require("dotenv").config()


const mailSender=async(email, title, body)=>{
    try{

        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            service:'gmail',
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info=await transporter.sendMail({
            from:"College Finder",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,

        })

        // console.log("info: ", info)
        return info;
    }
    catch(error){
        console.log("Error in mailSender Function");
        console.log("Error: ", error);
    }
}

module.exports=mailSender;