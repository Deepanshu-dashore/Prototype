import { use } from "react";
import PublicLayout from "../../../../src/components/share/PublicLayout";
import ProductContent from "../../../../src/components/products/ProductContent";
import { getProductBySlug } from "../../../../src/utils/productsData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | CC Matting",
    };
  }

  const baseUrl = "https://www.ccmatting.ie";
  const url = `${baseUrl}/products/anti-fatigue-mats/${slug}`;

  return {
    title: `${product.title} | Premium Anti-Fatigue Mats Ireland`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.title} | CC Matting Ireland`,
      description: product.description,
      url: url,
      siteName: "CC Matting",
      locale: "en_IE",
      type: "website",
      images: [
        {
          url: "/CCMate-Logo.jpg",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | CC Matting Ireland`,
      description: product.description,
      images: ["/CCMate-Logo.jpg"],
    },
  };
}

export default async function AntiFatigueMatsPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug || "classic-ergonomic-mat");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <ProductContent product={product} slug={slug} />
    </PublicLayout>
  );
}
