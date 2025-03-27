import { ChangeTel, ChangeUserName , ChnageUserPassword } from "../controllers/profile.controller.js";
import express from "express";

const router = express.Router()

router.post("/reset_userName" , ChangeUserName);
router.post("/reset_userPassword" , ChnageUserPassword);
router.post("/resetTel" , ChangeTel)

export default router