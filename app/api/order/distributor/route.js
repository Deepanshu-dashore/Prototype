import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request) {
  const user = await verifyDistributorJWT();
  if (!user) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["distributor"], user)) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }

  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const { orders, total } = await OrderService.getAllOrders(
      { orderBy: user.id },
      { skip, limit },
    );

    if (!orders) {
      return ApiResponse(404, null, "Distributor orders not fetched");
    }
    return ApiResponse(
      200,
      {
        orders,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      "Distributor orders fetched successfully",
    );
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error fetching distributor orders: " + error.message,
    );
  }
}
