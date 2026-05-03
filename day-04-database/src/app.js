const express = require("express");
const UserModel = require("./models/user.model");

const app = express();

app.use(express.json());

// creation in db
app.post("/create-user", async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;

    if (!mobile || !name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let newUser = await UserModel.create({
      name,
      email,
      password,
      mobile,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// read from db
app.get("/users", async (req, res) => {
  let users = await UserModel.find();

  return res.status(200).json({
    message: "User fetched successfully",
    users,
  });
});

// updation in db
app.put("/users/update/:id", async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;

    if (!mobile || !name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let { id } = req.params;

    console.log(id);

    let updateUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        password,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "User updated",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// deletion in db
app.delete("/users/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

module.exports = app;