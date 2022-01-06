const User = require("../models/User");
const Event = require("../models/Events")
const ErrorResponse = require("../utils/errorResponse")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail");
exports.register = async (req, res, next) => {

    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password
        })
        const event = await Event.create({
            email: user.email
        })
        sendToken(user, 201, res);
    
    } catch (error) {
        next(error)      
    }
}
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return next(new ErrorResponse("Please provide a email and Passowrd", 400))
    }
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return next(new ErrorResponse("Invalid Credentials", 404))
        }
        const isMatch = await user.matchPasswords(password);
        if(!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401))
        }
        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
    
}
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        //console.log(user);
        if(!user) {
            return next(new ErrorResponse("Email could not be sent",404)) 
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
        const text = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktrackingoff>${resetUrl}</a>
        `
        
        try {
            await sendEmail({
                to:user.email,
                subject: "Password Reset Request",
                text
            })
            res.status(200).json({
                success: true,
                data: "email sent!"
            })
        } catch (error) {
            user.getResetPasswordToken = undefined;
            user.resetPasswordExpire=undefined;
            await user.save();
            return next(new ErrorResponse("Email couldnt be sent!", 500))
        }
    } catch (error) {
        next(error)
    }
}
exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt:Date.now() }
        })
        if(!user) {
            next(new ErrorResponse("Invalid Reset Token", 400))
        }
        user.password = req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save()
        res.status(201).json({
            success: true,
            data: "Password reset success"
        })
    } catch (error) {
        next(error)
    }

}

exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        user.password = req.body.password;
        await user.save()
        res.status(200).json({
            success: true,
            data: "Password Changed Successfully"
        })
    } catch(error) {
        next(new ErrorResponse("Please Login to Change", 400))
    }
}

exports.logout = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.user.email
        })
        console.log(req.headers.authorization)
        req.headers.authorization = undefined;
        res.status(200).json({
            success: true
        })
    } catch(error) {

    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        console.log(users)
        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        next(new ErrorResponse("Unable to Fetch Users", 400))
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({ success: true, token })
} 