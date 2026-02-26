import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import roleVerify from "@/app/lib/middlewares/roleVerify";
import Product from "@/app/lib/models/product";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

// GET single product by ID
export async function GET(request, { params }) {
  await connect();
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return ApiResponse(404, null, "Product not found");
    }
    return ApiResponse(200, product, "Product fetched successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error fetching product: " + error.message);
  }
}

// PUT update product
export async function PUT(request, { params }) {
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

    // Check uniqueness (excluding current product)
    const existing = await Product.findOne({
      code: code.trim(),
      _id: { $ne: params.id },
    });
    if (existing) {
      return ApiResponse(409, null, "A product with this code already exists");
    }

    const product = await Product.findByIdAndUpdate(
      params.id,
      { code: code.trim(), description: description.trim() },
      { new: true, runValidators: true },
    );
    if (!product) {
      return ApiResponse(404, null, "Product not found");
    }
    return ApiResponse(200, product, "Product updated successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error updating product: " + error.message);
  }
}

// DELETE product
export async function DELETE(request, { params }) {
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
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) {
      return ApiResponse(404, null, "Product not found");
    }
    return ApiResponse(200, product, "Product deleted successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error deleting product: " + error.message);
  }
}
