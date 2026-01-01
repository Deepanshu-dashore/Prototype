import PublicLayout from "../../src/components/share/PublicLayout";
import FeaturesContent from "../../src/components/features/FeaturesContent";

export const metadata = {
  title: "Features & Benefits | Polymeric Contamination Control Matting",
  description:
    "Explore the technical benefits of CC Matting. 99.9% particle retention, 8+ overstrikes, silver biocide antimicrobial properties, and a 4-5 year lifecycle.",
  alternates: {
    canonical: "https://ccmatting.com/features-benefits",
  },
  openGraph: {
    title: "Features & Benefits | Advanced Contamination Control",
    description:
      "Proven 99.9% particle retention and antimicrobial protection. Discover the technology behind our high-performance polymeric mats.",
    url: "https://ccmatting.com/features-benefits",
    type: "website",
  },
};

export default function FeaturesBenefitsPage() {
  return (
    <PublicLayout className="bg-white">
      <FeaturesContent />
    </PublicLayout>
  );
}
