let express = require("express");
let fileRoutes = require("./routes/files.routes");


let app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/files", fileRoutes);

module.exports = app;