import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { ComplianceService } from "@/app/lib/services/compliances.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

export async function GET(request, { params }) {
  const { id } = await params;
  const user = await verifyJWT();
  const distributor = await verifyDistributorJWT();

  const isAdminOrWarehouse = user && roleVerify(["admin", "warehouse"], user);
  const isDistributor = distributor && roleVerify(["distributor"], distributor);

  if (!isAdminOrWarehouse && !isDistributor) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  try {
    const compliance = await ComplianceService.getComplianceById(id);
    if (!compliance) {
      return ApiResponse(404, null, "Compliance document not found");
    }
    const result = compliance.toObject ? compliance.toObject() : { ...compliance };
    if (result.url) {
      result.url = getUrls.getUrl(result.url, "raw");
    }
    return ApiResponse(
      200,
      result,
      "Compliance document fetched successfully",
    );
  } catch (error) {
    console.error("Error fetching compliance by id:", error);
    return ApiResponse(500, null, "Error fetching compliance document");
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin", "warehouse"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }

  const existingCheck = await ComplianceService.getComplianceById(id);
  if (!existingCheck) {
    return ApiResponse(404, null, "Compliance document not found");
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const urlString = formData.get("url");
    const file = formData.get("file");
    const catgory = formData.get("catgory");
    const status = formData.get("status");

    let finalUrl = urlString !== null ? urlString : existingCheck.url;

    if (file && file.size > 0) {
      // If there is an existing file, delete it first
      if (existingCheck.url) {
        try {
          await CloudneryService.delete(existingCheck.url, "raw");
        } catch (delError) {
          console.error("Failed to delete old file from Cloudinary:", delError);
        }
      }

      const uploadUrl = await CloudneryService.upload(
        file,
        "compliance",
        "raw",
        "pdf",
      );
      if (!uploadUrl || !uploadUrl.url) {
        return ApiResponse(400, null, "File upload failed, try again");
      }
      finalUrl = uploadUrl.url;
    }

    const updated = await ComplianceService.updateCompliance(id, {
      title: title !== null ? title : existingCheck.title,
      subtitle: subtitle !== null ? subtitle : existingCheck.subtitle,
      url: finalUrl,
      catgory: catgory !== null ? catgory : existingCheck.catgory,
      status: status !== null ? status : existingCheck.status,
    });

    return ApiResponse(200, updated, "Compliance document updated successfully");
  } catch (error) {
    console.error("Error updating compliance:", error);
    return ApiResponse(500, null, "Error updating compliance document");
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }

  const existingCheck = await ComplianceService.getComplianceById(id);
  if (!existingCheck) {
    return ApiResponse(404, null, "Compliance document not found");
  }

  try {
    if (existingCheck.url) {
      try {
        await CloudneryService.delete(existingCheck.url, "raw");
      } catch (delError) {
        console.error("Failed to delete file from Cloudinary on delete:", delError);
      }
    }

    await ComplianceService.deleteCompliance(id);
    return ApiResponse(
      200,
      existingCheck,
      "Compliance document deleted successfully",
    );
  } catch (error) {
    console.error("Error deleting compliance:", error);
    return ApiResponse(500, null, "Error deleting compliance document");
  }
}

