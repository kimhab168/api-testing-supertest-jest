import configs from "@/config";
import mongoose from "mongoose";
export async function connectToDB() {
  try {
    await mongoose.connect(`${configs.mongodbUrl}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
