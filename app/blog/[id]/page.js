import { getBlogByIdOrSlug } from "../../../src/utils/blogUtils";
import { notFound } from "next/navigation";
import BlogLayout from "../../../src/components/blog/BlogLayout";
import BlogHero from "../../../src/components/blog/BlogHero";
import TableOfContents from "../../../src/components/blog/TableOfContents";
import BlogContent from "../../../src/components/blog/BlogContent";
import RelatedPosts from "../../../src/components/blog/RelatedPosts";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlogByIdOrSlug(id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ccmatting.com";

  if (!blog) {
    return {
      title: "Blog Not Found | CC Matting",
    };
  }

  const title = `${blog.title} | CC Matting`;
  const description = blog.excerpt || blog.title;
  const canonicalUrl = `${baseUrl}/blog/${blog.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.author || "CC Matting"],
      tags: blog.tags || [blog.category],
      images: [
        {
          url: blog.featuredImage || `${baseUrl}/BlogIso.png`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage || `${baseUrl}/BlogIso.png`],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const blog = await getBlogByIdOrSlug(id);

  if (!blog) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ccmatting.com";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.featuredImage || `${baseUrl}/BlogIso.png`,
    datePublished: blog.createdAt,
    author: {
      "@type": "Organization",
      name: "CC Matting",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CC Matting",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    description: blog.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${blog.slug}`,
    },
  };

  return (
    <BlogLayout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="grow">
        {/* Post Hero */}
        <BlogHero post={blog} />

        {/* Content Section */}
        <div className="bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Column: TOC - Sticky */}
              <aside className="lg:w-1/4 lg:shrink-0">
                <TableOfContents content={blog.content} />
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
                    {blog.title}
                  </span>
                </nav>

                <BlogContent content={blog.content} />
              </article>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <RelatedPosts currentSlug={blog.slug} category={blog.category} />
      </main>
    </BlogLayout>
  );
}
