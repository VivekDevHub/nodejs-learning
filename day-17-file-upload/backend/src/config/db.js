const { default: mongoose } = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/file-upload");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in connection", error);
  }
};

module.exports = connectDB;
