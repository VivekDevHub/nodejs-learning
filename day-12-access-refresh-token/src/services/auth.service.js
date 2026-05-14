let jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

let registerService = async (data) => {
  let { name, email, password, mobile } = data;

  if (!email || !password) throw new Error("all fields are required");

  let existingUser = await UserModel.findOne({ email });

  if (existingUser) throw new Error("user already registered");

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

  return {
    accessToken,
    refreshToken,
    newUser,
  };
};

let loginService = async (data) => {
  let { email, password } = data;

  if (!email || !password) throw new Error("All fields are required");

  let isExisted = await UserModel.findOne({
    email,
  });

  // password verification

  if (!isExisted) throw new Error("user not found");

  let accessToken = generateAccessToken(isExisted._id);
  let refreshToken = generateRefreshToken(isExisted._id);

  isExisted.refreshToken = refreshToken;
  await isExisted.save();

  return {
    accessToken,
    refreshToken,
    isExisted,
  };
};

let refreshTokenService = async (refreshToken) => {
  if (!refreshToken) throw new Error("token not found");

  let decode = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
  let user = await UserModel.findById(decode.userId);

  if (!user) throw new Error("user not found");

  if (refreshToken !== user.refreshToken) throw new Error("unauthorized user");

  let accessToken = generateAccessToken(user._id);

  return {
    accessToken,
  };
};

module.exports = {
  refreshTokenService,
  registerService,
  loginService,
};