import { UserModel } from "../models/user.model.js";

const registerController = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All Fields Are Required",
      });
    }

    let newUser = await UserModel.create({
      name,
      email,
      mobile,
      password,
    });

    return res.status(201).json({
      message: "User Registered",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUserController = async () => {
  try {
    let allUser = await UserModel.find();

    return res.status(200).json({
      message: "User Fetched Successfully",
      users: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { registerController, getAllUserController };
