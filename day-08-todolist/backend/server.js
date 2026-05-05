const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
