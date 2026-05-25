let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

let sendEmail = async (to, subject, html) => {
  try {
    let options = {
      from: process.env.EMAIL,
      to,
      subject,
      html,
    };

    await transporter.sendMail(options);
  } catch (error) {
    console.log("error in email", error);
  }
};

module.exports = sendEmail;