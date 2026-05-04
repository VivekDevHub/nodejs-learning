import express from "express";
import {
  getAllUserController,
  registerController,
} from "../controllers/user.controller.js";

let router = express.Router();

router.post("/register", registerController);
router.get("/", getAllUserController);

export default router;
