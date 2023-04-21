import nodemailer from "nodemailer";

import { mailConfig } from "$app/config/index.js";

let transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: mailConfig.address,
    pass: mailConfig.password,
  },
});

export default transporter;
