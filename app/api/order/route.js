import connect from "@/app/lib/db/connect";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import mongoose from "mongoose";

export async function GET(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const skip = (page - 1) * limit;

    let filter = {};
    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        // Set to end of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    // TODO: implement search if necessary

    const { orders, total } = await OrderService.getAllOrders(filter, {
      skip,
      limit,
    });

    return ApiResponse(
      200,
      {
        orders,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      "Orders fetched successfully",
    );
  } catch (error) {
    console.log("Error fetching orders: ", error);
    return ApiResponse(500, null, "Error fetching orders: " + error.message);
  }
}

export async function POST(request) {
  const user = await verifyDistributorJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const body = await request.json();
    const MongofyId = new mongoose.Types.ObjectId(user.id);
    const order = await OrderService.createOrder({
      orderBy: MongofyId,
      ...body,
    });
    if (!order) {
      return ApiResponse(404, null, "Order not created");
    }
    return ApiResponse(200, order, "Order created successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error creating order: " + error.message);
  }
}
