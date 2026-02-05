import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { hashPassword } from "@/app/lib/security/passwordHasher";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

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
      contactPersonAlterNumber,
      password,
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
    // if (!shippingAddress) {
    //   return ApiResponse(400, null, "Shipping Address is required");
    // }
    // if (!billingAddress) {
    //   return ApiResponse(400, null, "Billing Address is required");
    // }

    const distributor = await DistributorService.createDistributor({
      companyEmail,
      companyNumber,
      yearOfEstablishment,
      companyName,
      contactPersonName,
      contactPersonNumber,
      contactPersonEmail,
      contactPersonDesignation,
      password,
      contactPersonAlterNumber: contactPersonAlterNumber || "",
      shippingAddress: shippingAddress || registeredAddress,
      registeredAddress,
      billingAddress: billingAddress || registeredAddress,
    });
    return ApiResponse(
      200,
      distributor,
      "Distributor Request send wait for admin approval",
    );
  } catch (error) {
    return ApiResponse(500, null, "Distributor login failed " + error.message);
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
