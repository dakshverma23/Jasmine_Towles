import mongoose from "mongoose";

export const connectDb = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("FATAL: MONGO_URI is missing in environment variables.");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
