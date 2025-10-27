import express from "express";
import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Signup = async (req, res) => {
  try {
    let { email, fullName, password } = req.body;
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all credentials!!!" });
    }
    if (password < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be atlest 6!!!" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await userModel.create({
      email,
      fullName,
      password: hashedPassword,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Some error occured during creating user",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
 id:user._id,
 email:user.email,
fullName:user.fullName
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all credentials!!!" });
    }

    const User = await userModel.findOne({ email });
    if (!User) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatched = await bcryptjs.compare(password, User.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Password doesnot match" });
    }

    const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      id:User._id,
      email:User.email,
      fullName:User.fullName
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req,res)=>{
  try{
    res.cookie("token","",{maxAge:0})
    res.status(200).json({message:"logged out successfully"})
  }
  catch{
        return res.status(400).json({ success: false, message: error.message });


  }
}
export const updateProfile = async (req,res)=>{
  let userId = req.userId
  let{fullName,email}=req.body;
  try {
    if(!req.file){
      res.status(400).json({message:"Give image"})
    }
    const updatedUser = await userModel.findByIdAndUpdate(userId,{profilePic:req.file.path,fullName,email},{new:true})
res.status(200).json(updatedUser)

  } catch (error) {

    console.log("error in upload", error)
   res.send(400).json({message:"Error occured while uploading image"}) 
  }
}

export const checkAuth = async(req,res)=>{
  try {
    const user =  await userModel.findById(req.userId).select("-password")
    res.status(200).json(user)
  } catch (error) {
        console.log("error in check", error)
   res.send(400).json({message:"Error occured while checking auth"}) 
  }
}