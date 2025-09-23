const express=require("express");
const router=express.Router();

const {sendOTPHandler, changePasswordHandler, signupHandler, loginHandler}=require("../controllers/Auth")
const {auth, isStudent, isAdmin}=require("../middlewares/auth");
const {getCollegeDataHandler}=require("../controllers/College")




router.post("/sendotp", sendOTPHandler);
router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.post("/colleges", getCollegeDataHandler);


// protected Routes

router.get("/test", auth, (req, res)=>{
    res.json({
        success:true,
        message:"Welcome to test protected route",
    })
})

router.get("/student", auth, isStudent, (req, res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to protected Route for student",
    })
})

router.get("/admin", auth, isAdmin, (req, res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to protected roue for admin",
    })
})

// router.get("/addCollegeCutoff", auth, isAdmin, (req, res)=>{
//     return res.status(200).json({
//         success:true,
//         message:"Welcome to protected roue for admin",
//     })
// })

// router.get("/updateCollegeCutoff", auth, isAdmin, (req, res)=>{
//     return res.status(200).json({
//         success:true,
//         message:"Welcome to protected roue for admin",
//     })
// })

// router.get("/updateCollegeDescription", auth, isAdmin, (req, res)=>{
//     return res.status(200).json({
//         success:true,
//         message:"Welcome to protected roue for admin",
//     })
// })

router.post("/getCollegeData", auth, getCollegeDataHandler);


module.exports=router;