import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { Blog } from "@/app/lib/models/blog";
import { ApiResponse } from "@/app/lib/utlis/apiResponse";

export async function GET() {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    // Get all categories with blog counts
    const categoriesWithCounts = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          latestBlog: { $max: "$createdAt" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
          latestBlog: 1,
        },
      },
      {
        $sort: { count: -1, name: 1 },
      },
    ]);

    // Also get simple list of distinct categories for backward compatibility
    const categories = await Blog.distinct("category");

    return ApiResponse(
      200,
      {
        categories: categories,
        categoriesWithCounts: categoriesWithCounts,
      },
      "Categories fetched successfully"
    );
  } catch (error) {
    return ApiResponse(500, null, "Error fetching categories: " + error.message);
  }
}