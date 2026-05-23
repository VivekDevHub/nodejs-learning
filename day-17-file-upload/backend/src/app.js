let express = require("express");
let fileRoutes = require("./routes/file.route");
let cors = require("cors");

let app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/file", fileRoutes);

module.exports = app;