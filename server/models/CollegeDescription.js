const mongoose=require("mongoose");


const collegedescriptionSchema=new mongoose.Schema({
    about:{
        type:String,
    },
    placementPercentage:{
        type:Number,
    },
    fees:{
        type:Number,
    }
})

module.exports=mongoose.model("CollegeDescription", collegedescriptionSchema);