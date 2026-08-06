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
    const existingOrder = await OrderService.getOrderById(id);
    if (!existingOrder) {
      return ApiResponse(404, null, "Order not found");
    }

    const formData = await request.formData();

    const distributorCode = formData.get("distributorCode");
    const distributorAccountName = formData.get("distributorAccountName");
    const shippingInfoStr = formData.get("shippingInfo");
    let shippingInfoArr = [];
    if (shippingInfoStr) {
      try {
        shippingInfoArr = JSON.parse(shippingInfoStr);
      } catch (e) {}
    }

    const legacyDimensions = formData.get("palletDimensions");
    const legacyWeight = formData.get("palletWeight");

    if (!Array.isArray(shippingInfoArr) || shippingInfoArr.length === 0) {
      shippingInfoArr = [
        {
          palletDimensions: legacyDimensions || "",
          palletWeight: legacyWeight ? Number(legacyWeight) : 0,
        },
      ];
    }

    const orderReadyForShipment =
      formData.get("orderReadyForShipment") === "true";
    const processedByFile = formData.get("processedBy"); // Signature file (optional if already exists)
    const productsMetadataStr = formData.get("productsMetadata");

    if (!productsMetadataStr) {
      return ApiResponse(400, null, "Products data is required");
    }

    const productsMetadata = JSON.parse(productsMetadataStr);

    const isFileObject = (file) => {
      return (
        file &&
        typeof file === "object" &&
        typeof file.arrayBuffer === "function" &&
        file.size > 0
      );
    };

    const validateImage = (file) => {
      if (!isFileObject(file)) return false;
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (file.type && !validTypes.includes(file.type)) return false;
      if (file.size > 10 * 1024 * 1024) return false; // 10MB limit
      return true;
    };

    let finalProcessedByUrl = existingOrder.qc?.processedBy || null;

    if (processedByFile && isFileObject(processedByFile)) {
      if (!validateImage(processedByFile)) {
        return ApiResponse(
          400,
          null,
          "Invalid processed by signature image. Only images (JPG, PNG) under 10MB are allowed.",
        );
      }

      const processedByResult = await CloudneryService.upload(
        processedByFile,
        "qc",
        "image",
        "jpg",
      );
      if (!processedByResult) {
        return ApiResponse(500, null, "Failed to upload processed by signature");
      }
      finalProcessedByUrl = processedByResult.url;
    }

    if (!finalProcessedByUrl) {
      return ApiResponse(
        400,
        null,
        "Processed by signature image is required",
      );
    }

    const cleanRelativeUrl = (url) => {
      if (!url || typeof url !== "string") return "";
      if (url.includes("/upload/")) {
        return url.split("/upload/").pop();
      }
      return url;
    };

    const processedProducts = [];

    for (let i = 0; i < productsMetadata.length; i++) {
      const product = productsMetadata[i];
      const existingProduct = existingOrder.qc?.products?.[i] || {};

      const micrometerImageFile = formData.get(`micrometerImage_${i}`);
      const materialImageFile = formData.get(`materialImage_${i}`);

      let finalMicrometerUrl =
        product.micrometerImage || existingProduct.micrometerImage || null;
      let finalMaterialUrl =
        product.materialImage || existingProduct.materialImage || null;

      if (micrometerImageFile && isFileObject(micrometerImageFile)) {
        if (!validateImage(micrometerImageFile)) {
          return ApiResponse(
            400,
            null,
            `Invalid micrometer image for product ${product.materialCode}. Only JPG/PNG under 10MB allowed.`,
          );
        }
        const micrometerResult = await CloudneryService.upload(
          micrometerImageFile,
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
        finalMicrometerUrl = micrometerResult.url;
      }

      if (materialImageFile && isFileObject(materialImageFile)) {
        if (!validateImage(materialImageFile)) {
          return ApiResponse(
            400,
            null,
            `Invalid material image for product ${product.materialCode}. Only JPG/PNG under 10MB allowed.`,
          );
        }
        const materialResult = await CloudneryService.upload(
          materialImageFile,
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
        finalMaterialUrl = materialResult.url;
      }

      if (!finalMicrometerUrl || !finalMaterialUrl) {
        return ApiResponse(
          400,
          null,
          `Micrometer and material images are required for product: ${product.materialCode}`,
        );
      }

      processedProducts.push({
        materialCode: product.materialCode,
        length: product.length,
        thicknessWithinSpec: product.thicknessWithinSpec,
        materialFreeFromSurfaceDefects: product.materialFreeFromSurfaceDefects,
        cleanAndFitForPurpose: product.cleanAndFitForPurpose,
        micrometerImage: cleanRelativeUrl(finalMicrometerUrl),
        materialImage: cleanRelativeUrl(finalMaterialUrl),
      });
    }

    const order = await OrderService.updateQc(id, {
      distributorCode,
      distributorAccountName,
      shippingInfo: shippingInfoArr,
      products: processedProducts,
      orderReadyForShipment,
      processedBy: cleanRelativeUrl(finalProcessedByUrl),
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

    let qcData = null;
    if (order.qc) {
      const rawQc = order.qc.toObject();
      let normalizedShippingInfo = rawQc.shippingInfo || [];
      if (!Array.isArray(normalizedShippingInfo) || normalizedShippingInfo.length === 0) {
        if (rawQc.palletDimensions || rawQc.palletWeight) {
          normalizedShippingInfo = [
            {
              palletDimensions: rawQc.palletDimensions || "",
              palletWeight: rawQc.palletWeight || 0,
            },
          ];
        } else {
          normalizedShippingInfo = [{ palletDimensions: "", palletWeight: 0 }];
        }
      }

      qcData = {
        ...rawQc,
        shippingInfo: normalizedShippingInfo,
        processedBy: getUrls.getUrl(rawQc.processedBy),
        products: rawQc.products?.map((product) => ({
          ...product,
          micrometerImage: getUrls.getUrl(product.micrometerImage),
          materialImage: getUrls.getUrl(product.materialImage),
        })),
      };
    }

    return ApiResponse(
      200,
      qcData,
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
