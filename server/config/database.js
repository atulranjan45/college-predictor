const mongoose= require('mongoose');
require("dotenv").config()

// console.log(process.env.DB_URL)
const dbConnect= async ()=>{
    await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connection Succesfull");
    })
    .catch((error)=>{
        console.log("Error in DB Connection");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports=dbConnect;