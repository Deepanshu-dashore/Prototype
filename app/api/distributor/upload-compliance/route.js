import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

export async function GET(request) {
  try {
    const user = await verifyDistributorJWT();
    if (!user?.id) {
      return ApiResponse(401, null, "Unauthorized request");
    }

    const distributor = await DistributorService.getDistributor(user.id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }

    if (!distributor.documents || distributor.documents.length <= 0) {
      return ApiResponse(200, [], "Distributor has no documents");
    }

    const transformedDocs = distributor.documents.map((doc) => ({
      ...doc.toObject(),
      url: getUrls.getUrl(doc.url, "raw"),
    }));

    return ApiResponse(200, transformedDocs, "Documents fetched successfully");
  } catch (error) {
    return ApiResponse(500, null, error.message || "Internal Server Error");
  }
}
