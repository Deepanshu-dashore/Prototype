import connect from "@/app/lib/db/connect";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function PATCH(request, { params }) {
  await connect();
  try {
    const { id } = await params;

    const searchParams = request.nextUrl.searchParams;
    const documentId = searchParams.get("documentId");

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return ApiResponse(404, null, "No file uploaded");
    }

    if (!documentId) {
      return ApiResponse(404, null, "Document name is required");
    }

    const distributor = await DistributorService.getDistributor(id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }

    // Upload to Cloudinary
    const result = await CloudneryService.upload(
      file,
      "compliance",
      "raw", // Use raw for PDFs/docs
      "pdf",
    );

    if (!result || !result.url) {
      return ApiResponse(500, null, "Failed to upload document to Cloudinary");
    }

    // Check if document already exists
    const existingDocIndex = distributor.documents.findIndex(
      (doc) => doc.name === documentId,
    );

    const deleteDocument = distributor.documents[existingDocIndex];
    await CloudneryService.delete(deleteDocument?.url, "raw");

    if (existingDocIndex > -1) {
      // Update existing
      distributor.documents[existingDocIndex].url = result.url;
      distributor.documents[existingDocIndex].type = "pdf";
    } else {
      // Push new
      distributor.documents.push({
        name: documentId,
        url: result.url,
        type: "pdf",
      });
    }

    await distributor.save();
    return ApiResponse(200, distributor, "Document uploaded successfully");
  } catch (error) {
    console.error("Error in upload route:", error);
    return ApiResponse(500, null, error.message || "Internal Server Error");
  }
}
