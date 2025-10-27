import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
},{timestamps:true})
export const msgModel = mongoose.model("msgModel", messageSchema)