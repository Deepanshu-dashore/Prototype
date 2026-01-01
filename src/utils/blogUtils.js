import connect from "@/app/lib/db/connect";
import { Blog } from "@/app/lib/models/blog";

/**
 * Get public blogs with filtering, sorting, and search
 * @param {Object} options - Filtering options
 * @param {string} options.search - Search query
 * @param {string} options.category - Category filter
 * @param {string} options.sort - Sort option (newest, oldest, a-z, z-a)
 */
export async function getPublicBlogs(options = {}) {
  await connect();

  const { search, category, sort = "newest" } = options;

  let query = {};

  // Search functionality
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  // Category filter
  if (category && category !== "All") {
    query.category = category;
  }

  // Sorting - Always add _id for deterministic results
  let sortOption = { createdAt: -1, _id: -1 };
  switch (sort) {
    case "oldest":
      sortOption = { createdAt: 1, _id: 1 };
      break;
    case "a-z":
      sortOption = { title: 1, _id: 1 };
      break;
    case "z-a":
      sortOption = { title: -1, _id: -1 };
      break;
    case "newest":
    default:
      sortOption = { createdAt: -1, _id: -1 };
  }

  const blogs = await Blog.find(query)
    .sort(sortOption)
    .select("-__v -updatedAt -content")
    .lean()
    .exec();

  // Fully serialize the data for Next.js Server Components
  const serializedBlogs = blogs.map((blog) => ({
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt?.toISOString(),
  }));

  const categories = await Blog.distinct("category").lean().exec();

  return {
    blogs: serializedBlogs,
    categories,
    totalBlogs: blogs.length,
  };
}

export async function getBlogByIdOrSlug(idOrSlug) {
  await connect();

  let query = {};

  // Check if it's a valid MongoDB ObjectId
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

  if (isObjectId) {
    query = { _id: idOrSlug };
  } else {
    query = { slug: idOrSlug };
  }

  const blog = await Blog.findOne(query).lean();
  if (!blog) return null;

  return {
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt?.toISOString(),
  };
}
