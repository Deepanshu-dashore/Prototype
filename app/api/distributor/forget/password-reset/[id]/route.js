import { hashPassword } from "@/app/lib/security/passwordHasher";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { OtpService } from "@/app/lib/services/otp.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { mail } from "@/app/lib/utils/mail";
import { passwordSecurityAlertTemplate } from "@/app/lib/utils/mailFormtes";

export async function POST(req,{params}) {
  try {
   const {id} = await params;
   const {password} = await req.json();
    const isUser = await DistributorService.getDistributor(id);
    if (!isUser) {
      return ApiResponse(404, null, "Distributor not found");
    }
    const hashedPassword = await hashPassword(password);
    const isPasswordUpdated = await DistributorService.updateDistributor(
      isUser._id,
      { password: hashedPassword },
    );
    if (!isPasswordUpdated) {
      return ApiResponse(500, null, "Failed to update password");
    }
    await mail({
      from: process.env.EMAIL_USER,
      to: isUser.companyEmail,
      subject: "Password Changed",
      body: passwordSecurityAlertTemplate({
        name: isUser?.companyName || isUser.companyEmail || "Distributor",
      }),
    });
    return ApiResponse(200, null, "Password updated successfully");
  } catch (error) {
    console.log("Password reset error:", error);
    return ApiResponse(500, null, "Failed to reset password ");
  }
}
