import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { Blog } from "@/app/lib/models/blog";
import { ApiResponse } from "@/app/lib/utlis/apiResponse";

//Get all blogs with filtering, sorting, and search
export async function GET(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const id = request.nextUrl.searchParams.get("id");
    const search = request.nextUrl.searchParams.get("search");
    const sort = request.nextUrl.searchParams.get("sort") || "newest";
    const startDate = request.nextUrl.searchParams.get("startDate");
    const endDate = request.nextUrl.searchParams.get("endDate");

    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) {
        return ApiResponse(404, null, "Blog not found");
      }
      return ApiResponse(200, blog, "Blog fetched by ID successfully");
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

    const blogs = await Blog.find(query)
      .sort(sortOption)
      .select("-__v -updatedAt -excerpt -content -readingTime")
      .lean()
      .exec();

    return ApiResponse(
      200,
      {
        totalCategories: categoriesWithCounts,
        totalBlogs: blogs.length,
        todayBlogCount,
        blogs,
      },
      "Blogs fetched successfully"
    );
  } catch (error) {
    return ApiResponse(500, null, "Error fetching blogs: " + error.message);
  }
}

//Create a new blog
export async function POST(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  try {
    const {
      title,
      excerpt,
      category,
      tags,
      author,
      content,
      featured,
      readingTime,
      featuredImage,
    } = await request.json();
    console.log(
      title,
      excerpt,
      category,
      tags,
      author,
      content,
      featured,
      readingTime,
      featuredImage
    );
    if (tags.length === 0 && Array.isArray(tags)) {
      return ApiResponse(400, null, "Tags are required");
    }
    if (!title) {
      return ApiResponse(400, null, "Title is required");
    }
    if (!excerpt) {
      return ApiResponse(400, null, "Excerpt is required");
    }
    if (!category) {
      return ApiResponse(400, null, "Category is required");
    }
    if (!content) {
      return ApiResponse(400, null, "Content is required");
    }

    let slug = title.toLowerCase().replace(/ /g, "-");
    slug = `${slug}-${new Date().getTime()}`;
    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      category,
      tags,
      author,
      content,
      featured,
      readingTime,
      featuredImage,
    });
    return ApiResponse(201, blog, "Blog created successfully");
  } catch (error) {
    console.log(error);
    return ApiResponse(500, null, "Error creating blog " + error.message);
  }
}

//Update a blog
export async function PATCH(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();

  const {
    title,
    excerpt,
    category,
    tags,
    author,
    content,
    featured,
    readingTime,
    featuredImage,
    id: bodyId,
  } = await request.json();
  const id = request.nextUrl.searchParams.get("id") || bodyId;
  console.log("edit id->", id);
  if (!id) {
    return ApiResponse(400, null, "Blog ID is required");
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return ApiResponse(400, null, "Blog not found");
  }
  if (tags.length === 0 && Array.isArray(tags)) {
    return ApiResponse(400, null, "Tags are required");
  }
  if (!title) {
    return ApiResponse(400, null, "Title is required");
  }
  if (!excerpt) {
    return ApiResponse(400, null, "Excerpt is required");
  }
  if (!category) {
    return ApiResponse(400, null, "Category is required");
  }
  if (!content) {
    return ApiResponse(400, null, "Content is required");
  }

  try {
    const res = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        excerpt,
        category,
        tags,
        author,
        content,
        featured,
        readingTime,
        featuredImage,
      },
      { new: true }
    );
    return ApiResponse(200, res, "Blog updated successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error updating blog " + error.message);
  }
}

//Delete a blog
export async function DELETE(request) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  await connect();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return ApiResponse(400, null, "Blog ID is required");
  }
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return ApiResponse(404, null, "Blog not found");
    }
    return ApiResponse(200, blog, "Blog deleted successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error deleting blog " + error.message);
  }
}
