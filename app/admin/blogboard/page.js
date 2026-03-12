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
import {
  TableEmptyState,
  TableLoadingSkeleton,
} from "@/src/components/ui/TableState";
import AdminHeader from "@/src/components/admin/AdminHeader";

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

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  useEffect(() => {
    fetchBlogs(pagination.currentPage);
  }, [pagination.currentPage]);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (sortOrder) params.append("sort", sortOrder);
      params.append("page", page);
      params.append("limit", pagination.limit);

      const res = await axios.get(`/api/blogs?${params.toString()}`);
      if (res.data?.success) {
        const data = res.data.data;
        setBlogs(data.blogs || []);
        setStats({
          totalBlogs: data.totalBlogs || 0,
          todayCount: data.todayBlogCount || 0,
          categoryCount: data.totalCategories?.length || 0,
        });
        setPagination((prev) => ({
          ...prev,
          totalPages: data.totalPages,
          totalItems: data.totalBlogs,
          currentPage: data.currentPage,
        }));
      } else {
        setError(res.data?.message || "Failed to fetch blogs");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    if (pagination.currentPage === 1) {
      fetchBlogs(1);
    } else {
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
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
        fetchBlogs(pagination.currentPage);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <AdminHeader
            title="Blog Management"
            subtitle="Manage, edit, and publish your content."
            buttonText="Add Blog"
            buttonLink="/admin/blogboard/add"
          />
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white relative overflow-hidden p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Blogs</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalBlogs}
                </h3>
              </div>
              <div className="w-24 h-24 absolute -right-6 rounded-2xl rotate-45 shadow-xl bg-blue-700/60 flex items-center justify-center text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mt-2 mr-2 text-blue-100 -rotate-45"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17.5 14.75a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5m-4.25 2.75a4.25 4.25 0 1 1 8.5 0a4.25 4.25 0 0 1-8.5 0m6.093-1.405a.75.75 0 0 1 0 1.06l-2.28 2.28l-1.406-1.405a.75.75 0 1 1 1.06-1.06l.346.344l1.22-1.22a.75.75 0 0 1 1.06 0"
                    opacity={0.5}
                  ></path>
                  <path
                    fill="currentColor"
                    d="M6 2.25A2.75 2.75 0 0 0 3.25 5v14.382a1.75 1.75 0 0 0 2.533 1.565l1-.5a.25.25 0 0 1 .261.024l.906.679a1.75 1.75 0 0 0 2.1 0l.862-.647a.25.25 0 0 1 .279-.014l.673.404a.75.75 0 1 0 .772-1.286l-.674-.404a1.75 1.75 0 0 0-1.95.1l-.862.647a.25.25 0 0 1-.3 0l-.906-.68a1.75 1.75 0 0 0-1.832-.164l-1 .5a.25.25 0 0 1-.362-.224V5c0-.69.56-1.25 1.25-1.25h10c.69 0 1.25.56 1.25 1.25v5.5a.75.75 0 0 0 1.5 0V5A2.75 2.75 0 0 0 16 2.25z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M7 6.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm0 3a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 3a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5zm0 3a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z"
                  ></path>
                </svg>
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
              <div className="w-24 h-24 absolute -right-6 rounded-2xl rotate-45 shadow-xl bg-emerald-700/60 flex items-center justify-center text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mt-2 mr-2 text-emerald-100 -rotate-45"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="currentColor"
                    d="M32.25 6H29v2h3v22H4V8h3V6H3.75A1.78 1.78 0 0 0 2 7.81v22.38A1.78 1.78 0 0 0 3.75 32h28.5A1.78 1.78 0 0 0 34 30.19V7.81A1.78 1.78 0 0 0 32.25 6"
                    className="clr-i-outline clr-i-outline-path-1"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M8 14h2v2H8z"
                    className="clr-i-outline clr-i-outline-path-2"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M14 14h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-3"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M20 14h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-4"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M26 14h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-5"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M8 19h2v2H8z"
                    className="clr-i-outline clr-i-outline-path-6"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M14 19h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-7"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M20 19h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-8"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M26 19h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-9"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M8 24h2v2H8z"
                    className="clr-i-outline clr-i-outline-path-10"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M14 24h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-11"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M20 24h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-12"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M26 24h2v2h-2z"
                    className="clr-i-outline clr-i-outline-path-13"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M10 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1"
                    className="clr-i-outline clr-i-outline-path-14"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M26 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1"
                    className="clr-i-outline clr-i-outline-path-15"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M13 6h10v2H13z"
                    className="clr-i-outline clr-i-outline-path-16"
                    strokeWidth={1}
                    stroke="currentColor"
                  ></path>
                  <path fill="none" d="M0 0h36v36H0z"></path>
                </svg>
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
              <div className="w-24 h-24 absolute -right-6 rounded-2xl rotate-45 shadow-xl bg-indigo-500/60 flex items-center justify-center text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mt-2 mr-2 text-indigo-100 -rotate-45"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      d="M10.5 14H17M7 14h.5M7 10.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"
                    ></path>
                    <path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path>
                    <path
                      strokeLinecap="round"
                      d="M21 16c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877S3.014 6.825 3.002 9"
                    ></path>
                  </g>
                </svg>
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
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
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
                onClick={handleApplyFilters}
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <tbody>
                  <TableLoadingSkeleton rows={5} columns={5} />
                </tbody>
              </table>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 border border-red-100 text-center">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody>
                  <TableEmptyState
                    colSpan={5}
                    title="No Blogs Found"
                    message="We couldn't find any blog posts. Try adjusting your filters or search terms."
                  />
                </tbody>
              </table>
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
                      <thead className="bg-gray-100/80 border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                            Title
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                            Category
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                            Author
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                            Date
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right text-nowrap">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {blogs.map((blog, index) => (
                          <tr
                            key={blog._id}
                            className={`hover:bg-gray-50/60 transition-colors group ${index % 2 !== 0 ? "bg-slate-50" : "bg-white"}`}
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
                            <td className="px-6 py-4 text-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/50">
                                {blog.category?.name ||
                                  blog.category ||
                                  "Uncategorized"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-nowrap">
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
                            <td className="px-6 py-4 text-nowrap">
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

        {/* Pagination Controls */}
        {!loading && blogs.length > 0 && (
          <div className="mt-8 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 hidden sm:block">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {(pagination.currentPage - 1) * pagination.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-900">
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.totalItems,
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900">
                {pagination.totalItems}
              </span>{" "}
              results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.max(1, prev.currentPage - 1),
                  }))
                }
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.totalPages ||
                    (pageNum >= pagination.currentPage - 1 &&
                      pageNum <= pagination.currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() =>
                          setPagination((prev) => ({
                            ...prev,
                            currentPage: pageNum,
                          }))
                        }
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          pagination.currentPage === pageNum
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    (pageNum === pagination.currentPage - 2 && pageNum > 1) ||
                    (pageNum === pagination.currentPage + 2 &&
                      pageNum < pagination.totalPages)
                  ) {
                    return (
                      <span key={pageNum} className="px-1 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.min(
                      prev.totalPages,
                      prev.currentPage + 1,
                    ),
                  }))
                }
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
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
