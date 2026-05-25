require("dotenv").config();

const express = require("express");
let cookieParser = require("cookie-parser");
let path = require("path");

const authRoutes = require("./routes/auth.routes");
const cacheInstance = require("./config/caching");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();

cacheInstance.on("connect", () => {
  console.log("redis connected");
});

cacheInstance.on("error", (err) => {
  console.log("redis error", err);
});

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/main", authMiddleware, (req, res) => {
  res.send("me main page hu jisko protect krna hai");
});

app.use("/api/auth", authRoutes);

module.exports = app;