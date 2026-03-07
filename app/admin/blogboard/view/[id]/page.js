"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  PencilIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function ViewBlogPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/blogs?id=${id}`);
      if (res.data?.success) {
        setBlog(res.data.data);
      } else {
        setError(res.data?.message || "Failed to fetch blog");
      }
    } catch (err) {
      setError(err.message || "Error fetching blog details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 mb-4">
          {error || "Blog not found"}
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md"
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blogs
          </button>

          <Link
            href={`/admin/blogboard/edit/${blog._id}`}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 shadow-sm transition-all text-sm font-medium"
          >
            <PencilIcon className="w-4 h-4" />
            Edit Blog
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-96 bg-gray-100">
            {blog.featuredImage ? (
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
                <span className="text-6xl font-black text-indigo-900/10 select-none">
                  {blog.title?.charAt(0) || "B"}
                </span>
              </div>
            )}

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm border border-gray-100">
                {blog.category?.name || blog.category || "General"}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-10">
            {/* Meta Data */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2">
                {blog.author?.avatar ? (
                  <img
                    src={blog.author.avatar}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                )}
                <span className="font-medium text-gray-900">
                  {blog.author?.name || "CC Matting"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>{blog.readingTime || 5} min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg text-gray-600 leading-relaxed mb-8 italic border-l-4 border-indigo-500 pl-4 bg-gray-50 py-2 pr-2 rounded-r-lg">
                {blog.excerpt}
              </p>
            )}

            {/* Main Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags &&
              (Array.isArray(blog.tags) ? blog.tags.length > 0 : blog.tags) && (
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                    <TagIcon className="w-4 h-4" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(blog.tags)
                      ? blog.tags
                      : blog.tags.split(",")
                    ).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition-colors"
                      >
                        #{typeof tag === "string" ? tag.trim() : tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </article>
      </div>
    </div>
  );
}
