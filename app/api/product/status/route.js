import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import Product from "@/app/lib/models/product";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function PATCH(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await request.json();
    const product = await Product.findById(id);
    if (!product) {
      return ApiResponse(404, null, "Product not found");
    }
    product.visibility = !product.visibility;
    await product.save();
    return ApiResponse(200, product, "Product status updated successfully");
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error updating product status: " + error.message,
    );
  }
}
