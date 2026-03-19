import roleVerify from "@/app/lib/middlewares/roleVerify";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { MarketingAssetService } from "@/app/lib/services/marketingAsset.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { getUrls } from "@/app/lib/utils/geturl";

// ── GET single asset (used by edit page) ─────────────────────────────────────
export async function GET(request, { params }) {
  const { id } = await params;
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  try {
    const asset = await MarketingAssetService.getMarketingAssetById(id);
    if (!asset) return ApiResponse(404, null, "Marketing asset not found");
    let result = asset.toObject ? asset.toObject() : { ...asset };
    if (result.type === "case_study" || result.type === "playbook") {
      result.url = getUrls.getUrl(result.url, "raw");
    }
    if (result.type === "social_post") {
      result.attachment = result.attachment
        ? getUrls.getUrl(
            result.attachment,
            result.attachment.includes(".mp4") ||
              result.attachment.includes(".avi") ||
              result.attachment.includes(".mov") ||
              result.attachment.includes(".wmv") ||
              result.attachment.includes(".webm")
              ? "video"
              : "image",
          )
        : undefined;
    }
    return ApiResponse(200, result, "Marketing asset fetched successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error fetching marketing asset");
  }
}

// ── PUT update asset ──────────────────────────────────────────────────────────
export async function PUT(request, { params }) {
  const { id } = await params;
  const formData = await request.formData();
  const title = formData.get("title");
  const type = formData.get("type");
  const url = formData.get("url");
  const description = formData.get("description");
  const tags = formData.get("tags");
  const file = formData.get("file");
  const attachment = formData.get("attachment");
  const attachmentType = formData.get("attachmentType");
  const user = await verifyJWT();
  let uploadUrl = null;
  if (!user || !roleVerify(["admin"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  const existingCheck = await MarketingAssetService.getMarketingAssetById(id);
  if (!existingCheck) {
    return ApiResponse(404, null, "Marketing asset not found");
  }
  try {
    if (file && file.size > 0) {
      if (
        existingCheck.type === "youtube" ||
        existingCheck.type === "social_post"
      ) {
        return ApiResponse(400, null, "File is not allowed for this type");
      }
      if (existingCheck.url) {
        await CloudneryService.delete(existingCheck.url, "raw");
      }
      uploadUrl = await CloudneryService.upload(
        file,
        "marketing-assets",
        "raw",
        "pdf",
      );
      if (!uploadUrl) {
        return ApiResponse(400, null, "File upload failed, try again");
      }
    }

    let socialAttachmentUrl = null;
    if (attachment && attachment.size > 0 && type === "social_post") {
      if (existingCheck.attachment) {
        await CloudneryService.delete(
          existingCheck.attachment,
          attachmentType || "image",
        );
      }
      socialAttachmentUrl = await CloudneryService.upload(
        attachment,
        "marketing-assets",
        attachmentType || "image",
      );
      if (!socialAttachmentUrl) {
        return ApiResponse(400, null, "Attachment upload failed, try again");
      }
    }
    const setTages = new Set(tags ? tags.split(",") : []);
    const uniqueTags = [...setTages];
    const marketingAsset = await MarketingAssetService.updateMarketingAsset(
      id,
      {
        title,
        type,
        url: uploadUrl?.url || url || existingCheck.url,
        attachment: socialAttachmentUrl?.url || existingCheck.attachment,
        description,
        tags: uniqueTags,
      },
    );
    return ApiResponse(
      200,
      marketingAsset,
      "Marketing asset updated successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error updating marketing asset");
  }
}

// ── DELETE asset ───────────────────────────────────────────────────────────────
export async function DELETE(request, { params }) {
  const { id } = await params;
  const user = await verifyJWT();
  if (!user || !roleVerify(["admin"], user)) {
    return ApiResponse(401, null, "Unauthorized or insufficient permissions");
  }
  try {
    const existingCheck = await MarketingAssetService.getMarketingAssetById(id);
    if (!existingCheck) {
      return ApiResponse(404, null, "Marketing asset not found");
    }
    if (
      existingCheck.url &&
      (existingCheck.type === "case_study" || existingCheck.type === "playbook")
    ) {
      await CloudneryService.delete(existingCheck.url, "raw");
    }
    if (existingCheck.attachment && existingCheck.type === "social_post") {
      await CloudneryService.delete(existingCheck.attachment, "image");
    }
    const marketingAsset = await MarketingAssetService.deleteMarketingAsset(id);
    return ApiResponse(
      200,
      marketingAsset,
      "Marketing asset deleted successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error deleting marketing asset");
  }
}
