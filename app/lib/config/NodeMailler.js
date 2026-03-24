import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "dashd9396@gmail.com",
    pass: "wqeabbqpvjtmkias",
  },
  tls: {
    rejectUnauthorized: false
  }
});
