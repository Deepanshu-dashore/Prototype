export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: "https://ccmatting.ie/sitemap.xml",
  };
}
