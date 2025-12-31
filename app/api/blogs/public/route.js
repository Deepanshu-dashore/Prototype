import connect from "@/app/lib/db/connect";
import { Blog } from "@/app/lib/models/blog";
import { ApiResponse } from "@/app/lib/utlis/apiResponse";
import mongoose from "mongoose";

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

    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Date filtering
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "a-z":
        sortOption = { title: 1 };
        break;
      case "z-a":
        sortOption = { title: -1 };
        break;
      case "newest":
      default:
        sortOption = { createdAt: -1 };
    }

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

    const categories = await Blog.distinct("category").lean().exec();

    const blogs = await Blog.find(query)
      .sort(sortOption)
      .select("-__v -updatedAt -content ")
      .lean()
      .exec();

    return ApiResponse(
      200,
      {
        totalCategories: categoriesWithCounts,
        totalBlogs: blogs.length,
        todayBlogCount,
        categories,
        blogs,
      },
      "Blogs fetched successfully"
    );
  } catch (error) {
    return ApiResponse(500, null, "Error fetching blogs: " + error.message);
  }
}
