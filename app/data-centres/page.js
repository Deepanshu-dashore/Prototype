import PublicLayout from "../../src/components/share/PublicLayout";
import DataCenterContent from "../../src/components/datacenter/DataCenterContent";

export const metadata = {
  title: "Data Centers Contamination Control | CC Matting Ireland",
  description:
    "Safeguarding High-Density Compute, ISO Class 5 Air Quality, and Operational Uptime at the Floor Level with CC Matting entrance protection systems.",
  alternates: {
    canonical: "https://ccmatting.ie/data-centres",
  },
  openGraph: {
    title: "Data Centers Contamination Control | CC Matting Ireland",
    description:
      "Floor-level contamination control for high-density compute, server halls, and ISO Class 5 data centers.",
    url: "https://ccmatting.ie/data-centres",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/assets/industries/datacenter_threat_floor_level.png",
        width: 1200,
        height: 630,
        alt: "Data Centers Contamination Control",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Centers Contamination Control | CC Matting Ireland",
    description: "Floor-level contamination control for data centers and critical server halls.",
    images: ["/assets/industries/datacenter_threat_floor_level.png"],
  },
};

export default function DataCentresPage() {
  return (
    <PublicLayout className="bg-white">
      <DataCenterContent />
    </PublicLayout>
  );
}
