import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { EnquiryService } from "@/app/lib/services/enquiry.service";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";

export async function POST(request) {
  try {
    const body = await request.json();
    const enquiry = await EnquiryService.createEnquiry(body);
    return ApiResponse(200, enquiry, "Enquiry created successfully");
  } catch (error) {
    return ApiResponse(400, error, "Error while creating enquiry");
  }
}

export async function GET(request) {
  const user = await verifyJWT();
  if (!user.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const query = {
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: parseInt(searchParams.get("limit") || "10", 10),
      search: searchParams.get("search") || "",
    };

    const enquiries = await EnquiryService.getAllEnquiries(query);
    return ApiResponse(200, enquiries, "Enquiries fetched successfully");
  } catch (error) {
    return ApiResponse(400, error, "Error while fetching enquiries");
  }
}
