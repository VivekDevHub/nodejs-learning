let express = require("express");
const sendEmails = require("./config/mail.service");

let app = express();

app.get("/sendmail", async (req, res) => {
  await sendEmails(
    "vivekushwah357@gmail.com",
    "You are very consistent person",
    "mujhe pta hai tum kar sakte ho..., kuki....... assaaaann hai...",
  );

  return res.send("gayaaa tata goodbye ");
});

module.exports = app;
