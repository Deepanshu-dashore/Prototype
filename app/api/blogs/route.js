import connect from "@/app/lib/db/connect";
import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { Blog } from "@/app/lib/models/blog";
import { ApiResponse } from "@/app/lib/utils/apiResponse";
import { escapeRegExp } from "@/app/lib/security/validator";
import { sanitizeHTML, sanitizeText } from "@/app/lib/security/sanitizer";
import { CloudneryService } from "@/app/lib/services/cloudnery.service";

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

    // Search functionality with ReDoS protection
    if (search && typeof search === "string") {
      const escapedSearch = escapeRegExp(search.slice(0, 100)); // Limit search length
      query.$or = [
        { title: { $regex: escapedSearch, $options: "i" } },
        { category: { $regex: escapedSearch, $options: "i" } },
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

    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(query)
        .sort(sortOption)
        .select("-__v -updatedAt -excerpt -content -readingTime")
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      Blog.countDocuments(query),
    ]);

    return ApiResponse(
      200,
      {
        totalCategories: categoriesWithCounts,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
        todayBlogCount,
        blogs,
      },
      "Blogs fetched successfully",
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
    const formData = await request.formData();

    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const category = formData.get("category");
    const tagsRaw = formData.get("tags");
    const author = formData.get("author");
    const content = formData.get("content");
    const featured = formData.get("featured");
    const readingTime = formData.get("readingTime");
    const featuredImage = formData.get("featuredImage");

    // Parse tags from JSON string
    let tags = [];
    try {
      const parsed = JSON.parse(tagsRaw);
      tags = Array.isArray(parsed) ? parsed : [parsed].filter(Boolean);
    } catch {
      tags = tagsRaw
        ? tagsRaw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
    }

    // Validate and sanitize inputs
    if (tags.length === 0) {
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

    let uploaded = { id: "", url: "" };
    // blog image check
    if (featuredImage && typeof featuredImage !== "string") {
      uploaded = await CloudneryService.upload(
        featuredImage,
        "blogs",
        "image",
        "image",
      );
    }

    // Sanitize content to prevent XSS
    const sanitizedContent = await sanitizeHTML(content);
    const sanitizedTitle = sanitizeText(title);
    const sanitizedExcerpt = sanitizeText(excerpt);
    const sanitizedCategory = sanitizeText(category);

    let slug = sanitizedTitle.toLowerCase().replace(/ /g, "-").slice(0, 100);
    slug = `${slug}-${new Date().getTime()}`;

    const blog = await Blog.create({
      title: sanitizedTitle,
      slug,
      excerpt: sanitizedExcerpt,
      category: sanitizedCategory,
      tags: tags.map((t) => sanitizeText(t)).filter(Boolean),
      author: author ? sanitizeText(author) : "CC Matting",
      content: sanitizedContent,
      featured,
      readingTime,
      featuredImage: uploaded?.url || "",
      imageId: uploaded?.id || "",
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

  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const category = formData.get("category");
    const tagsRaw = formData.get("tags");
    const author = formData.get("author");
    const content = formData.get("content");
    const featured = formData.get("featured");
    const readingTime = formData.get("readingTime");
    const featuredImage = formData.get("featuredImage"); // File or null
    const existingImage = formData.get("existingImage"); // URL string or null
    const bodyId = formData.get("id");

    const id = request.nextUrl.searchParams.get("id") || bodyId;
    if (!id) {
      return ApiResponse(400, null, "Blog ID is required");
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return ApiResponse(400, null, "Blog not found");
    }

    // Parse tags
    let tags = [];
    try {
      const parsed = JSON.parse(tagsRaw);
      tags = Array.isArray(parsed) ? parsed : [parsed].filter(Boolean);
    } catch {
      tags = tagsRaw
        ? tagsRaw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
    }

    if (tags.length === 0) {
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

    // Sanitize inputs
    const sanitizedTitle = sanitizeText(title);
    const sanitizedExcerpt = sanitizeText(excerpt);
    const sanitizedCategory = sanitizeText(category);
    const sanitizedContent = await sanitizeHTML(content);
    const sanitizedTags = tags.map((t) => sanitizeText(t)).filter(Boolean);

    // Handle image: new upload or keep existing
    let finalImageUrl = blog.featuredImage;
    let finalImageId = blog.imageId;

    if (featuredImage && typeof featuredImage !== "string") {
      // New image file uploaded — delete old from Cloudinary if exists
      if (blog.imageId) {
        await CloudneryService.delete(blog.imageId, "image");
      }

      const uploaded = await CloudneryService.upload(
        featuredImage,
        "blogs",
        "image",
        "image",
      );
      if (uploaded) {
        finalImageUrl = uploaded.url;
        finalImageId = uploaded.id;
      }
    } else if (existingImage) {
      // Keep existing image URL (no change)
      finalImageUrl = existingImage;
    }

    const res = await Blog.findByIdAndUpdate(
      id,
      {
        title: sanitizedTitle,
        excerpt: sanitizedExcerpt,
        category: sanitizedCategory,
        tags: sanitizedTags,
        author: author ? sanitizeText(author) : "CC Matting",
        content: sanitizedContent,
        featured,
        readingTime,
        featuredImage: finalImageUrl,
        imageId: finalImageId,
      },
      { new: true },
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
    const blog = await Blog.findById(id);
    if (!blog) {
      return ApiResponse(404, null, "Blog not found");
    }

    // Delete image from Cloudinary if it exists
    if (blog.imageId) {
      await CloudneryService.delete(blog.imageId, "image");
    }

    await Blog.findByIdAndDelete(id);
    return ApiResponse(200, blog, "Blog deleted successfully");
  } catch (error) {
    return ApiResponse(500, null, "Error deleting blog " + error.message);
  }
}
