// 1. create server
// 2. configurations

let express = require("express");
const connectDb = require("./config/db");

connectDb();  

let app = express();
app.use(express.json());

let users = [];

// create
app.post("/get-user", (req, res) => {
  users.push(req.body);

  return res.status(201).json({
    message: "User created successfully",
  });
});

// read
app.get("/users", (req, res) => {
  return res.status(200).json({
    message: "Users fetched successfully",
    users,
  });
});

// update only age
app.patch("/users/update/:index", (req, res) => {
  let { index } = req.params;
  let { age } = req.body;

  users[index].age = age;

  return res.send("ok");
});

// delete
app.delete("/users/delete/:index", (req, res) => {
  let { index } = req.params;

  users.splice(index, 1);

  return res.status(200).json({
    message: "User deleted",
  });
});

module.exports = app;
