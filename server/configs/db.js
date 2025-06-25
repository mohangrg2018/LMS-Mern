import mongoose from "mongoose";

// Connecting to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/lms`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
