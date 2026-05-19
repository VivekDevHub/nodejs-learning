const { default: mongoose } = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/day13");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in mongodb", error);
  }
};

module.exports = connectDB;
