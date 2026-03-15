import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function POST(request, { params }) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (!roleVerify(["admin", "warehouse"], user || warehouse)) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { id } = await params;
    const formData = await request.formData();
    const {
      distributorCode,
      distributorAccountName,
      orderLength,
      orderMaterialCode,
      productThicknessWithinSpec,
      materialFreeFromSurfaceDefects,
      productCleanAndFitForPurpose,
      orderReadyForShipment,
      palletDimensions,
      palletWeight,
    } = Object.fromEntries(formData.entries());
    const micrometerImage = formData.get("micrometerImage");
    const materialImage = formData.get("materialImage");
    const processedBy = formData.get("processedBy");

    if (!micrometerImage || !materialImage || !processedBy) {
      return ApiResponse(400, null, "All fields are required");
    }

    // Security check: Server side bypass validation
    const validateImage = (file) => {
      if (!file || typeof file === "string" || !file.type) return false;
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) return false;
      if (file.size > 10 * 1024 * 1024) return false; // 10MB limit
      return true;
    };

    if (!validateImage(micrometerImage) || !validateImage(materialImage) || !validateImage(processedBy)) {
      return ApiResponse(400, null, "Invalid file upload. Only images (JPG, PNG) under 10MB are allowed.");
    }

    const micrometerImageResult = await CloudneryService.upload(
      micrometerImage,
      "qc",
      "image",
      "jpg",
    );
    if (!micrometerImageResult) {
      return ApiResponse(500, null, "Failed to upload micrometer image");
    }

    const materialImageResult = await CloudneryService.upload(
      materialImage,
      "qc",
      "image",
      "jpg",
    );
    if (!materialImageResult) {
      return ApiResponse(500, null, "Failed to upload material image");
    }

    const processedByResult = await CloudneryService.upload(
      processedBy,
      "qc",
      "image",
      "jpg",
    );
    if (!processedBy) {
      return ApiResponse(500, null, "Failed to upload processed by");
    }

    const order = await OrderService.updateQc(id, {
      distributorCode,
      distributorAccountName,
      orderLength,
      orderMaterialCode,
      productThicknessWithinSpec,
      materialFreeFromSurfaceDefects,
      productCleanAndFitForPurpose,
      orderReadyForShipment,
      palletDimensions,
      palletWeight,
      micrometerImage: micrometerImageResult.url,
      materialImage: materialImageResult.url,
      processedBy: processedByResult.url,
      processDate: new Date(),
    });
    if (!order) {
      return ApiResponse(404, null, "Order QC not updated");
    }
    return ApiResponse(200, order, "Order QC updated successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error updating order QC: " + error.message);
  }
}
