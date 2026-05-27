import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/notes-1");
    console.log("mongodb is connected");
  } catch (error) {
    console.error("error in connecting mongodb", error);
  }
}

export default connectDB;
