import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";

export async function GET(request) {
  try {
    const user = await verifyJWT();
    if (!user?.id) {
      return ApiResponse(401, null, "Unauthorized");
    }

    const distributor = await DistributorService.getDistributor(user.id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }

    return ApiResponse(
      200,
      distributor,
      "Distributor profile fetched successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Failed to fetch profile: " + error.message);
  }
}
