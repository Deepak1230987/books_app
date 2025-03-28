import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error in connectDB", error.message);
        process.exit(1); //exit the process with a failure
    }
}

export default connectDB;
