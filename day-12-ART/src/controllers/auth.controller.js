const UserModel = require("../models/user.model");
let jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const {
  refreshTokenService,
  registerService,
  loginService,
} = require("../services/auth.service");

let registerController = async (req, res) => {
  try {
    let { accessToken, refreshToken, newUser } = await registerService(
      req.body
    );

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
    console.log("error in reg api", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

let loginController = async (req, res) => {
  try {
    let { accessToken, refreshToken, isExisted } = await loginService(req.body);

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
      user: isExisted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

let getRefreshTokenController = async (req, res) => {
  try {
    let refreshToken = req.cookies.refreshToken;

    let { accessToken } = await refreshTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "accessToken generated",
    });
  } catch (error) {
    console.log("error in api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getRefreshTokenController,
};