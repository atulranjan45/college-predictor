const mongoose=require("mongoose")

const profileSchema=new mongoose.Schema({
    gender:{
        type:String,
    },
    dob:{
        type:String,
    },
    mobNo:{
        type:String,
        required:true,
    },
    about:{
        type:String,
    }
})

module.exports=mongoose.model("Profile", profileSchema);