const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB Connceted ...");
  } catch (error) {
    console.log("error in db", error);
  }
};

module.exports = connectDB;
