import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import Product from "@/app/lib/models/product";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

// GET all products (with pagination & search)
export async function GET(request) {
  const user = await verifyJWT();
  const warehouse = await verifyWarehouseJWT();
  if (!user?.id && !warehouse?.id) {
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
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
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

// POST create product
export async function POST(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  const role = roleVerify(["admin"], user);
  if (!role?.verify) {
    return ApiResponse(403, null, "Forbidden: insufficient permissions");
  }
  await connect();
  try {
    const { code, description } = await request.json();

    if (!code || !code.trim()) {
      return ApiResponse(400, null, "Product code is required");
    }
    if (!description || !description.trim()) {
      return ApiResponse(400, null, "Product description is required");
    }

    // Check uniqueness
    const existing = await Product.findOne({ code: code.trim() });
    if (existing) {
      return ApiResponse(409, null, "A product with this code already exists");
    }

    const product = await Product.create({
      code: code.trim(),
      description: description.trim(),
    });
    return ApiResponse(201, product, "Product created successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error creating product: " + error.message);
  }
}
