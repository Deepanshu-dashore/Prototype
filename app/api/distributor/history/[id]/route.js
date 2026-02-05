import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const distributor = await DistributorService.getDistributor(id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }
    return ApiResponse(
      200,
      distributor.history,
      "Distributor history fetched successfully",
    );
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Distributor history fetch failed " + error.message,
    );
  }
}
