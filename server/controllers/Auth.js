const User = require("../models/User")
const OTP = require("../models/OTP")
const Profile = require("../models/Profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const otpGenerator=require("otp-generator")
require("dotenv").config()




// sendOTPHandler
exports.sendOTPHandler = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists",
            });
        }

        // Generate OTP
        const options = {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        };
        let otp = otpGenerator.generate(6, options);

        // Ensure OTP is unique
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, options);
            result = await OTP.findOne({ otp: otp });
        }

        // Create OTP entry in database
        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in sending OTP",
        });
    }
};


// signuphandler
exports.signupHandler = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            //mobNo, 
            password, 
            confirmPassword, 
            accountType, 
            otp 
        } = req.body;
        const mobNo="997517444";
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType) {
            return res.status(403).json({
                success: false,
                message: "Please fill all details",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Check if mobile number is valid
        // if (mobNo.length !== 10) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Enter a valid mobile number",
        //     });
        // }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Fetch the most recent OTP for the email
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        // Check if OTP exists and matches
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "OTP does not match",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create profile details
        const profileDetails = await Profile.create({
            gender: null,
            dob: null,
            mobNo: mobNo,
            about: null,
        });

        // Create new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            mobNo,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
        });

        return res.status(200).json({
            success: true,
            message: "Registration successful",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in signup",
        });
    }
};


// loginhandler
exports.loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body
        // validations
        if(!email || !password){
            return res.status(404).json({
                success: false,
                message: "Please fill all details..."
            })
        }

        const user = await User.findOne({ email });
        // User does not exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exists"
            })
        }

        if (await bcrypt.compare(password, user.password)) {

            // create and send json web token
            const payload = {
                email: user.email,
                accountType: user.accountType,
                id: user._id,
            }
            const tokenOptions = {
                expiresIn: "2h",
            }
            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, tokenOptions)
            // console.log("Token: ", token);
            user.token = token;
            user.password = undefined;

            // create and send cookeies

            const cookieOptions = {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            return res.cookie("firstCookie", token, cookieOptions).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in Successfully"
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Password is incorrect"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: "Error in login"
        })
    }
}

// changePasswordHanlder
// PENDING 
exports.changePasswordHandler = async (req, res)=>{

   try{
        const {email, oldPassword, newPassword, confirmNewPassword}=req.body;

        // Pending 
        if(!email || !oldPassword){
            return res.status(404).json({
                success: false,
                message: "Please fill all details..."
            })
        }

        const user=await User.findOne({email});
        const result=bcrypt.compare(user.password, oldPassword);

        if(!result){
            return res.status(500).json({
                success: false,
                message: "Please insert correct password..."
            })
        }

        if(newPassword!==confirmNewPassword){
            return res.status(500).json({
                success: false,
                message: "New Password and Confirm Password not matching..."
            })
        }

        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password, 10);
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error in hashing Password"
            })
        }
        // New Password upadted in database
        user.password=hashedPassword;
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })

   }
   catch(error){
        console.log(error)
        return res.status(404).json({
            success: false,
            message: "!Error in changing on Password..."
        })
   }

}
