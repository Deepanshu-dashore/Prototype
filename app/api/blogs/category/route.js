import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { Blog } from "@/app/lib/models/blog";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10;
    const search = request.nextUrl.searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    // Build aggregation pipeline
    const pipeline = [
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
    ];

    // Add search filter if provided
    if (search) {
      pipeline.push({
        $match: {
          name: { $regex: search, $options: "i" },
        },
      });
    }

    // Add sorting
    pipeline.push({
      $sort: { count: -1, name: 1 },
    });

    // Get all categories with blog counts
    const allCategoriesWithCounts = await Blog.aggregate(pipeline);

    const totalCategories = allCategoriesWithCounts.length;
    const paginatedCategories = allCategoriesWithCounts.slice(
      skip,
      skip + limit,
    );

    // Also get simple list of distinct categories for backward compatibility
    const categoriesList = await Blog.distinct("category");

    return ApiResponse(
      200,
      {
        categories: categoriesList,
        categoriesWithCounts: paginatedCategories,
        totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
        currentPage: page,
      },
      "Categories fetched successfully",
    );
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error fetching categories: " + error.message,
    );
  }
}
