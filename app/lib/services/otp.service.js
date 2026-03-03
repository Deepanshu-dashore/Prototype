import connect from "../db/connect";
import { Otp } from "../models/otp";
import { ApiResponse } from "../utils/apiResponse";
import { mail } from "../utils/mail";

export class OtpService {
  static async generateOtp(email) {
    await connect();
    const existingOtp = await Otp.findOne({
      email,
      expiresAt: { $gt: new Date() },
    });

    if (existingOtp) {
      const timeRemaining = Math.ceil(
        (new Date(existingOtp.expiresAt) - new Date()) / 1000 / 60,
      );
      throw new Error(
        `OTP already sent. Please wait ${timeRemaining} minutes.`,
      );
    }
    const emailExist = await Otp.findOne({ email });

    if (emailExist) {
      await Otp.deleteMany({ email });
    }

    const GenratedOtp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    const otp = await Otp.create({
      email,
      otp: GenratedOtp,
      expiresAt,
    });
    return { GenratedOtp, expiresAt };
  }

  static async sendOtp(email, body, from, subject) {
    const sent = await mail({
      from,
      to: email,
      subject,
      body,
    });

    if (sent === false) {
      return {
        status: 500,
        message: "Failed to send email",
      };
    }

    return {
      status: 200,
      message: "OTP sent successfully",
    };
  }

  static async verifyOtp(email, otp) {
    await connect();
    const emailExist = await Otp.findOne({ email });
    if (!emailExist) {
      return {
        status: 400,
        message: "Email not found",
      };
    }
    const storeOtp = await Otp.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },
    });
    if (!storeOtp.otp) {
      return {
        status: 400,
        message: "Invalid or Expired OTP",
      };
    }
    if (storeOtp.otp !== otp) {
      return {
        status: 400,
        message: "Invalid OTP",
      };
    }
    await Otp.deleteOne({ email });
    return {
      status: 200,
      message: "OTP verified successfully",
    };
  }
}
