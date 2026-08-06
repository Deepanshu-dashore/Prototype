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
      if (!roleVerify(["admin", "warehouse", "distributor"], user || warehouse)) {
        return ApiResponse(403, null, "Forbidden: insufficient permissions");
      }

      const poDoc = order.documents?.find((doc) => doc?.name === "po");
      if (poDoc) {
        await CloudneryService.delete(poDoc.url, poDoc.resource_type || "raw");
        order.documents = order.documents.filter((doc) => doc?.name !== "po");
      }
      const result = await CloudneryService.upload(file, "po", "raw", "pdf");
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

      const updatedDocOrder = {
        ...order.toObject(),
        documents: order.documents?.map((doc) => ({
          ...doc.toObject(),
          url: getUrls.getUrl(doc.url, doc.resource_type),
        })),
      };

      return ApiResponse(200, updatedDocOrder, "PO uploaded successfully");
    }

    if (type === "invoice") {
      if (!roleVerify(["admin", "warehouse"], user || warehouse)) {
        return ApiResponse(403, null, "Forbidden: Only admin and warehouse roles can upload invoices");
      }

      if (order.status === "PENDING") {
        return ApiResponse(400, null, "Order status is PENDING. Please update order status to IN PROCESS before uploading an invoice.");
      }

      const inputInvoice = formData.get("invoice");
      const invoiceNumber = inputInvoice ? String(inputInvoice).trim() : (order.invoice ? String(order.invoice).trim() : "");
      if (!invoiceNumber) {
        return ApiResponse(400, null, "Invoice Number is required before uploading invoice document.");
      }

      if (inputInvoice && inputInvoice.trim() !== order.invoice) {
        order.invoice = inputInvoice.trim();
      }

      const invoiceDoc = order.documents?.find((doc) => doc?.name === "invoice");
      if (invoiceDoc) {
        await CloudneryService.delete(invoiceDoc.url, invoiceDoc.resource_type || "raw");
        order.documents = order.documents.filter((doc) => doc?.name !== "invoice");
      }
      const result = await CloudneryService.upload(file, "invoice", "raw", "pdf");
      if (!result) {
        return ApiResponse(500, null, "Failed to upload Official Invoice");
      }
      if (!order.documents) order.documents = [];
      order.documents.push({
        url: result.url,
        id: result.id,
        name: "invoice",
        resource_type: "raw",
      });
      await order.save();

      const updatedDocOrder = {
        ...order.toObject(),
        documents: order.documents?.map((doc) => ({
          ...doc.toObject(),
          url: getUrls.getUrl(doc.url, doc.resource_type),
        })),
      };

      return ApiResponse(200, updatedDocOrder, "Invoice uploaded successfully");
    }

    return ApiResponse(400, null, "Invalid type. Must be 'po' or 'invoice'");
  } catch (error) {
    console.error("Error in upload route:", error);
    return ApiResponse(500, null, error.message);
  }
}

