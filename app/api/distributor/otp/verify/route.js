import { OtpService } from "@/app/lib/services/otp.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return ApiResponse(400, null, "Email and OTP are required");
    }
    const otpVerify = await OtpService.verifyOtp(email, otp);
    return ApiResponse(otpVerify.status, null, otpVerify.message);
  } catch (error) {
    console.log("OTP verify failed -->", error);
    return ApiResponse(500, null, "OTP verify failed " + error.message);
  }
}
