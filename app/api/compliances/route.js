import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { ComplianceService } from "@/app/lib/services/compliances.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

export async function POST(req) {
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin", "warehouse"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const urlString = formData.get("url");
    const file = formData.get("file");

    if (!title) {
      return ApiResponse(400, null, "Title is required");
    }

    // Check if compliance with the same title already exists
    const existing = await ComplianceService.getAllCompliances({ title });
    if (existing && existing.length > 0) {
      const prevDoc = existing[0];
      if (prevDoc.url) {
        try {
          await CloudneryService.delete(prevDoc.url, "raw");
        } catch (delErr) {
          console.error(
            "Failed to delete previous file from Cloudinary:",
            delErr,
          );
        }
      }
      await ComplianceService.deleteCompliance(prevDoc._id);
    }

    let finalUrl = urlString || "";

    if (file && file.size > 0) {
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

    const compliance = await ComplianceService.createCompliance({
      title,
      subtitle,
      url: finalUrl,
    });

    return ApiResponse(
      200,
      compliance,
      "Compliance document created successfully",
    );
  } catch (error) {
    console.error("Error creating compliance:", error);
    return ApiResponse(500, null, "Error creating compliance document");
  }
}

export async function GET() {
  const user = await verifyJWT();
  const distributor = await verifyDistributorJWT();

  const isAdminOrWarehouse = user && roleVerify(["admin", "warehouse"], user);
  const isDistributor = distributor && roleVerify(["distributor"], distributor);

  if (!isAdminOrWarehouse && !isDistributor) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  try {
    const compliances = await ComplianceService.getAllCompliances();
    const formatted = compliances.map(doc => {
      let result = doc.toObject ? doc.toObject() : { ...doc };
      if (result.url) {
        result.url = getUrls.getUrl(result.url, "raw");
      }
      return result;
    });
    return ApiResponse(
      200,
      formatted,
      "Compliance documents fetched successfully",
    );
  } catch (error) {
    console.error("Error fetching compliances:", error);
    return ApiResponse(500, null, "Error fetching compliance documents");
  }
}
