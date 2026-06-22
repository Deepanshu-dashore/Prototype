import { getAllIndustrySlugs } from "@/src/utils/industriesData";
import { getPublicBlogs } from "@/src/utils/blogUtils";
import { products as productData } from "@/src/utils/productsData";
import { cleanTechProducts } from "@/src/utils/cleanTechData";

export default async function sitemap() {
  const baseUrl = "https://www.ccmatting.ie";
  const lastModDefault = new Date("2026-03-08T11:23:50+00:00");

  // Dynamic Industries
  const industrySlugs = getAllIndustrySlugs();
  const industryUrls = industrySlugs.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: lastModDefault,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Blogs
  const { blogs } = await getPublicBlogs({ limit: 1000 });
  const blogUrls = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug || blog._id}`,
    lastModified: new Date(blog.createdAt || lastModDefault),
    changeFrequency: "weekly",
    priority: 0.64,
  }));

  // Dynamic Products (Anti-Fatigue)
  const antiFatigueProducts = productData.filter(
    (p) => !["heavy-duty", "portable-cleanroom-mats"].includes(p.slug),
  );
  const antiFatigueUrls = antiFatigueProducts.map((p) => ({
    url: `${baseUrl}/products/anti-fatigue-mats/${p.slug}`,
    lastModified: lastModDefault,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic CleanTech Products
  const cleanTechUrls = cleanTechProducts.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: lastModDefault,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Static/Public Pages
  const staticRoutes = [
    { url: "", priority: 1.0 },
    { url: "/features-benefits", priority: 0.8 },
    { url: "/compliance", priority: 0.8 },
    { url: "/industries", priority: 0.8 },
    { url: "/blog", priority: 0.8 },
    { url: "/contact", priority: 0.8 },
    { url: "/videos", priority: 0.8 },
    { url: "/compliance", priority: 0.8 },
    { url: "/products/heavy-duty", priority: 0.8 },
    { url: "/products/portable-cleanroom-mats", priority: 0.8 },
    { url: "/biomaster", priority: 0.64 },
    { url: "/privacy-policy", priority: 0.64 },
    { url: "/terms-and-conditions", priority: 0.64 },
    { url: "/distributor/register", priority: 0.64 },
    { url: "/distributor/login", priority: 0.51 },
    { url: "/distributor/forget-password", priority: 0.41 },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: lastModDefault,
    changeFrequency: route.url === "" ? "daily" : "monthly",
    priority: route.priority,
  }));

  // PDF Docs and ISO Certs
  const pdfRoutes = [
    {
      url: "/Ts-Cs-2026.pdf",
      priority: 0.8,
      lastMod: new Date("2026-03-06T15:43:56+00:00"),
    },
    {
      url: "/compliances/doc/CC%20Matting%20-%20ISO%209001-2015%20-%202025%20-%202026.pdf",
      priority: 0.64,
      lastMod: new Date("2026-03-06T15:43:57+00:00"),
    },
    {
      url: "/compliances/doc/ISO%2045001-2018%20SEP%2025.pdf",
      priority: 0.64,
      lastMod: new Date("2026-03-06T15:43:57+00:00"),
    },
    {
      url: "/compliances/doc/CCM%20STATIC%20DISSIPATIVE%20TEST%20RESULTS%202026.pdf",
      priority: 0.64,
      lastMod: new Date("2026-03-06T15:43:57+00:00"),
    },
    {
      url: "/compliances/doc/CCM%20MSDS.pdf",
      priority: 0.64,
      lastMod: new Date("2026-03-06T15:43:57+00:00"),
    },
    {
      url: "/compliances/doc/CCM%20ISO%2045001%20cert.pdf",
      priority: 0.64,
      lastMod: new Date("2026-03-06T15:43:57+00:00"),
    },
    {
      url: "/compliances/doc/CCM%20NPI%20BROCH%20IE%202026.pdf",
      priority: 0.64,
      lastMod: new Date("2026-03-10T12:00:00+00:00"),
    },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastMod,
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  return [
    ...staticRoutes,
    ...industryUrls,
    ...antiFatigueUrls,
    ...cleanTechUrls,
    ...blogUrls,
    ...pdfRoutes,
  ];
}
