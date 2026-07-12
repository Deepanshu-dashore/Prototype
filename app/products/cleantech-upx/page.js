import PublicLayout from "../../../src/components/share/PublicLayout";
import CleanTechProductContent from "../../../src/components/products/CleanTechProductContent";
import { getCleanTechProductBySlug } from "../../../src/utils/cleanTechData";
import { notFound } from "next/navigation";

export const metadata = {
  title: "CleanTech® UPX | UltraPure Hand Hygiene Solution",
  description: "Unique antimicrobial hand hygiene solution for CleanTech® Automated Handwashing Stations. Removes more than 99.9% of harmful pathogens while protecting skin health.",
  alternates: {
    canonical: "https://ccmatting.ie/products/cleantech-upx",
  },
  openGraph: {
    title: "CleanTech® UPX | UltraPure Hand Hygiene Solution",
    description: "Antimicrobial hand hygiene solution that removes 99.9% of dangerous pathogens and moisturizes hands.",
    url: "https://ccmatting.ie/products/cleantech-upx",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/assets/products Page/Product img/UPX/img-1.png",
        width: 1200,
        height: 630,
        alt: "CleanTech® UPX UltraPure Hand Hygiene Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanTech® UPX | Hand Hygiene Solution",
    description: "Premium skin-protecting antimicrobial solution for automated handwashing stations.",
    images: ["/assets/products Page/Product img/UPX/img-1.png"],
  },
};

export default function UPXPage() {
  const product = getCleanTechProductBySlug("cleantech-upx");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <CleanTechProductContent product={product} />
    </PublicLayout>
  );
}
