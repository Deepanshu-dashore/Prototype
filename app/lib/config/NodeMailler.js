import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
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
