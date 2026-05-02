let mongoose = require("mongoose");

let connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/kodex");
    console.log("mongodb connected");
  } catch (error) {
    console.log("Error in connecting Mongodb", error);
  }
};

module.exports = connectDb;
