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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ccmatting.com";
  const url = `${baseUrl}/products/anti-fatigue-mats/${slug}`;

  return {
    title: `${product.title} | Premium Anti-Fatigue Mats | CC Matting`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.title} | CC Matting`,
      description: product.description,
      url: url,
      siteName: "CC Matting",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: product.image.startsWith("http")
            ? product.image
            : `${baseUrl}${product.image}`,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | CC Matting`,
      description: product.description,
      images: [
        product.image.startsWith("http")
          ? product.image
          : `${baseUrl}${product.image}`,
      ],
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
