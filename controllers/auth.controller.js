import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendResetPassword, sendResetPaswordEmail, sendVerificationEmail, sendWelcomeEmail } from "../mail/email.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { User } from "../models/user.model.js";


const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All field are required");
        };

        const userAlredyExists = await User.findOne({ email });
        if (userAlredyExists) {
            return res.status(400).json({ success: false, message: "user already exists" });
        };

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({
            email,
            password: hashPassword,
            name,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000 // 24h by miliSec
        });

        await user.save();

        await generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "userCreated",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    };
};

const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        if (!code) {
            return res.status(400).json({ success: false, message: "Verification code is required" });
        }

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiredAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiredAt = undefined;

        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verification successful",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        await generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(201).json({ success: true, message: "lougout successfully" });

};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "No account found with this email" });
        }

        const resetToken = await crypto.randomBytes(30).toString("hex");
        user.resetPasswordToken = resetToken;
        user.verificationTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
        await user.save();

        await sendResetPassword(user.email, `${process.env.RESTL_LINK}/authentication/setNew-password/${resetToken}`);
        res.status(200).json({ success: true, message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ success: false, message: "Failed to process password reset request" });
    }



}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: "Token and new password are required" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            verificationTokenExpiredAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.verificationTokenExpiredAt = undefined;

        await user.save();
        await sendResetPaswordEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to reset password" });
    }
}

const checkAuth = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId || req.query.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found" });
        };
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth  }