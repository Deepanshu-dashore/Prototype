import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import { hashPassword } from "@/app/lib/security/passwordHasher";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { mail } from "@/app/lib/utils/mail";
import { newDistributorApplicationTemplate } from "@/app/lib/utils/mailFormtes";

export async function POST(request) {
  try {
    const {
      companyName,
      companyEmail,
      companyNumber,
      linkedin,
      website,
      contactPersonName,
      contactPersonNumber,
      contactPersonEmail,
      contactPersonDesignation,
      shippingAddress,
      registeredAddress,
      billingAddress,
      question1,
      question2,
    } = await request.json();

    // company details
    if (!companyName || !companyEmail || !companyNumber) {
      return ApiResponse(400, null, "All Company details are required");
    }
    // contact person details
    if (
      !contactPersonName ||
      !contactPersonNumber ||
      !contactPersonEmail ||
      !contactPersonDesignation
    ) {
      return ApiResponse(400, null, "All Contact Person details are required");
    }
    // address details
    if (
      !registeredAddress.city ||
      !registeredAddress.state ||
      !registeredAddress.country ||
      !registeredAddress.pinCode ||
      !registeredAddress.street
    ) {
      return ApiResponse(400, null, "Registered Address is required");
    }
    const distributor = await DistributorService.createDistributor({
      companyEmail,
      companyNumber,
      linkedin,
      website,
      companyName,
      contactPersonName,
      contactPersonNumber,
      contactPersonEmail,
      contactPersonDesignation,
      shippingAddress: shippingAddress || registeredAddress,
      registeredAddress,
      billingAddress: billingAddress || registeredAddress,
      question1,
      question2,
    });
    await mail({
      from: process.env.EMAIL_FROM,
      to: [
        process.env.ADMIN_EMAIL,
        "deepanshudashore48@gmail.com",
        process.env.SALE_MAIL_UK,
      ],
      subject: "Distributor Request",
      body: newDistributorApplicationTemplate({
        apply: new Date(distributor.createdAt).toDateString(),
        distributorCompany: distributor.companyName,
        distributorEmail: distributor.companyEmail,
        distributorPhone: distributor.companyNumber,
        verificationUrl: "https://ccmatting.ie/login",
      }),
    });
    return ApiResponse(
      200,
      distributor,
      "Distributor Request send wait for admin approval",
    );
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Distributor Register failed " + error.message,
    );
  }
}

export async function GET(request) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const search = request.nextUrl.searchParams.get("search");

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { companyName: { $regex: search, $options: "i" } },
          { companyEmail: { $regex: search, $options: "i" } },
        ],
      };
    }

    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10;
    const paginate = request.nextUrl.searchParams.get("paginate") === "true";

    const result = await DistributorService.getAllDistributors(
      filter,
      {},
      paginate ? { page, limit } : {},
    );

    return ApiResponse(
      200,
      paginate
        ? {
            distributors: result.distributors,
            totalItems: result.total,
            totalPages: Math.ceil(result.total / limit),
            currentPage: page,
          }
        : result,
      "Distributors fetched successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Distributor fetch failed " + error.message);
  }
}
