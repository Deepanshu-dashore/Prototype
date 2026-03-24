import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "dashd9396@gmail.com",
    pass: "wqeabbqpvjtmkias",
  },
  tls: {
    rejectUnauthorized: false
  }
});