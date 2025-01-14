import mongoose from "mongoose";

 export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://anchana628:9V6ZD2T8U2ZsPWQZ@cluster0.6ampy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"));
}  