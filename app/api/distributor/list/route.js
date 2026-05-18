import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    // Project only _id, companyName, and companyEmail
    const distributors = await DistributorService.getAllDistributors(
      {},
      { companyName: 1, companyEmail: 1, verification: 1 }
    );

    return ApiResponse(
      200,
      distributors,
      "Distributor list fetched successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Distributor fetch failed: " + error.message);
  }
}
