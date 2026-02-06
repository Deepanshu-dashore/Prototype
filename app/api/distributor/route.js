import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
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
      yearOfEstablishment,
      contactPersonName,
      contactPersonNumber,
      contactPersonEmail,
      contactPersonDesignation,
      shippingAddress,
      registeredAddress,
      billingAddress,
    } = await request.json();

    // company details
    if (
      !companyName ||
      !companyEmail ||
      !companyNumber ||
      !yearOfEstablishment
    ) {
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
      !registeredAddress.pinCode
    ) {
      return ApiResponse(400, null, "Registered Address is required");
    }
    const distributor = await DistributorService.createDistributor({
      companyEmail,
      companyNumber,
      yearOfEstablishment,
      companyName,
      contactPersonName,
      contactPersonNumber,
      contactPersonEmail,
      contactPersonDesignation,
      shippingAddress: shippingAddress || registeredAddress,
      registeredAddress,
      billingAddress: billingAddress || registeredAddress,
    });
    await mail({
      from: "CC Matting <dashd9396@gmail.com>",
      to: process.env.ADMIN_EMAIL,
      subject: "Distributor Request",
      body: newDistributorApplicationTemplate({
        apply: new Date(distributor.createdAt).toDateString(),
        distributorCompany: distributor.companyName,
        distributorEmail: distributor.companyEmail,
        distributorPhone: distributor.companyNumber,
        verificationUrl: "https://prototype-alpha-six.vercel.app/login",
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
  if (!user?.id) {
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

    const distributors = await DistributorService.getAllDistributors(filter);
    return ApiResponse(200, distributors, "Distributors fetched successfully");
  } catch (error) {
    return ApiResponse(500, null, "Distributor fetch failed " + error.message);
  }
}
