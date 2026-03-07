import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import connect from "@/app/lib/db/connect";

export async function PATCH(request, { params }) {
  await connect();
  try {
    const { id } = await params;
    const searchParams = await request.nextUrl.searchParams;
    const type = searchParams.get("type");

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return ApiResponse(400, null, "No file uploaded");
    }

    const order = await OrderService.getOrderById(id);
    if (!order) {
      return ApiResponse(404, null, "Order not found");
    }

    if (type === "po") {
      const poDoc = order.documents?.find((doc) => doc?.name === "po");
      if (poDoc) {
        await CloudneryService.delete(poDoc.id, poDoc.resource_type);
        order.documents = order.documents.filter((doc) => doc?.name !== "po");
      }
      const result = await CloudneryService.upload(file, "po", "raw");
      if (!result) {
        return ApiResponse(500, null, "Failed to upload PO");
      }
      if (!order.documents) order.documents = [];
      order.documents.push({
        url: result.url,
        id: result.id,
        name: "po",
        resource_type: "raw",
      });
      await order.save();
      return ApiResponse(200, order, "PO uploaded successfully");
    }

    return ApiResponse(400, null, "Invalid type");
  } catch (error) {
    console.error("Error in upload route:", error);
    return ApiResponse(500, null, error.message);
  }
}
