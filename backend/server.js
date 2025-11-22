import express from "express";
import cookieParser from "cookie-parser";
import { json } from "express";
import authRouter from "./routes/auth.route.js";
import connectDB from "./config/mongodb.config.js";
import dotenv from "dotenv";
import { msgModel } from "./models/message.model.js";
import msgRouter from "./routes/message.route.js";
import cors from "cors";
import { app,server } from "./config/socket.js";

dotenv.config()
connectDB()
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:["https://chat-app-sabin.netlify.app"],
    credentials:true,
}))

app.get("/",(req,res)=>{
    res.send({
        message:"server is running",
        error:false
    })
})
app.use("/api/auth",authRouter)
app.use("/api/message",msgRouter)
app.get("/",(req,res)=>{
    res.send("server is running")
})

server.listen(process.env.PORT,()=>console.log(`servere is running at port ${process.env.PORT}`))
