const User=require("../models/User")
const Profile=require("../models/Profile")


// updateProfile
exports.updateProfieHandler=async(req, res)=>{
    try{
        // fetch data from req body
        const {gender, dob, mobNo, about=""}=req.body;

        // find userId from req.user (added during token genrattion (decodeed tokrn))
        const userID=req.user.id;

        // validations
        if(!gender || !dob || !mobNo || !userID){
            return res.status(403).json({
                success: false,
                message: "Please fill all details",
            })
        }

        // find userdetails from userId
        const userDetails=await User.findById(userID);

        // find profileId from userDetails 
        const profileId=userDetails.additionalDetails;

        // from profileId id find update Profile
        const profileDetails=await Profile.findById(profileId);

        // update Profile 
        profileDetails.gender=gender;
        profileDetails.dob=dob;
        profileDetails.mobNo=mobNo;
        profileDetails.about=about;

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in updateProfileHandler Function",
        })
    }
}




// deleteAccount
// CROWN JOB PENDING (Schedule Request)
exports.deleteAccountHandler=async(req, res)=>{
   try{
     // get id
     const userID=req.user.id

     // get userdetails using userId
     const userDetails=await User.findById(userID);
 
     // validations
     if(!userDetails){
         return res.status(404).json({
             success: false,
             message: "UserDetails not Found...",
         });
     }
 
 
     // find profileID and delete profile
     const profileID=userDetails.additionalDetails;
     await Profile.findByIdAndDelete({_id:profileID});
 
     // delete user
     await User.findByIdAndDelete({_id:userID});
 
     // return response
     return res.status(200).json({
         success:true,
         message:"Account and Profile Deleted Successfully.."
     })

   }catch(error){
    return res.status(500).json({
        success:false,
        message:"Error in Deleting Account..."
    })
   }
}


