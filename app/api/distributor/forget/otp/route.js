import { DistributorService } from "@/app/lib/services/distributor.service";
import { OtpService } from "@/app/lib/services/otp.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { forgotPasswordOtpTemplate } from "@/app/lib/utils/mailFormtes";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return ApiResponse(400, null, "Email is required");
    }
    const User = await DistributorService.getDistributorByEmail(email);
    if (!User) {
      return ApiResponse(404, null, "Distributor not found");
    }
    const { GenratedOtp, expiresAt } = await OtpService.generateOtp(email);
    // console.log("Otp iss-->", GenratedOtp, "........", expiresAt);
    const otpSend = await OtpService.sendOtp(
      email,
      forgotPasswordOtpTemplate({
        otp: GenratedOtp,
        expire: "10 minutes",
        name: User?.companyName || email || "Distributor",
      }),
      process.env.EMAIL_FROM,
      "CC Matting OTP Verification",
    );
    return ApiResponse(otpSend.status, null, otpSend.message);
  } catch (error) {
    if (error.message.includes("OTP already sent")) {
      return ApiResponse(400, null, error.message);
    }
    return ApiResponse(500, null, "OTP send failed " + error.message);
  }
}
