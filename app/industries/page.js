import PublicLayout from "../../src/components/share/PublicLayout";
import IndustriesListContent from "../../src/components/industries/IndustriesListContent";
import { getIndustriesForServer } from "../../src/utils/industriesData";

export const metadata = {
  title:
    "Industry Solutions | Contamination Control for Every Sector | CC Matting",
  description:
    "Explore our specialized contamination control solutions for various industries, including pharmaceutical, semiconductor, healthcare, data centers, and more.",
  alternates: {
    canonical: "https://ccmatting.com/industries",
  },
  openGraph: {
    title: "Industry Solutions | CC Matting",
    description:
      "Specialized contamination control mats for high-tech, medical, and industrial sectors.",
    url: "https://ccmatting.com/industries",
    siteName: "CC Matting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ccmatting.com/assets/industries/hero-bg.jpg", // Fallback or specific hero image
        width: 1200,
        height: 630,
        alt: "CC Matting Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Solutions | CC Matting",
    description:
      "Specialized contamination control mats for high-tech, medical, and industrial sectors.",
    images: ["https://ccmatting.com/assets/industries/hero-bg.jpg"],
  },
};

export default function IndustriesPage() {
  const industriesData = getIndustriesForServer();

  return (
    <PublicLayout className="bg-white">
      <IndustriesListContent industriesData={industriesData} />
    </PublicLayout>
  );
}
