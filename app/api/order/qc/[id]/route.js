import connect from "@/app/lib/db/connect";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

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

    const distributorCode = formData.get("distributorCode");
    const distributorAccountName = formData.get("distributorAccountName");
    const palletDimensions = formData.get("palletDimensions");
    const palletWeight = formData.get("palletWeight");
    const orderReadyForShipment =
      formData.get("orderReadyForShipment") === "true";
    const processedByFile = formData.get("processedBy"); // This is the signature/processedBy image
    const productsMetadataStr = formData.get("productsMetadata");

    if (!productsMetadataStr || !processedByFile) {
      return ApiResponse(
        400,
        null,
        "Products data and processed by signature are required",
      );
    }

    const productsMetadata = JSON.parse(productsMetadataStr);

    // Security check: Server side bypass validation
    const validateImage = (file) => {
      if (!file || typeof file === "string" || !file.type) return false;
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) return false;
      if (file.size > 10 * 1024 * 1024) return false; // 10MB limit
      return true;
    };

    if (!validateImage(processedByFile)) {
      return ApiResponse(
        400,
        null,
        "Invalid processed by signature image. Only images (JPG, PNG) under 10MB are allowed.",
      );
    }

    // Upload processedBy signature
    const processedByResult = await CloudneryService.upload(
      processedByFile,
      "qc",
      "image",
      "jpg",
    );
    if (!processedByResult) {
      return ApiResponse(500, null, "Failed to upload processed by signature");
    }

    const processedProducts = [];

    for (let i = 0; i < productsMetadata.length; i++) {
      const product = productsMetadata[i];
      const micrometerImage = formData.get(`micrometerImage_${i}`);
      const materialImage = formData.get(`materialImage_${i}`);

      if (!micrometerImage || !materialImage) {
        return ApiResponse(
          400,
          null,
          `Images are required for product: ${product.materialCode}`,
        );
      }

      if (!validateImage(micrometerImage) || !validateImage(materialImage)) {
        return ApiResponse(
          400,
          null,
          `Invalid image upload for product: ${product.materialCode}. Only images (JPG, PNG) under 10MB are allowed.`,
        );
      }

      const micrometerResult = await CloudneryService.upload(
        micrometerImage,
        "qc",
        "image",
        "jpg",
      );
      if (!micrometerResult) {
        return ApiResponse(
          500,
          null,
          `Failed to upload micrometer image for product: ${product.materialCode}`,
        );
      }

      const materialResult = await CloudneryService.upload(
        materialImage,
        "qc",
        "image",
        "jpg",
      );
      if (!materialResult) {
        return ApiResponse(
          500,
          null,
          `Failed to upload material image for product: ${product.materialCode}`,
        );
      }

      processedProducts.push({
        materialCode: product.materialCode,
        length: product.length,
        thicknessWithinSpec: product.thicknessWithinSpec,
        materialFreeFromSurfaceDefects: product.materialFreeFromSurfaceDefects,
        cleanAndFitForPurpose: product.cleanAndFitForPurpose,
        micrometerImage: micrometerResult.url,
        materialImage: materialResult.url,
      });
    }

    const order = await OrderService.updateQc(id, {
      distributorCode,
      distributorAccountName,
      palletDimensions,
      palletWeight,
      products: processedProducts,
      orderReadyForShipment,
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

export async function GET(request, { params }) {
  const user = await verifyJWT();
  const distributor = await verifyDistributorJWT();
  const warehouse = await verifyWarehouseJWT();

  if (!user?.id && !distributor?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  if (
    !roleVerify(
      ["admin", "distributor", "warehouse"],
      user || distributor || warehouse,
    )
  ) {
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
        ...(order.qc && {
          ...order.qc.toObject(),
          processedBy: getUrls.getUrl(order.qc.processedBy),
          products: order.qc.products?.map((product) => ({
            ...product.toObject(),
            micrometerImage: getUrls.getUrl(product.micrometerImage),
            materialImage: getUrls.getUrl(product.materialImage),
          })),
        }),
      },
      "Order QC fetched successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error fetching order QC: " + error.message);
  }
}

export async function DELETE(request, { params }) {
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
    const findOrder = await OrderService.getOrderById(id);
    if (!findOrder) {
      return ApiResponse(404, null, "Order not found");
    }
    if (!findOrder.qc) {
      return ApiResponse(400, null, "Order doesn't have QC");
    }
    if (findOrder.qc?.products?.length > 0) {
      for (const product of findOrder.qc.products) {
        if (product.micrometerImage) {
          await CloudneryService.delete(product.micrometerImage, "image");
        }
        if (product.materialImage) {
          await CloudneryService.delete(product.materialImage, "image");
        }
      }
    }
    if (findOrder.qc?.processedBy) {
      await CloudneryService.delete(findOrder.qc.processedBy, "image");
    }
    const updatedOrder = await OrderService.updateOrder(id, { qc: null });
    if (!updatedOrder) {
      return ApiResponse(404, null, "Order QC not deleted");
    }
    return ApiResponse(200, updatedOrder, "Order QC deleted successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error deleting order: " + error.message);
  }
}
