import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { mail } from "@/app/lib/utils/mail";
import { distributorOrderStatusTemplate } from "@/app/lib/utils/mailFormtes";

export async function PATCH(request, { params }) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  const hasAccess = roleVerify(["admin", "warehouse"], user) || roleVerify(["admin", "warehouse"], warehouse);
  if (!hasAccess) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { id } = await params;
    const body = await request.json();
    if (!body.status) {
      return ApiResponse(400, null, "Status is required");
    }
    
    const orderStatus = body.status.toUpperCase();
    const order = await OrderService.updateOrder(id, { status: orderStatus });
    if (!order) {
      return ApiResponse(404, null, "Order not updated");
    }
    const getOrder = await OrderService.getOrderById(id);
    if (getOrder?.orderBy?.companyEmail) {
      const send = await mail({
        from: process.env.ORDER_EMAIL_FROM,
        to: getOrder.orderBy.companyEmail,
        subject: `Order Status Update - ORD-${String(getOrder._id).slice(-6).toUpperCase()}`,
        body: distributorOrderStatusTemplate({
          distributorName: getOrder.orderBy.companyName || "Distributor",
          orderId: `ORD-${String(getOrder._id).slice(-6).toUpperCase()}`,
          orderDate: new Date(getOrder.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          totalItems: getOrder.orderItems?.length || 0,
          status: orderStatus,
        }),
      });
      // console.log("Mail sent successfully", send);
    }
    return ApiResponse(200, order, "Order updated successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error updating order: " + error.message);
  }
}
