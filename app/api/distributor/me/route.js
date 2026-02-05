import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request) {
  try {
    let token = null;
    const authHeader = (await headers()).get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("distributorToken")?.value;
    }

    if (!token) {
      return ApiResponse(401, null, "Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return ApiResponse(401, null, "Invalid token");
    }

    const distributor = await DistributorService.getDistributor(decoded.id);
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
