import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function PATCH(request, { params }) {
  const user = await verifyJWT();
  if (!user?.id) {
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
    distributor.verification.isVerified = true;
    distributor.verification.verifiedDate = new Date();
    await DistributorService.updateDistributor(id, distributor);
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
