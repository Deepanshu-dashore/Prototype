import PublicLayout from "../../src/components/share/PublicLayout";
import FeaturesContent from "../../src/components/features/FeaturesContent";

export const metadata = {
  title: "Features & Benefits | Policymeric Contamination Control Matting",
  description:
    "Explore the technical benefits of CC Matting. Up to 99.9% particle retention, 8+ overstrikes, and silver biocide antimicrobial protection.",
  alternates: {
    canonical: "https://www.ccmatting.ie/features-benefits",
  },
  openGraph: {
    title: "Features & Benefits | Advanced Contamination Control",
    description:
      "Proven up to 99.9% particle retention and antimicrobial protection. Discover the technology behind our high-performance polymeric mats.",
    url: "https://www.ccmatting.ie/features-benefits",
    images: ["/CCMate-Logo.jpg"],
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
