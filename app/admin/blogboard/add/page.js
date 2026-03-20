"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/src/config/axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import EditorInstructions from "@/src/components/admin/EditorInstructions";
import { useDropzone } from "react-dropzone";

export default function AddBlogPage() {
  const api = useApiClient();
  const router = useRouter();
  const contentEditorRef = useRef(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: "",
    author: "CC Matting",
    content: "",
    featured: false,
    readingTime: 5,
    featuredImage: null, // FILE, not string
  });

  const [previewImage, setPreviewImage] = useState(null);

  const createMutation = api.usePost("blogs", "/blogs", {
    onSuccess: () => router.push("/admin/blogboard"),
    onError: (err) =>
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while creating the blog",
      ),
  });

  const loading = createMutation.isPending;

  // Configure react-dropzone
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData((prev) => ({ ...prev, featuredImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  // Sync contentEditable with formData only if content was changed from outside
  useEffect(() => {
    if (contentEditorRef.current) {
      if (contentEditorRef.current.innerHTML !== formData.content) {
        contentEditorRef.current.innerHTML = formData.content || "";
      }
    }
  }, [formData.content]); // Re-run if content changes

  // Set default paragraph separator on mount
  useEffect(() => {
    if (contentEditorRef.current) {
      document.execCommand("defaultParagraphSeparator", false, "p");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // Build multipart FormData
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("excerpt", formData.excerpt);
    payload.append("category", formData.category);
    payload.append("author", formData.author || "CC Matting");
    payload.append("content", formData.content);
    payload.append("featured", formData.featured || false);
    payload.append("readingTime", parseInt(formData.readingTime) || 5);
    payload.append(
      "tags",
      JSON.stringify(tagsArray.length > 0 ? tagsArray : ["general"]),
    );

    // Attach image file if selected
    if (formData.featuredImage instanceof File) {
      payload.append("featuredImage", formData.featuredImage);
    }

    createMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 relative">
      <EditorInstructions />
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8 space-y-2">
          {/* Page title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Add New Blog
              </h1>

              {/* Breadcrumb */}
              <nav className="flex items-center text-[10px] sm:text-xs mt-1 text-gray-500">
                <span
                  onClick={() => router.push("/admin")}
                  className="cursor-pointer hover:text-gray-700"
                >
                  {`▶  Admin`}
                </span>
                <span className="mx-2">/</span>
                <span
                  onClick={() => router.push("/admin/blogboard")}
                  className="cursor-pointer hover:text-gray-700"
                >
                  Blogs
                </span>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Add</span>
              </nav>
            </div>

            {/* Back button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-lg p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 shadow-sm"
        >
          {error && (
            <div className="bg-red-50 text-red-600 p-2.5 sm:p-3 rounded text-xs sm:text-sm mb-3 sm:mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Title */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-2.5 rounded-lg focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                placeholder="Enter a short summary..."
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-2.5 rounded-lg focus:ring-primary focus:border-primary text-sm"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Category */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  name="category"
                  placeholder="e.g. Technology"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 sm:p-2.5 rounded-lg focus:ring-primary focus:border-primary text-sm"
                />
              </div>
              {/* Tags */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  name="tags"
                  placeholder="Comma separated tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 sm:p-2.5 rounded-lg focus:ring-primary focus:border-primary text-sm"
                />
              </div>
              {/* Author */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  name="author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 sm:p-2.5 rounded-lg focus:ring-primary focus:border-primary text-sm"
                />
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Content
              </label>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-1 sm:gap-2 p-1.5 sm:p-2 border border-gray-300 rounded-t-lg bg-gray-50 sticky top-0 z-20">
                {["bold", "italic", "underline"].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand(cmd, false, null);
                    }}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-200 capitalize font-medium"
                    title={cmd}
                  >
                    {cmd === "bold" ? (
                      <strong>B</strong>
                    ) : cmd === "italic" ? (
                      <em>I</em>
                    ) : (
                      <u>U</u>
                    )}
                  </button>
                ))}
                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                {/* Headings & Paragraph */}
                <div className="flex items-center gap-1">
                  {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        document.execCommand("formatBlock", false, tag);
                      }}
                      className="px-1.5 sm:px-2 h-7 sm:h-8 flex items-center justify-center text-[10px] sm:text-xs font-bold border border-transparent rounded hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all text-gray-600 uppercase"
                      title={`Heading ${tag.replace("h", "")}`}
                    >
                      {tag}
                    </button>
                  ))}

                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand("formatBlock", false, "p");
                    }}
                    className="px-1.5 sm:px-2 h-7 sm:h-8 flex items-center justify-center text-[10px] sm:text-xs font-bold border border-transparent rounded hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all text-gray-600 uppercase"
                    title="Paragraph"
                  >
                    P
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand("formatBlock", false, "blockquote");
                    }}
                    className="px-1.5 sm:px-2 h-7 sm:h-8 flex items-center justify-center text-[10px] sm:text-xs font-bold border border-transparent rounded hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all text-gray-600 uppercase"
                    title="Quote"
                  >
                    {'" "'}
                  </button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (contentEditorRef.current) {
                      contentEditorRef.current.focus();
                      document.execCommand("insertUnorderedList", false, null);
                    }
                  }}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-200"
                  title="Bullet List"
                >
                  • List
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (contentEditorRef.current) {
                      contentEditorRef.current.focus();
                      document.execCommand("insertOrderedList", false, null);
                    }
                  }}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-200"
                  title="Ordered List"
                >
                  1. List
                </button>
              </div>

              {/* Content Editable Area */}
              <div
                ref={contentEditorRef}
                contentEditable
                onInput={(e) => {
                  const html = e.target.innerHTML;
                  setFormData((prev) => ({ ...prev, content: html }));
                }}
                className="w-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px] border border-gray-300 rounded-b-lg p-3 sm:p-4 md:p-6 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent prose max-w-none bg-white shadow-inner [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:bg-gray-50 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:pr-5 [&_blockquote]:py-5 [&_blockquote]:rounded-r [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_h1]:text-2xl sm:[&_h1]:text-4xl [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h3]:text-lg sm:[&_h3]:text-xl [&_h4]:text-base sm:[&_h4]:text-lg [&_h5]:text-sm sm:[&_h5]:text-base [&_h5]:font-bold [&_h6]:text-xs sm:[&_h6]:text-sm [&_h6]:font-bold [&_p]:my-3 sm:[&_p]:my-4 [&_p]:leading-relaxed text-sm sm:text-base"
                style={{ whiteSpace: "pre-wrap" }}
                data-placeholder="Start typing your blog content here..."
                suppressContentEditableWarning
              />
              <input
                type="hidden"
                name="content"
                value={formData.content}
                required
              />
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Featured Image
              </label>

              {previewImage && (
                <div className="mb-3 relative w-full h-40 sm:h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData((prev) => ({ ...prev, featuredImage: null }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-red-600 transition-colors shadow-lg"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500">
                    {isDragActive ? (
                      <span className="font-semibold text-primary">
                        Drop the image here
                      </span>
                    ) : (
                      <>
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                    PNG, JPG, GIF, SVG, or WEBP (recommended: 1200x630px)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Mark as Featured
                </span>
              </label>

              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700">
                  Reading Time (min):
                </label>
                <input
                  type="number"
                  name="readingTime"
                  value={formData.readingTime}
                  onChange={handleChange}
                  className="border border-gray-300 p-1.5 w-16 sm:w-20 rounded-md focus:ring-primary focus:border-primary text-xs sm:text-sm"
                  min={1}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px] sm:min-w-[100px]"
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
