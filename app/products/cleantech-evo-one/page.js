import PublicLayout from "../../../src/components/share/PublicLayout";
import CleanTechProductContent from "../../../src/components/products/CleanTechProductContent";
import { getCleanTechProductBySlug } from "../../../src/utils/cleanTechData";
import { notFound } from "next/navigation";

export const metadata = {
  title: "CleanTech® EVO One | Single Station Freestanding Automated Handwashing System",
  description: "Durable freestanding single station CleanTech® Automated Handwashing Station. Removes more than 99.9% of dangerous pathogens in 12 seconds with wrist-to-forearm cleaning.",
  alternates: {
    canonical: "https://ccmatting.ie/products/cleantech-evo-one",
  },
  openGraph: {
    title: "CleanTech® EVO One | Freestanding Single Station Automated Handwashing",
    description: "Remove 99.9% of dangerous pathogens in 12 seconds with automated freestanding single station handwashing.",
    url: "https://ccmatting.ie/products/cleantech-evo-one",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/assets/products Page/Product img/EVO One/img-1.png",
        width: 1200,
        height: 630,
        alt: "CleanTech® EVO One Freestanding Single Station Handwashing System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanTech® EVO One | Automated Handwashing System",
    description: "Premium automated hand hygiene system with high throughput and low water usage.",
    images: ["/assets/products Page/Product img/EVO One/img-1.png"],
  },
};

export default function EVOOnePage() {
  const product = getCleanTechProductBySlug("cleantech-evo-one");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <CleanTechProductContent product={product} />
    </PublicLayout>
  );
}
