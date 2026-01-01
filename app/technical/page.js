import PublicLayout from "../../src/components/share/PublicLayout";
import TechnicalContent from "../../src/components/technical/TechnicalContent";

export const metadata = {
  title: "Technical Documentation | CC Matting | Data Sheets & Brochures",
  description:
    "Access CC Matting technical data sheets, comparison guides, warranty information, and cleaning procedures. Download our comprehensive product brochure.",
  alternates: {
    canonical: "https://ccmatting.com/technical",
  },
  openGraph: {
    title: "Technical Documentation | CC Matting",
    description:
      "In-depth technical resources for our contamination control solutions. Data sheets, brochures, and maintenance guides.",
    url: "https://ccmatting.com/technical",
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
