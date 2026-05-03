const mongoose = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://kodex:kodex0000@cluster1.tkzuphf.mongodb.net/kodex");
    console.log("Mongodb connected");
  } catch (error) {
    console.log("error in connecting DB", error);
  }
};

module.exports = connectDB;