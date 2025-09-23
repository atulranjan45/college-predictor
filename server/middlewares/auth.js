const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.auth = (req, res, next) => {
    try {
        // extract toekn from req body or req cookies
        // PENDING: Other ways to extract token from 1)cookies 2)header
        const token = req.body.token 
                    || req.cookies.token 
                    || req.header("Authorisation").replace("Bearer ","");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing",
            })
        }
        // verify and decode token using JWT secret key
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

            //decoded token is added to req.user(req body) to extract payload from req 
            // to verify role and extract other user information

            req.user = decode;
            // console.log(req.user);
            
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "error in token verification",
            })
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "error in authentication",
        })
    }

}

exports.isStudent = (req, res, next) => {
    try{
        if(req.user.accountType!=="student"){
            return res.status(401).json({
                success: false,
                message: "You are not allowed to enter in student route",
            }) 
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "error in student authentication",
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.accountType!=="admin"){
            return res.status(401).json({
                success: false,
                message: "You are not allowed to enter in admin route",
            }) 
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "error in admin authentication",
        })
    }
}