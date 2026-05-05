const express = require("express");
const app = express();
const cors = require("cors");
const listRoutes = require("./routes/list.routes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/lists", listRoutes);

module.exports = app;
