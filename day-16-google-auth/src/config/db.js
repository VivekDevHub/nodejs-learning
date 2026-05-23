const { default: mongoose } = require("mongoose");

let connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/test-google-auth");
    console.log("db connected");
  } catch (error) {
    console.log("error while connecting with db", error);
  }
};

module.exports = connectDb;