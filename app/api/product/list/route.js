import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { verifyWarehouseJWT } from "@/app/lib/middlewares/verifyWarehouseJwt";
import Product from "@/app/lib/models/product";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { verifyDistributorJWT } from "@/app/lib/middlewares/verifyDistibutorJwt";

export async function GET(request) {
  const user = await verifyJWT();
  const distributor = await verifyDistributorJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !distributor?.id && !warehouse?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const search = request.nextUrl.searchParams.get("search");
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (search && typeof search === "string") {
      const escaped = search
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .slice(0, 100);
      query.$or = [
        { code: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
      ];
    }

    const [products, totalProducts] = await Promise.all([
      Product.find({ ...query, visibility: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments({ ...query, visibility: true }),
    ]);

    return ApiResponse(
      200,
      {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      },
      "Products fetched successfully",
    );
  } catch (error) {
    return ApiResponse(500, null, "Error fetching products: " + error.message);
  }
}
