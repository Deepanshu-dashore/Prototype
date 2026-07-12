import PublicLayout from "../../../src/components/share/PublicLayout";
import HeavyDutyContent from "../../../src/components/products/HeavyDutyContent";
import { getProductBySlug } from "../../../src/utils/productsData";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Heavy Duty Contamination Control Mats | Industrial Strength",
  description:
    "CCM Heavy Duty mats are designed for high-traffic industrial environments. Superior durability and performance for heavy machinery and forklift areas.",
  alternates: {
    canonical: "https://ccmatting.ie/products/heavy-duty",
  },
  openGraph: {
    title: "Heavy Duty Contamination Control | Industrial Strength",
    description:
      "Industrial strength polymeric mats for heavy traffic and forklift areas. High-performance contamination control for factories and warehouses.",
    url: "https://ccmatting.ie/products/heavy-duty",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/CCMate-Logo.jpg",
        width: 1200,
        height: 630,
        alt: "Heavy Duty Contamination Control Mats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavy Duty Contamination Control | CC Matting",
    description: "Industrial strength mats for heavy traffic and machinery.",
    images: ["/CCMate-Logo.jpg"],
  },
};

export default function HeavyDutyPage() {
  const product = getProductBySlug("heavy-duty");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <HeavyDutyContent product={product} />
    </PublicLayout>
  );
}
