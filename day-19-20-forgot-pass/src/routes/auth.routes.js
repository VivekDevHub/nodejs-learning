const express = require("express");
const {
  registerController,
  loginController,
  resetPasswordController,
  forgetPasswordController,
  updatePasswordController,
  logoutController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/forget-password", forgetPasswordController);

router.get("/reset-password/:token", resetPasswordController);

router.post("/update-password/:userId", updatePasswordController);

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

module.exports = router;