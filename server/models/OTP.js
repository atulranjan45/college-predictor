const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema=new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }

});


// function to send mail with OTP
async function sendVerificationEmail(email, otp){
    try{
        const title="Verification Email from CollegeFinder"
        const mailResponse=await mailSender(email, title, otp);
        console.log("Email sent successfully", mailResponse);
    }catch(error){
        console.log("Error in sendVerification Email function", error);
        throw error;
    } 
}
// use pre save middleware for sending mail before creating entry of user in database
OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})




module.exports=mongoose.model("OTP", OTPSchema);