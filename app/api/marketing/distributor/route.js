import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { MarketingAssetService } from "@/app/lib/services/marketingAsset.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

export async function GET(req) {
  const user = await verifyJWT();
  const distributor = await verifyDistributorJWT();

  const isAdmin = user && roleVerify(["admin"], user);
  const isDistributor = distributor && roleVerify(["distributor"], distributor);

  if (!isAdmin && !isDistributor) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const query = { isActive: true };
    if (type && type !== "all") {
      query.type = type;
    }

    const { data } = await MarketingAssetService.getAllMarketingAssets(query);
    const buildUrl = data.map((asset) => {
      if (asset.type === "youtube" || asset.type === "social_post") {
        return {
          ...asset,
          attachment: asset.attachment
            ? getUrls.getUrl(
                asset.attachment,
                asset.attachmentType === "video" ? "video" : (asset.attachmentType === "pdf" ? "raw" : "image")
              )
            : undefined,
        };
      } else {
        return {
          ...asset,
          url: getUrls.getUrl(asset.url, "raw"),
        };
      }
    });
    return ApiResponse(200, buildUrl, "Marketing assets fetched successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error for fetching marketing assets");
  }
}
