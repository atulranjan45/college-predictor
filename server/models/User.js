const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobNo:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin", "Student"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    // image:{
    //     type:URL
    // }
})

const User=mongoose.model("User", userSchema);
module.exports=User;