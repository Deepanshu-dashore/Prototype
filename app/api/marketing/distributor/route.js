import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { MarketingAssetService } from "@/app/lib/services/marketingAsset.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

export async function GET() {
  const user = await verifyJWT();
  const distributor = await verifyDistributorJWT();

  const isAdmin = user && roleVerify(["admin"], user);
  const isDistributor = distributor && roleVerify(["distributor"], distributor);

  if (!isAdmin && !isDistributor) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }

  try {
    const { data } = await MarketingAssetService.getAllMarketingAssets({
      isActive: true,
    });
    const buildUrl = data.map((asset) => {
      if (asset.type === "youtube" || asset.type === "social_post") {
        return asset;
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
