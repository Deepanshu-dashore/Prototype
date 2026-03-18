import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { MarketingAssetService } from "@/app/lib/services/marketingAsset.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function PUT(request, { params }) {
  const { id } = await params;
  if (!id) {
    return ApiResponse(400, null, "Marketing asset id is required");
  }
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  const existingCheck = await MarketingAssetService.getMarketingAssetById(id);
  if (!existingCheck) {
    return ApiResponse(404, null, "Marketing asset not found");
  }
  try {
    const marketingAsset = await MarketingAssetService.updateMarketingAsset(
      id,
      {
        isActive: !existingCheck.isActive,
      }
    );
    return ApiResponse(
      200,
      marketingAsset,
      "Marketing asset status updated successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error for updating marketing asset status");
  }
}
