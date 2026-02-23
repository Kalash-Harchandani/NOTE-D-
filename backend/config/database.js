import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/noted")
    } catch (error) {
        console.log("DB not found")
        console.log(error.message);
    }
}