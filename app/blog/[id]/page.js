"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "../../../src/components/share/Header";
import UtilityBar from "../../../src/components/share/UtilityBar";
import Footer from "../../../src/components/share/Footer";
import ContactForm from "../../../src/components/share/ContactForm";
import BlogHero from "../../../src/components/blog/BlogHero";
import TableOfContents from "../../../src/components/blog/TableOfContents";
import BlogContent from "../../../src/components/blog/BlogContent";
import RelatedPosts from "../../../src/components/blog/RelatedPosts";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const blogId = params?.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    } else {
      setLoading(false);
      setError("Invalid blog ID");
    }
  }, [blogId]);

  const fetchBlog = async () => {
    if (!blogId) return;

    try {
      setLoading(true);
      setError("");

      console.log("Fetching blog with ID:", blogId);

      // Try to fetch by ID first
      try {
        const res = await axios.get(
          `/api/blogs/public?id=${encodeURIComponent(blogId)}`
        );
        console.log("API Response:", res.data);

        if (res.data?.success && res.data?.data) {
          setPost(res.data.data);
          return;
        } else {
          // If ID fetch returns but no data, try as slug
          console.log("No data in response, trying slug...");
          throw new Error("Blog not found by ID");
        }
      } catch (idErr) {
        console.log(
          "ID fetch error:",
          idErr.response?.status,
          idErr.response?.data
        );

        // If ID fetch fails (400 invalid format or 404 not found), try as slug
        if (
          idErr.response?.status === 400 ||
          idErr.response?.status === 404 ||
          !idErr.response
        ) {
          try {
            console.log("Trying to fetch by slug:", blogId);
            const slugRes = await axios.get(
              `/api/blogs/public?slug=${encodeURIComponent(blogId)}`
            );
            if (slugRes.data?.success && slugRes.data?.data) {
              setPost(slugRes.data.data);
              return;
            }
          } catch (slugErr) {
            console.log(
              "Slug fetch also failed:",
              slugErr.response?.status,
              slugErr.response?.data
            );
            // Both failed
            throw slugErr;
          }
        }
        throw idErr;
      }
    } catch (err) {
      console.error("Final error fetching blog:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Blog not found";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <UtilityBar />
        <Header onContactClick={() => setIsContactFormOpen(true)} />
        <main className="grow flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state only after loading is complete
  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <UtilityBar />
        <Header onContactClick={() => setIsContactFormOpen(true)} />
        <main className="grow flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Blog Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UtilityBar />
      <Header onContactClick={() => setIsContactFormOpen(true)} />

      <main className="grow">
        {/* Post Hero */}
        <BlogHero post={post} />

        {/* Content Section */}
        <div className="bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Column: TOC - Sticky */}
              <aside className="lg:w-1/4 lg:shrink-0">
                <TableOfContents content={post.content} />
              </aside>

              {/* Middle Column: Post Content */}
              <article className="lg:w-3/4 bg-white rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-neutral-dark/50 mb-8 sm:mb-10 pb-5 border-b border-gray-100">
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="text-neutral-dark/70 font-medium truncate">
                    {post.title}
                  </span>
                </nav>

                <BlogContent content={post.content} />
              </article>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <RelatedPosts currentSlug={post.slug} category={post.category} />
      </main>

      <Footer />
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  );
}
