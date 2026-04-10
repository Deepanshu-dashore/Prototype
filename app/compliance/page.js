import PublicLayout from "../../src/components/share/PublicLayout";
import ComplianceContent from "../../src/components/compliance/ComplianceContent";

export const metadata = {
  title: "Compliance & Quality - Industry Standards & Certifications",
  description:
    "Access CC Matting compliance documentation, ISO certifications, REACH compliance, and technical efficacy data for our contamination control solutions.",
  alternates: {
    canonical: "https://www.ccmatting.co.uk/compliance",
  },
  openGraph: {
    title: "Compliance & Quality | CC Matting UK",
    description:
      "Our commitment to quality and compliance. View our ISO certifications and technical efficacy reports.",
    url: "https://www.ccmatting.co.uk/compliance",
    images: ["/CCMate-Logo.jpg"],
    type: "website",
  },
};

export default function CompliancePage() {
  return (
    <PublicLayout className="bg-white">
      <ComplianceContent />
    </PublicLayout>
  );
}
