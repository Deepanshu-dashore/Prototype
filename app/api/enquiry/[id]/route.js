import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { EnquiryService } from "@/app/lib/services/enquiry.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const enquiry = await EnquiryService.getEnquiryById(id);
    return ApiResponse(200, enquiry, "Enquiry fetched successfully");
  } catch (error) {
    return ApiResponse(400, error, "Error while fetching enquiry");
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const enquiry = await EnquiryService.updateEnquiry(id, body);
    return ApiResponse(200, enquiry, "Enquiry updated successfully");
  } catch (error) {
    return ApiResponse(400, error, "Error while updating enquiry");
  }
}

export async function DELETE(request, { params }) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user.id || !warehouse.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await params;
    const enquiry = await EnquiryService.deleteEnquiry(id);
    return ApiResponse(200, enquiry, "Enquiry deleted successfully");
  } catch (error) {
    return ApiResponse(400, error, "Error while deleting enquiry");
  }
}
