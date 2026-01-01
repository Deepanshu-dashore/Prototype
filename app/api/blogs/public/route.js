import connect from "@/app/lib/db/connect";
import { Blog } from "@/app/lib/models/blog";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import mongoose from "mongoose";
import { getPublicBlogs } from "@/src/utils/blogUtils";

//Get all blogs with filtering, sorting, and search
export async function GET(request) {
  await connect();
  try {
    const id = request.nextUrl.searchParams.get("id");
    const slug = request.nextUrl.searchParams.get("slug");
    const search = request.nextUrl.searchParams.get("search");
    const sort = request.nextUrl.searchParams.get("sort") || "newest";
    const startDate = request.nextUrl.searchParams.get("startDate");
    const endDate = request.nextUrl.searchParams.get("endDate");

    // Fetch by ID
    if (id) {
      // Validate if ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return ApiResponse(400, null, "Invalid blog ID format");
      }

      try {
        const blog = await Blog.findById(id).lean();
        if (!blog) {
          return ApiResponse(404, null, "Blog not found");
        }
        return ApiResponse(200, blog, "Blog fetched by ID successfully");
      } catch (dbError) {
        console.error("Database error fetching blog by ID:", dbError);
        return ApiResponse(
          500,
          null,
          "Error fetching blog: " + dbError.message
        );
      }
    }

    // Fetch by slug
    if (slug) {
      try {
        const blog = await Blog.findOne({ slug: slug }).lean();
        if (!blog) {
          return ApiResponse(404, null, "Blog not found");
        }
        return ApiResponse(200, blog, "Blog fetched by slug successfully");
      } catch (dbError) {
        console.error("Database error fetching blog by slug:", dbError);
        return ApiResponse(
          500,
          null,
          "Error fetching blog: " + dbError.message
        );
      }
    }

    // Search functionality
    const category = request.nextUrl.searchParams.get("category");

    const result = await getPublicBlogs({
      search,
      category,
      sort,
    });

    // We still want to get some extra stats for the dashboard if needed,
    // but for the public grid, these are the main ones.
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

    const todayBlogCount = await Blog.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

    return ApiResponse(
      200,
      {
        totalCategories: categoriesWithCounts,
        totalBlogs: result.totalBlogs,
        todayBlogCount,
        categories: result.categories,
        blogs: result.blogs,
      },
      "Blogs fetched successfully"
    );
  } catch (error) {
    console.error("Error in public blogs API:", error);
    return ApiResponse(500, null, "Error fetching blogs: " + error.message);
  }
}
