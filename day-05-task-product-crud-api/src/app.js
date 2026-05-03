const express = require('express');
const app = express();

app.use(express.json());

app.use("/api/products", require("./routes/productRoutes"));

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app