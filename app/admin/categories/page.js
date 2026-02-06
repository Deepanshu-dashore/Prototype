"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  FolderIcon,
  DocumentTextIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories(pagination.currentPage);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [pagination.currentPage, searchQuery]);

  const fetchCategories = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination.limit);
      if (searchQuery) params.append("search", searchQuery);

      const res = await axios.get(`/api/blogs/category?${params.toString()}`);
      if (res.data?.success && res.data?.data?.categoriesWithCounts) {
        setCategories(res.data.data.categoriesWithCounts);
        setPagination((prev) => ({
          ...prev,
          totalPages: res.data.data.totalPages,
          totalItems: res.data.data.totalCategories,
          currentPage: res.data.data.currentPage,
        }));
      } else {
        setError(res.data?.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (pagination.currentPage !== 1) {
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Blog Categories
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and view all blog categories with post counts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
              <FolderIcon className="w-5 h-5 text-indigo-600" />
              <div className="flex items-center gap-2">
                <p className="text-xs text-indigo-600 font-medium">
                  Total Categories
                </p>
                <p className="text-base font-bold bg-indigo-900 text-white rounded px-2">
                  {loading ? (
                    <span className="inline-block w-8 h-5 bg-indigo-200 rounded animate-pulse"></span>
                  ) : (
                    categories.length
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 border border-red-100 text-center">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm border-dashed">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                <FolderIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                {searchQuery ? "No categories found" : "No categories yet"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery
                  ? "Try adjusting your search query."
                  : "Categories will appear here once blogs are created."}
              </p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Category Name
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Blog Count
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Latest Post
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {categories.map((category, index) => (
                        <motion.tr
                          key={category.name}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50/60 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                <FolderIcon className="w-5 h-5 text-indigo-600" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {category.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 font-medium">
                                {category.count}
                              </span>
                              <span className="text-xs text-gray-400">
                                {category.count === 1 ? "post" : "posts"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                              {formatDate(category.latestBlog)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/admin/blogboard?category=${encodeURIComponent(
                                category.name,
                              )}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-all"
                            >
                              View Posts
                              <ArrowRightIcon className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Pagination Controls */}
              <div className="mt-8 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
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
                        (pageNum === pagination.currentPage - 2 &&
                          pageNum > 1) ||
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
                          pagination.totalPages,
                          pagination.currentPage + 1,
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
