import express from "express";
import { checkAuth, Login, logout, Signup, updateProfile } from "../controllers/authControllers.js";
import upload from "../config/profile.config.js";
import { authMiddle } from "../middlewares/authMiddle.js";
const authRouter = express.Router()

authRouter.post("/signup",Signup)
authRouter.post("/login",Login)
authRouter.post("/logout",logout)
authRouter.post("/update-profile",authMiddle,upload.single("image"),updateProfile)
authRouter.get("/check",authMiddle,checkAuth) 
export default authRouter;