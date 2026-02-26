import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { mail } from "@/app/lib/utils/mail";
import { distributorOrderStatusTemplate } from "@/app/lib/utils/mailFormtes";

export async function PATCH(request, { params }) {
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
    const body = await request.json();
    if (!body.status) {
      return ApiResponse(400, null, "Status is required");
    }
    const order = await OrderService.updateOrder(id, { status: body.status });
    if (!order) {
      return ApiResponse(404, null, "Order not updated");
    }
    const getOrder = await OrderService.getOrderById(id);
    const send = await mail({
      to: getOrder.orderBy.companyEmail,
      subject: "Order Status Update",
      body: distributorOrderStatusTemplate({
        distributorName: getOrder.orderBy.companyName,
        orderId: `#${String(getOrder._id).slice(-6).toUpperCase()}`,
        orderDate: new Date(getOrder.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        totalItems: getOrder.orderItems.length,
        status: body.status,
      }),
    });
    // console.log("Mail sent successfully", send);
    return ApiResponse(200, order, "Order updated successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error updating order: " + error.message);
  }
}
