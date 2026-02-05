import { OtpService } from "@/app/lib/services/otp.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { otpVerificationTemplate } from "@/app/lib/utils/mailFormtes";

export async function POST(request) {
  try {
    const { email, name } = await request.json();
    if (!email) {
      return ApiResponse(400, null, "Email is required");
    }
    const { GenratedOtp, expiresAt } = await OtpService.generateOtp(email);
    console.log("Otp iss-->", GenratedOtp, "........", expiresAt);
    const otpSend = await OtpService.sendOtp(
      email,
      otpVerificationTemplate({ otp: GenratedOtp, expire: "10 minutes", name }),
      "[EMAIL_ADDRESS]",
      "OTP Verification",
    );
    return ApiResponse(otpSend.status, null, otpSend.message);
  } catch (error) {
    if (error.message.includes("OTP already sent")) {
      return ApiResponse(400, null, error.message);
    }
    return ApiResponse(500, null, "OTP send failed " + error.message);
  }
}
