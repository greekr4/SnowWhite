const nodemailer = require("nodemailer"); // 모듈 import
const dotenv = require("dotenv");
dotenv.config();
const { email_service, user, pass } = process.env;

exports.sendMail = async (mailto, title, text, html) => {
  const transporter = nodemailer.createTransport({
    service: process.env.email_service,
    host: process.env.email_host,
    port: process.env.email_port,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: `스노우화이트 <${process.env.user}>`,
    to: `${mailto}`,
    subject: `${title}`,
    text: `${text}`,
    html: `${html}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(401).send("Error.", error);
    } else {
      return res.status(200).send("OK");
    }
  });
};
