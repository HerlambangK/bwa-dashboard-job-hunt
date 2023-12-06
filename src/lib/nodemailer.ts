const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.nanjaya-store.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.BESTMAIL_ADDRESS,
    pass: process.env.BESTMAIL_SECRET,
  },
});

export default transporter;
