import PublicLayout from "../../../src/components/share/PublicLayout";
import CleanTechProductContent from "../../../src/components/products/CleanTechProductContent";
import { getCleanTechProductBySlug } from "../../../src/utils/cleanTechData";
import { notFound } from "next/navigation";

export const metadata = {
  title: "CleanTech® EVO Wall | Wall-Mounted Automated Handwashing System",
  description: "Watertight wall-mounted CleanTech® Automated Handwashing Station. Removes more than 99.9% of dangerous pathogens in 12 seconds with wrist-to-forearm cleaning.",
  alternates: {
    canonical: "https://ccmatting.ie/products/cleantech-evo-wall",
  },
  openGraph: {
    title: "CleanTech® EVO Wall | Wall-Mounted Automated Handwashing System",
    description: "Remove 99.9% of dangerous pathogens in 12 seconds with automated wrist-to-forearm handwashing.",
    url: "https://ccmatting.ie/products/cleantech-evo-wall",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/assets/products Page/Product img/EVO Wall/img-1.png",
        width: 1200,
        height: 630,
        alt: "CleanTech® EVO Wall Wall-Mounted Automated Handwashing System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanTech® EVO Wall | Automated Handwashing System",
    description: "Premium automated hand hygiene system with high throughput and low water usage.",
    images: ["/assets/products Page/Product img/EVO Wall/img-1.png"],
  },
};

export default function EVOWallPage() {
  const product = getCleanTechProductBySlug("cleantech-evo-wall");

  if (!product) {
    notFound();
  }

  return (
    <PublicLayout className="bg-white">
      <CleanTechProductContent product={product} />
    </PublicLayout>
  );
}
