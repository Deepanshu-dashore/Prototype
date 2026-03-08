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

  const baseUrl = "https://www.ccmatting.ie";
  const url = `${baseUrl}/industries/${slug}`;

  return {
    title: `${industry.title} | Contamination Control | CC Matting Ireland`,
    description: industry.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${industry.title} | CC Matting Ireland`,
      description: industry.description,
      url: url,
      siteName: "CC Matting",
      locale: "en_IE",
      type: "website",
      images: [
        {
          url: "/CCMate-Logo.jpg",
          width: 1200,
          height: 630,
          alt: industry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} | CC Matting Ireland`,
      description: industry.description,
      images: ["/CCMate-Logo.jpg"],
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
