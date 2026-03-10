import PublicLayout from "../../../src/components/share/PublicLayout";
import PortableCleanroomMatsContent from "../../../src/components/products/PortableCleanroomMatsContent";

export const metadata = {
  title: "Portable Cleanroom Mats | Mobile Contamination Control",
  description:
    "CCM Portable Cleanroom/Data Center Mats offer flexible, loose-laid contamination control for raised access floors and modular cleanroom environments.",
  alternates: {
    canonical: "https://www.ccmatting.co.uk/products/portable-cleanroom-mats",
  },
  openGraph: {
    title: "Portable Cleanroom Mats | CC Matting Ireland",
    description:
      "Flexible and mobile contamination control solutions for critical areas. No permanent adhesion required.",
    url: "https://www.ccmatting.co.uk/products/portable-cleanroom-mats",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/CCMate-Logo.jpg",
        width: 1200,
        height: 630,
        alt: "Portable Cleanroom Mats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portable Cleanroom Mats | CC Matting Ireland",
    description: "Flexible and mobile contamination control solutions.",
    images: ["/CCMate-Logo.jpg"],
  },
};

export default function PortableCleanroomMatsPage() {
  return (
    <PublicLayout className="bg-white">
      <PortableCleanroomMatsContent />
    </PublicLayout>
  );
}
