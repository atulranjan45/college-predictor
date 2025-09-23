const User=require("../models/User");
const mailSender=require("../utils/mailSender")
const bcrypt=require("bcrypt")


// resetPasswordToken

exports.resetPasswordToken=async (req, res)=>{
    try{
        // fetch data(email) from req.body
        const email=req.body.email;
        if(!email){
            return res.json({
                success:true,
                message:"Please Enter email carefully..."
            });
        }

        // check if user already exists
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({
                success:true,
                message:"Please Enter registered email..."
            });
        }

        // generate token
        const token=crypto.randomUUID();
        // update user with generated token
        const updatedDetails=await User.findOneAndUpdate({email:email},
                                                        {
                                                            token:token,
                                                            resetPasswordExpires:Date.now()+5*60*1000,        
                                                        },
                                                        {new:true});
        // create url
        const url=`http://localhost:3000/update-password/${token}`;

        // send mail with url containing token
        const title="Password Reset Link";
        await mailSender(email, title, `Password Reset Link: ${url}`);
        // send response   
        return res.json({
            success:true,
            message:"Email sent successfully, plaease check email and change Password",
        }) 

    }catch(error){
        return res.status(500).json({
            success:true,
            message:"Error in resetPasswordToken Function"
        });
    }
}

// resetPasswordHandler
exports.resetPasswordHandler=async(req, res)=>{
   try{
     // data fetch 
     const {password, confirmPassword, token }=req.body;

     // validation
     if(password!==confirmPassword){
         return res.json({
             success:true,
             message:"Password and ConfirmPassword don't matching",
         });
     }
 
     // get userdetails from database using token
     const userDetails=await User.findOne({token:token});
 
     // if no user found 1)invalid token  2)token expired 
     if(!userDetails){
         return res.json({
             success:true,
             message:"Token is invalid",
         });
     }
 
     if(userDetails.resetPasswordExpires<Date.now()){
         return res.json({
             success:true,
             message:"Token is Expired "
         });
     }
     // hash password 
     let hashedPassword=await bcrypt.hash(password, 10);
      
     // update password in user 
     await User.findOneAndUpdate(
         {token:token},
         {password:hashedPassword},
         {new:true}
     )
     // return response
     return res.status(200).json({
         success:true,
         message:"PAssword updated successfully..."
     });

   }catch(error){
    return res.status(200).json({
        success:false,
        message:"Error in Reseting Password..."
    });
   }
}