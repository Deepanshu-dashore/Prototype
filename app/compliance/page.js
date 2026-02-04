import PublicLayout from "../../src/components/share/PublicLayout";
import ComplianceContent from "../../src/components/compliance/ComplianceContent";

export const metadata = {
  title: "Compliance & Quality | CC Matting | Industry Standards",
  description:
    "Access CC Matting compliance documentation, ISO certifications, REACH compliance, and technical efficacy data for our contamination control solutions.",
  alternates: {
    canonical: "https://ccmatting.com/compliance",
  },
  openGraph: {
    title: "Compliance & Quality | CC Matting",
    description:
      "Our commitment to quality and compliance. View our ISO certifications and technical efficacy reports.",
    url: "https://ccmatting.com/compliance",
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
