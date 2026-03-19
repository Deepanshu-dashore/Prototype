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
    const attachment = formData.get("attachment");
    const attachmentType = formData.get("attachmentType");
    let marketingAsset = {};
    const setTages = new Set(tags.split(","));
    const uniqueTags = [...setTages];
    if (!title) {
      return ApiResponse(400, null, "All fields are required");
    }
    if (type !== "social_post" && attachment) {
      return ApiResponse(400, null, "Unwanted field Attachment");
    }
    if (type === "social_post" && !attachment) {
      return ApiResponse(400, null, "Attachment is required for social post");
    }
    if (type === "social_post" && !attachmentType) {
      return ApiResponse(
        400,
        null,
        "Attachment type is required for social post",
      );
    }
    if (attachmentType && !["image", "video"].includes(attachmentType)) {
      return ApiResponse(400, null, "Invalid attachment type");
    }
    if (type === "youtube") {
      marketingAsset = await MarketingAssetService.createMarketingAsset({
        title,
        type,
        url,
        description,
        tags: uniqueTags,
      });
    } else if (type === "social_post") {
      const attachmentUrl = await CloudneryService.upload(
        attachment,
        "marketing-assets",
        attachmentType,
      );
      if (!attachmentUrl) {
        return ApiResponse(400, null, "File upload failed, try again");
      }
      marketingAsset = await MarketingAssetService.createMarketingAsset({
        title,
        type,
        url,
        description,
        attachment: attachmentUrl?.url,
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
        url: uploadUrl?.url,
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
    console.log(error);
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
        return {
          ...asset,
          attachment: asset.attachment
            ? getUrls.getUrl(
                asset.attachment,
                asset.attachment.includes(".mp4") ||
                  asset.attachment.includes(".avi") ||
                  asset.attachment.includes(".mov") ||
                  asset.attachment.includes(".wmv") ||
                  asset.attachment.includes(".webm")
                  ? "video"
                  : "image",
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
