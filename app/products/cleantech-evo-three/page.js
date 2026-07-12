import PublicLayout from "../../../src/components/share/PublicLayout";
import CleanTechProductContent from "../../../src/components/products/CleanTechProductContent";
import { getCleanTechProductBySlug } from "../../../src/utils/cleanTechData";
import { notFound } from "next/navigation";

export const metadata = {
  title: "CleanTech® EVO Three | Triple Station Freestanding Automated Handwashing System",
  description: "Durable triple station CleanTech® Automated Handwashing System for high-traffic environments. Removes more than 99.9% of pathogens in 12 seconds.",
  alternates: {
    canonical: "https://ccmatting.ie/products/cleantech-evo-three",
  },
  openGraph: {
    title: "CleanTech® EVO Three | Triple Station Freestanding Automated Handwashing System",
    description: "Remove 99.9% of dangerous pathogens in 12 seconds with automated triple station handwashing.",
    url: "https://ccmatting.ie/products/cleantech-evo-three",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/assets/products Page/Product img/EVO Three/img-1.png",
        width: 1200,
        height: 630,
        alt: "CleanTech® EVO Three Triple Station Freestanding Automated Handwashing System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanTech® EVO Three | Triple Station Handwashing System",
    description: "Premium automated hand hygiene system with high throughput and low water usage.",
    images: ["/assets/products Page/Product img/EVO Three/img-1.png"],
  },
};

export default function EVOThreePage() {
  const product = getCleanTechProductBySlug("cleantech-evo-three");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <CleanTechProductContent product={product} />
    </PublicLayout>
  );
}
