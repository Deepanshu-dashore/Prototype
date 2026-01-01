import { getPublicBlogs } from "../../src/utils/blogUtils";
import BlogLayout from "../../src/components/blog/BlogLayout";
import BlogListHero from "../../src/components/blog/BlogListHero";
import BlogGrid from "../../src/components/blog/BlogGrid";

export async function generateMetadata({ searchParams }) {
  const { category, search } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ccmatting.com";

  let title = "Blogs | CC Matting";
  let description =
    "Latest articles, tutorials, and insights on contamination control and cleanroom technology.";

  if (category && category !== "All") {
    title = `${category} - Cleanroom Insights | CC Matting`;
    description = `Explore our latest articles and insights regarding ${category} in contamination control.`;
  } else if (search) {
    title = `Search results for "${search}" | CC Matting`;
  }

  const canonical =
    category && category !== "All"
      ? `${baseUrl}/blog?category=${encodeURIComponent(category)}`
      : `${baseUrl}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: canonical,
    },
    // Prevent search results from being indexed, but allow categories
    robots: search
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "CC Matting",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/BlogIso.png`,
          width: 1200,
          height: 630,
          alt: "CC Matting Blogs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/BlogIso.png`],
    },
  };
}

export default async function BlogPage({ searchParams }) {
  const { category, search, sort } = await searchParams;

  // Fetch initial data on the server using URL parameters
  const { blogs, categories } = await getPublicBlogs({
    category,
    search,
    sort,
  });

  return (
    <BlogLayout>
      <main className="grow">
        <BlogListHero />
        <BlogGrid
          initialBlogs={blogs}
          initialCategories={categories}
          currentCategory={category || "All"}
          currentSearch={search || ""}
        />
      </main>
    </BlogLayout>
  );
}
