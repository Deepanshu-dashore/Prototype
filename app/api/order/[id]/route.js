import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function PATCH(request, { params }) {
  const user = await verifyJWT();
  if (!user) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["admin", "distributor"], user)) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { id } = await params;
    const body = await request.json();
    const order = await OrderService.updateOrder(id, body);
    if (!order) {
      return ApiResponse(404, null, "Order not updated");
    }
    return ApiResponse(200, order, "Order updated successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error updating order: " + error.message);
  }
}

export async function GET(request, { params }) {
  const user = await verifyJWT();
  if (!user) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["admin", "distributor"], user)) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { id } = await params;
    const order = await OrderService.getOrderById(id);
    if (!order) {
      return ApiResponse(404, null, "Order not found");
    }
    return ApiResponse(200, order, "Order fetched successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error fetching order: " + error.message);
  }
}

export async function DELETE(request, { params }) {
  const user = await verifyJWT();
  if (!user) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["admin"], user)) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { id } = await params;
    const order = await OrderService.deleteOrder(id);
    if (!order) {
      return ApiResponse(404, null, "Order not deleted");
    }
    return ApiResponse(200, order, "Order deleted successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error deleting order: " + error.message);
  }
}
