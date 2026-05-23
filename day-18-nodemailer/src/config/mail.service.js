let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ddhote780@gmail.com",
    pass: "huhpdefaicayflmm",
  },
});

let sendEmails = async (to, subject, text) => {
  let option = {
    from: "ddhote780@gmail.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(option);
};

module.exports = sendEmails;