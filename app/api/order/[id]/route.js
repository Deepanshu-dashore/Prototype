import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

export async function PATCH(request, { params }) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["admin", "distributor", "warehouse"], user || warehouse)) {
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
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["admin", "distributor", "warehouse"], user || warehouse)) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { id } = await params;
    const order = await OrderService.getOrderById(id);
    if (!order) {
      return ApiResponse(404, null, "Order not found");
    }
    return ApiResponse(
      200,
      {
        ...order.toObject(),
        documents: order.documents?.map((doc) => ({
          ...doc.toObject(),
          url: getUrls.getUrl(doc.url, doc.resource_type),
        })),
        qc: {
          ...order.qc.toObject(),
          micrometerImage: getUrls.getUrl(
            order.qc.micrometerImage,
            order.qc.resource_type,
          ),
          materialImage: getUrls.getUrl(
            order.qc.materialImage,
            order.qc.resource_type,
          ),
          processedBy: getUrls.getUrl(
            order.qc.processedBy,
            order.qc.resource_type,
          ),
        },
      },
      "Order fetched successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error fetching order: " + error.message);
  }
}

export async function DELETE(request, { params }) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["admin", "distributor", "warehouse"], user || warehouse)) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { id } = await params;
    const findOrder = await OrderService.getOrderById(id);
    if (!findOrder) {
      return ApiResponse(404, null, "Order not found");
    }
    if (findOrder.documents?.length > 0) {
      findOrder.documents?.forEach(async (doc) => {
        await CloudneryService.delete(doc?.url, doc?.resource_type);
      });
    }
    const order = await OrderService.deleteOrder(id);
    if (!order) {
      return ApiResponse(404, null, "Order not deleted");
    }
    return ApiResponse(200, order, "Order deleted successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error deleting order: " + error.message);
  }
}
