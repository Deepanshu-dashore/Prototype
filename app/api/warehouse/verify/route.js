import { ApiResponse } from "@/app/lib/utils/apiResponse";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";

export async function GET() {
  try {
    const user = await verifyWarehouseJWT();

    if (!user) {
      return ApiResponse(401, { authenticated: false }, "No token provided");
    }

    if (user.role !== "warehouse") {
      return ApiResponse(403, { authenticated: false }, "Unauthorized role");
    }

    return ApiResponse(
      200,
      { authenticated: true, user: user },
      "Authenticated",
    );
  } catch (error) {
    return ApiResponse(
      401,
      { authenticated: false },
      "Invalid token or session expired",
    );
  }
}
