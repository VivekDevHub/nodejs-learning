const { default: mongoose } = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/ARTokens");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in db", error);
  }
};

module.exports = connectDB;