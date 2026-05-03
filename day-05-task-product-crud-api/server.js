const app = require("./src/app");
// const connectDB = require("./src/config/db.js");
const PORT =  5000;

// connectDB();

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
