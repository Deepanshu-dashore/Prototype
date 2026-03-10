import PublicLayout from "../../src/components/share/PublicLayout";
import IndustriesListContent from "../../src/components/industries/IndustriesListContent";
import { getIndustriesForServer } from "../../src/utils/industriesData";

export const metadata = {
  title: "Industry Solutions | Contamination Control for Every Sector",
  description:
    "Explore our specialized contamination control solutions for pharmaceutical, semiconductor, medical device, and food industries in Ireland.",
  alternates: {
    canonical: "https://www.ccmatting.co.uk/industries",
  },
  openGraph: {
    title: "Industry Solutions | CC Matting Ireland",
    description:
      "Specialized contamination control and polymeric mats for high-tech, medical, and industrial sectors.",
    url: "https://www.ccmatting.co.uk/industries",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/CCMate-Logo.jpg",
        width: 1200,
        height: 630,
        alt: "CC Matting Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Solutions | CC Matting Ireland",
    description:
      "Specialized contamination control mats for medical and industrial sectors.",
    images: ["/CCMate-Logo.jpg"],
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
