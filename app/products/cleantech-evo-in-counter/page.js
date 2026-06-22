import PublicLayout from "../../../src/components/share/PublicLayout";
import CleanTechProductContent from "../../../src/components/products/CleanTechProductContent";
import { getCleanTechProductBySlug } from "../../../src/utils/cleanTechData";
import { notFound } from "next/navigation";

export const metadata = {
  title: "CleanTech® EVO In-Counter | In-Counter Automated Handwashing System",
  description: "Durable single station CleanTech® Automated Handwashing System designed to install into any counter surface. Removes more than 99.9% of pathogens in 12 seconds.",
  alternates: {
    canonical: "https://www.ccmatting.ie/products/cleantech-evo-in-counter",
  },
  openGraph: {
    title: "CleanTech® EVO In-Counter | In-Counter Automated Handwashing System",
    description: "Remove 99.9% of dangerous pathogens in 12 seconds with automated in-counter handwashing.",
    url: "https://www.ccmatting.ie/products/cleantech-evo-in-counter",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/assets/products Page/Product img/EVO In-Counter/img-1.png",
        width: 1200,
        height: 630,
        alt: "CleanTech® EVO In-Counter Automated Handwashing System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanTech® EVO In-Counter | Automated Handwashing System",
    description: "Premium automated hand hygiene system with high throughput and low water usage.",
    images: ["/assets/products Page/Product img/EVO In-Counter/img-1.png"],
  },
};

export default function EVOInCounterPage() {
  const product = getCleanTechProductBySlug("cleantech-evo-in-counter");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <CleanTechProductContent product={product} />
    </PublicLayout>
  );
}
