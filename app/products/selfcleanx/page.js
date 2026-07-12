import PublicLayout from "../../../src/components/share/PublicLayout";
import CleanTechProductContent from "../../../src/components/products/CleanTechProductContent";
import { getCleanTechProductBySlug } from "../../../src/utils/cleanTechData";
import { notFound } from "next/navigation";

export const metadata = {
  title: "SelfCleanX | Equipment Hygiene Solution",
  description: "Unique equipment hygiene solution used with CleanTech® Automated Handwashing Stations as a hard surface cleaner to eliminate microorganisms and deposits.",
  alternates: {
    canonical: "https://ccmatting.ie/products/selfcleanx",
  },
  openGraph: {
    title: "SelfCleanX | CleanTech® Equipment Hygiene Solution",
    description: "Eliminate microorganisms and hardwater deposits from CleanTech® cylinders and basins automatically.",
    url: "https://ccmatting.ie/products/selfcleanx",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/assets/products Page/Product img/selfclean/img-1.png",
        width: 1200,
        height: 630,
        alt: "SelfCleanX Equipment Hygiene Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SelfCleanX | CleanTech® System Cleaner",
    description: "Concentrated cleaning solution for automatic self-cleaning of handwashing cylinders.",
    images: ["/assets/products Page/Product img/selfclean/img-1.png"],
  },
};

export default function SelfCleanXPage() {
  const product = getCleanTechProductBySlug("selfcleanx");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <CleanTechProductContent product={product} />
    </PublicLayout>
  );
}
