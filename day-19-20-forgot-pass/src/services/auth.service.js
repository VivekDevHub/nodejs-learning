const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateRawToken } = require("../utils/generateToken");
const sendEmail = require("../config/mail");
const emailTemp = require("../utils/emailTemplate");

const registerService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

const forgetPasswordService = async ({ email }) => {
  if (!email) throw new Error("email not found");

  let isExist = await User.findOne({ email });

  if (!isExist)
    return res.status(404).json({
      message: "user not found",
    });

  let rawToken = generateRawToken(isExist._id);

  let resetLink = `http://localhost:3000/api/auth/reset-password/${rawToken}`;

  let mailSyntax = emailTemp(isExist.name, resetLink);

  await sendEmail(isExist.email, "For Reset password", mailSyntax);

  return null;
};

module.exports = {
  registerService,
  loginService,
  forgetPasswordService,
};