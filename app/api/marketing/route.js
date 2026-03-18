import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { MarketingAssetService } from "@/app/lib/services/marketingAsset.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";



export async function POST(req) {
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  try {
    // const { title, type, url, description, tags } = await req.json();
    const formData = await req.formData();
    const title = formData.get("title");
    const type = formData.get("type");
    const url = formData.get("url");
    const description = formData.get("description");
    const tags = formData.get("tags");
    const file = formData.get("file");
    let marketingAsset = {};
    const setTages = new Set(tags.split(","));
    const uniqueTags = [...setTages];
    if (!title) {
      return ApiResponse(400, null, "All fields are required");
    }
    if (type === "youtube" || type === "social_post") {
      marketingAsset = await MarketingAssetService.createMarketingAsset({
        title,
        type,
        url,
        description,
        tags: uniqueTags,
      });
    } else if (type === "case_study" || type === "playbook") {
      if (!file) {
        return ApiResponse(400, null, "File is required");
      }
      const uploadUrl = await CloudneryService.upload(
        file,
        "marketing-assets",
        "raw",
        "pdf",
      );
      if (!uploadUrl) {
        return ApiResponse(400, null, "File upload failed, try again");
      }
      marketingAsset = await MarketingAssetService.createMarketingAsset({
        title,
        type,
        url: uploadUrl,
        description,
        tags: uniqueTags,
      });
    }
    return ApiResponse(
      200,
      marketingAsset,
      "Marketing asset created successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error for creating marketing asset");
  }
}

export async function GET() {
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  try {
    const result = await MarketingAssetService.getAllMarketingAssets();
    const {
      data,
      totalYoutube,
      totalSocialPost,
      totalCaseStudy,
      totalPlaybook,
    } = result;
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
    return ApiResponse(
      200,
      {
        data: buildUrl,
        totalYoutube,
        totalSocialPost,
        totalCaseStudy,
        totalPlaybook,
      },
      "Marketing assets fetched successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error for fetching marketing assets");
  }
}
