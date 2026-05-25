const cacheInstance = require("../config/caching");
const User = require("../models/user.model");
const {
  registerService,
  loginService,
  forgetPasswordService,
} = require("../services/auth.service");
const { generateToken } = require("../utils/generateToken");

let jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const user = await registerService(req.body);

    const token = generateToken(user._id);

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await loginService(req.body);

    const token = generateToken(user._id);

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const forgetPasswordController = async (req, res) => {
  try {
    let result = await forgetPasswordService(req.body);
    return res.status(200).json({
      message: "Link sent",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    let token = req.params.token;

    if (!token)
      return res.status(404).json({
        message: "token not found",
      });

    let decode = jwt.verify(token, process.env.RAW_SECRET);

    let user = await User.findById(decode.id);

    res.render("update.ejs", { userId: user._id });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    let password = req.body.password;
    let userId = req.params.userId;

    if (!password)
      return res.status(404).json({
        message: "Password dede lala",
      });

    //   here you have to hash the password

    let updateUser = await User.findByIdAndUpdate(
      userId,
      {
        password,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Password updated",
      user: updateUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "token not found",
      });

    cacheInstance.set(token, "blacklisted");

    // in case of acc and ref token
    // await User.findById(req.user._id, {
    //   refreshToken: null,
    // });

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  resetPasswordController,
  forgetPasswordController,
  updatePasswordController,
  logoutController,
};