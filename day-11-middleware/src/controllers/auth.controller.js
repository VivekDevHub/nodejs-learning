const UserModel = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

let registerController = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        message: "user already registered",
      });

    let newUser = await UserModel({
      name,
      email,
      password,
      mobile,
    });

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure:true
      // sameSite:"strict"
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure:true
      // sameSite:"strict"
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered Successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

let loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted)
      return res.status(404).json({
        message: "user not found",
      });

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure:true
      // sameSite:"strict"
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure:true
      // sameSite:"strict"
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User LoggedIn Successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
};