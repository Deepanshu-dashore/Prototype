import { use } from "react";
import PublicLayout from "../../../src/components/share/PublicLayout";
import IndustryContent from "../../../src/components/industries/IndustryContent";
import { getIndustryBySlugForServer } from "../../../src/utils/industriesData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getIndustryBySlugForServer(slug);

  if (!industry) {
    return {
      title: "Industry Not Found | CC Matting",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ccmatting.com";
  const url = `${baseUrl}/industries/${slug}`;

  return {
    title: `${industry.title} | Contamination Control Solutions | CC Matting`,
    description: industry.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${industry.title} | CC Matting`,
      description: industry.description,
      url: url,
      siteName: "CC Matting",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: industry.image.startsWith("http")
            ? industry.image
            : `${baseUrl}${industry.image}`,
          width: 1200,
          height: 630,
          alt: industry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} | CC Matting`,
      description: industry.description,
      images: [
        industry.image.startsWith("http")
          ? industry.image
          : `${baseUrl}${industry.image}`,
      ],
    },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getIndustryBySlugForServer(slug);

  if (!industry) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <IndustryContent industry={industry} />
    </PublicLayout>
  );
}
