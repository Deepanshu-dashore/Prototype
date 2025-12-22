"use client";

import { useState, use } from "react";
import Header from "../../../src/components/share/Header";
import UtilityBar from "../../../src/components/share/UtilityBar";
import Footer from "../../../src/components/share/Footer";
import ContactForm from "../../../src/components/share/ContactForm";
import BlogHero from "../../../src/components/blog/BlogHero";
import TableOfContents from "../../../src/components/blog/TableOfContents";
import BlogContent from "../../../src/components/blog/BlogContent";
import RelatedPosts from "../../../src/components/blog/RelatedPosts";
import { getBlogBySlug } from "../../../src/utils/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function BlogPostPage({ params }) {
  const unwrappedParams = use(params);
  const post = getBlogBySlug(unwrappedParams.slug);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  if (!post) {
    notFound();
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
              <aside className="lg:w-1/4 lg:flex-shrink-0">
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
