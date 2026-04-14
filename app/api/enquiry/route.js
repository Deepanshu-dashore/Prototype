import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { EnquiryService } from "@/app/lib/services/enquiry.service";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { contactFormSubmissionTemplate } from "@/app/lib/utils/mailFormtes";
import { mail } from "@/app/lib/utils/mail";

export async function POST(request) {
  try {
    const body = await request.json();
    const enquiry = await EnquiryService.createEnquiry(body);

    // Send email notification to Admin
    try {
      const emailContent = contactFormSubmissionTemplate({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        productOfInterest: body.productOfInterest,
        message: body.message,
      });

      const recipients = [
        "harshrajrathore.dev@gmail.com",
        process.env.ADMIN_EMAIL,
        process.env.SALE_MAIL,
      ]
        .map((email) => email?.trim())
        .filter(Boolean);

      console.log("Attempting to send enquiry email to:", recipients);

      const emailResponse = await mail({
        to: recipients,
        from: process.env.EMAIL_FROM,
        subject: `New Contact Inquiry - ${body.fullName}`,
        body: emailContent,
      });

      if (!emailResponse) {
        console.error("Email sending returned false (failed)");
      }
    } catch (emailError) {
      console.error("Internal Error in email notification flow:", emailError);
    }

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
