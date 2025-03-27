import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";


const ChangeUserName = async (req, res) => {
    try {
        const { email, newUserName } = req.body;

        if (!email || !newUserName) {
            return res.status(400).json({ success: false, message: "Email and new username are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        user.name = newUserName;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Username updated successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Failed to change username: ${error.message}` });
    }
}

const ChnageUserPassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Email, current password, and new password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const oldPassword = user.password;
        const isVerified = await bcrypt.compare(currentPassword, oldPassword);
        if (!isVerified) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(201).json({ success: true, message: `Password change successfully` });

    } catch (error) {
        res.status(500).json({ success: false, message: `Failed to change password: ${error.message}` });
    }
}

const ChangeTel = async (req, res) => {
    try {
        const { email, tel } = req.body;
        if (!email || !tel) {
            return res.status(400).json({ success: false, message: "Email and tel are required" });
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ success : false  , message : "user Not found with this email (tel)" });
        };
        user.tel = tel;
        await user.save();
        res.status(201).json({ success: true, message: `Tel change successfully` });

    } catch (error) {
        res.status(500).json({ success: false, message: `Failed to change tel: ${error.message}` });
    }

}
export { ChangeUserName, ChnageUserPassword ,ChangeTel }