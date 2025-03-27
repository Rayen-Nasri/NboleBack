import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        require :true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    name  : {
        type : String,
        require : true
    },
    lastLogin : {
        type : Date,
        default : Date.now()
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    tel : {
        type : String,
        default : "",
        length : 8
    },
    resetPasswordToken : String,
    resetPasswordExpiresAt : Date,
    verificationToken : String,
    verificationTokenExpiredAt : Date

},{timestamps : true});

export const User = mongoose.model("User" , userSchema);