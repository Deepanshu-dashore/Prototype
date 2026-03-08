import PublicLayout from "../../src/components/share/PublicLayout";
import TechnicalContent from "../../src/components/technical/TechnicalContent";

export const metadata = {
  title: "Technical Documentation | CC Matting Ireland",
  description:
    "Technical data sheets, comparison guides, warranty info, and cleaning procedures for CC Matting contamination control systems.",
  alternates: {
    canonical: "https://www.ccmatting.ie/technical",
  },
  openGraph: {
    title: "Technical Documentation | CC Matting Ireland",
    description:
      "Technical resources and data sheets for our high-performance contamination control solutions.",
    url: "https://www.ccmatting.ie/technical",
    images: ["/CCMate-Logo.jpg"],
    type: "website",
  },
};

export default function TechnicalPage() {
  return (
    <PublicLayout className="bg-white">
      <TechnicalContent />
    </PublicLayout>
  );
}
