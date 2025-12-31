"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
  Squares2X2Icon,
  CalendarIcon,
  UserIcon,
  PhotoIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

export default function BlogboardPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    todayCount: 0,
    categoryCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (sortOrder) params.append("sort", sortOrder);

      const res = await axios.get(`/api/blogs?${params.toString()}`);
      if (res.data?.success) {
        const data = res.data.data;
        // Handle both old (array) and new (object) response structures for safety during transition
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs(data.blogs || []);
          setStats({
            totalBlogs: data.totalBlogs || 0,
            todayCount: data.todayBlogCount || 0,
            categoryCount: data.totalCategories?.length || 0,
          });
        }
      } else {
        setError(res.data?.message || "Failed to fetch blogs");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Modal States
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    blogId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, blogId: id });
  };

  const confirmDelete = async () => {
    if (!deleteModal.blogId) return;

    try {
      setIsDeleting(true);
      const res = await axios.delete(`/api/blogs?id=${deleteModal.blogId}`);
      if (res.data?.success) {
        fetchBlogs();
        setDeleteModal({ isOpen: false, blogId: null });
      } else {
        alert(res.data?.message || "Failed to delete blog");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const getInitials = (title) => {
    return title ? title.charAt(0).toUpperCase() : "B";
  };

  return (
    <div className="min-h-screen py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Blog Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage, edit, and publish your content.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/blogboard/add"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-all transform active:scale-95 text-sm font-medium"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Blog</span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white relative overflow-hidden p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Blogs</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalBlogs}
                </h3>
              </div>
              <div className="w-24 h-24 absolute -right-6 rounded-2xl rotate-45 bg-blue-700/60 flex items-center justify-center text-blue-600">
                <DocumentTextIcon className="w-6 h-6 mt-2 mr-2 text-blue-100 -rotate-45" />
              </div>
            </div>

            <div className="bg-white relative overflow-hidden p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Today's Posts
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.todayCount}
                </h3>
              </div>
              <div className="w-24 h-24 absolute -right-6 rounded-2xl rotate-45 bg-emerald-700/60 flex items-center justify-center text-emerald-600">
                <CalendarIcon className="w-6 h-6 mt-2 mr-2 text-emerald-100 -rotate-45" />
              </div>
            </div>

            <div className="bg-white relative overflow-hidden p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Categories
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.categoryCount}
                </h3>
              </div>
              <div className="w-24 h-24 absolute -right-6 rounded-2xl rotate-45 bg-indigo-500/60 flex items-center justify-center text-indigo-600">
                <FunnelIcon className="w-6 h-6 mt-2 mr-2 text-indigo-100 -rotate-45" />
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 justify-between items-end lg:items-center">
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title or category..."
                className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Date Filters */}
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                  Date:
                </span>
                <input
                  type="date"
                  className="bg-transparent text-xs border-none p-0 focus:ring-0 text-gray-700 w-24"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="text-gray-300">-</span>
                <input
                  type="date"
                  className="bg-transparent text-xs border-none p-0 focus:ring-0 text-gray-700 w-24"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer w-32"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
                <FunnelIcon className="w-4 h-4 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>

              {/* Apply Button */}
              <button
                onClick={fetchBlogs}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 shadow-sm transition-all text-sm font-medium"
              >
                <FunnelIcon className="w-4 h-4" />
                Apply
              </button>

              {/* View Toggles */}
              <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 ml-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="List View"
                >
                  <ListBulletIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="Grid View"
                >
                  <Squares2X2Icon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl h-64 border border-gray-100 shadow-sm"
                ></div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 border border-red-100 text-center">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm border-dashed">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No blogs found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or create a new post.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === "list" ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Author
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {blogs.map((blog) => (
                          <tr
                            key={blog._id}
                            className="hover:bg-gray-50/60 transition-colors group"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {blog.featuredImage ? (
                                  <div className="h-10 w-10 shrink-0 relative rounded-lg overflow-hidden border border-gray-100">
                                    <Image
                                      src={blog.featuredImage}
                                      alt=""
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">
                                    {getInitials(blog.title)}
                                  </div>
                                )}
                                <Link
                                  href={`/admin/blogboard/view/${blog._id}`}
                                  className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1 max-w-[200px] lg:max-w-xs"
                                >
                                  {blog.title}
                                </Link>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/50">
                                {blog.category?.name ||
                                  blog.category ||
                                  "Uncategorized"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {blog.author?.avatar ? (
                                  <img
                                    src={blog.author.avatar}
                                    alt=""
                                    className="w-5 h-5 rounded-full"
                                  />
                                ) : (
                                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                    <UserIcon className="w-3 h-3 text-gray-400" />
                                  </div>
                                )}
                                <span className="text-xs text-gray-600 font-medium">
                                  {blog.author?.name ||
                                    blog?.author ||
                                    "Unknown"}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                                {formatDate(blog.createdAt)}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/admin/blogboard/view/${blog._id}`}
                                  className="p-1.5 rounded-md shadow-sm transition-all bg-emerald-600 text-white hover:bg-emerald-700"
                                  title="View Blog"
                                >
                                  <EyeIcon className="w-4 h-4" />
                                </Link>
                                <Link
                                  href={`/admin/blogboard/edit/${blog._id}`}
                                  className="p-1.5 rounded-md shadow-sm transition-all bg-blue-600 text-white hover:bg-blue-700"
                                  title="Edit"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => handleDelete(blog._id)}
                                  className="p-1.5 rounded-md shadow-sm transition-all bg-red-600 text-white hover:bg-red-700"
                                  title="Delete"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {blogs.length}
                      </span>{" "}
                      blogs
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {blogs.map((blog, index) => (
                    <div
                      key={blog._id}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                        {blog.featuredImage ? (
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200/50">
                            <span className="text-6xl font-bold select-none text-indigo-900/10">
                              {getInitials(blog.title)}
                            </span>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <PhotoIcon className="w-12 h-12 text-indigo-300/50" />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-gray-800 shadow-sm border border-gray-100">
                            {blog.category?.name || blog.category || "General"}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col grow">
                        <div className="flex items-center gap-2 mb-3">
                          <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500 font-medium">
                            {formatDate(blog.createdAt)}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>

                        {/* Actions Footer */}
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            {blog.author?.avatar ? (
                              <img
                                src={blog.author.avatar}
                                alt=""
                                className="w-5 h-5 rounded-full ring-1 ring-gray-100"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                <UserIcon className="w-3 h-3 text-gray-400" />
                              </div>
                            )}
                            <span className="text-xs text-gray-600 font-medium truncate max-w-[100px]">
                              {blog.author?.name || "Admin"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/blogboard/view/${blog._id}`}
                              className="p-2 rounded-md shadow-sm transition-all bg-emerald-600 text-white hover:bg-emerald-700"
                              title="View Blog"
                            >
                              <EyeIcon className="w-3.5 h-3.5" />
                            </Link>
                            <Link
                              href={`/admin/blogboard/edit/${blog._id}`}
                              className="p-2 rounded-md shadow-sm transition-all bg-blue-600 text-white hover:bg-blue-700"
                              title="Edit"
                            >
                              <PencilIcon className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="p-2 rounded-md shadow-sm transition-all bg-red-600 text-white hover:bg-red-700"
                              title="Delete"
                            >
                              <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blogId: null })}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog permanently? This action cannot be undone."
        type="delete"
        confirmText="Delete Blog"
        isLoading={isDeleting}
      />
    </div>
  );
}
