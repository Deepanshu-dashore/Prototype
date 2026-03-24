import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 2525,
  secure: false,
  auth: {
    user: "dashd9396@gmail.com",
    pass: "wqeabbqpvjtmkias",
  },
  tls: {
    rejectUnauthorized: false
  }
});
