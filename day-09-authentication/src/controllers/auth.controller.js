const UserModel = require("../models/user.model");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let registerController = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All Fields Required",
      });
    }

    let isExisted = await UserModel.findOne({ email });

    if (isExisted) {
      return res.status(409).json({
        message: "This email is already registered",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
      mobile,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(token, "Token hai =-=-=-=-=-=");
    res.cookie("token", token);

    return res.status(201).json({
      message: "USer created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports = { registerController };
