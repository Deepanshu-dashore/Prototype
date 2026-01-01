import PublicLayout from "../../../src/components/share/PublicLayout";
import HeavyDutyContent from "../../../src/components/products/HeavyDutyContent";
import { getProductBySlug } from "../../../src/utils/productsData";
import { notFound } from "next/navigation";

export const metadata = {
  title:
    "Heavy Duty Contamination Control | Industrial Strength Mats | CC Matting",
  description:
    "CCM Heavy Duty mats are designed for high-traffic industrial environments. Superior durability and high-performance contamination control for heavy machinery and forklift areas.",
  alternates: {
    canonical: "https://ccmatting.com/products/heavy-duty",
  },
  openGraph: {
    title: "Heavy Duty Contamination Control | CC Matting",
    description:
      "Industrial strength mats for heavy traffic and machinery areas. High-performance contamination control.",
    url: "https://ccmatting.com/products/heavy-duty",
    siteName: "CC Matting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ccmatting.com/assets/products Page/HeavyDutyHeader.png",
        width: 1200,
        height: 630,
        alt: "Heavy Duty Contamination Control Mats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavy Duty Contamination Control | CC Matting",
    description:
      "Industrial strength mats for heavy traffic and machinery areas.",
    images: ["https://ccmatting.com/assets/products Page/HeavyDutyHeader.png"],
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
