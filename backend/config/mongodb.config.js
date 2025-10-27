import mongoose from "mongoose";

const connectDB = async()=>{
await mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to DB succesfully"))
}

export default connectDB;