import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { distributorVerificationTemplate } from "@/app/lib/utils/mailFormtes";
import { generateSecurePassword } from "@/app/lib/utils/genratePassword";
import { mail } from "@/app/lib/utils/mail";
import { hashPassword } from "@/app/lib/security/passwordHasher";

export async function PATCH(request, { params }) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await params;
    if (!id) {
      return ApiResponse(400, null, "Distributor ID is required");
    }
    const distributor = await DistributorService.getDistributor(id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }
    if (distributor.verification?.isVerified) {
      return ApiResponse(400, null, "Distributor already verified");
    }

    // Generate and hash password
    const plainPassword = generateSecurePassword();
    const hashedPassword = await hashPassword(plainPassword);

    // Update distributor
    distributor.verification = {
      isVerified: true,
      verifiedDate: new Date(),
    };
    distributor.password = hashedPassword;
    await DistributorService.updateDistributor(id, distributor);

    // Send email with plain password
    await mail({
      from: process.env.EMAIL_FROM,
      to: distributor.companyEmail,
      subject: "Distributor Verified - CC Matting",
      body: distributorVerificationTemplate({
        distributorName: distributor.companyName,
        companyName: "CC Matting",
        loginEmail: distributor.companyEmail,
        password: plainPassword,
        loginUrl: "https://prototype-alpha-six.vercel.app/distributor/login",
      }),
    });

    return ApiResponse(
      200,
      { distributor: distributor },
      "Distributor verified successfully",
    );
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Distributor verification failed " + error.message,
    );
  }
}
