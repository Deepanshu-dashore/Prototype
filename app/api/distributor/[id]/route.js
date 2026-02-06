import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request, { params }) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await params;
    const distributor = await DistributorService.getDistributor(id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }
    return ApiResponse(200, distributor, "Distributor fetched successfully");
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error fetching distributor: " + error.message,
    );
  }
}

export async function PATCH(request, { params }) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body) {
      return ApiResponse(400, null, "Note content is required");
    }

    const distributor = await DistributorService.updateDistributor(id, body);
    return ApiResponse(200, distributor, "Distributor updated successfully");
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error updating distributor: " + error.message,
    );
  }
}
