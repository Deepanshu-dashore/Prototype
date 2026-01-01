import PublicLayout from "../../../src/components/share/PublicLayout";
import PortableCleanroomMatsContent from "../../../src/components/products/PortableCleanroomMatsContent";

export const metadata = {
  title: "Portable Cleanroom Mats | Mobile Contamination Control | CC Matting",
  description:
    "CCM Portable Cleanroom Mats offer flexible, loose-laid contamination control. Ideal for raised access floors and areas requiring modular cleanroom solutions.",
  alternates: {
    canonical: "https://ccmatting.com/products/portable-cleanroom-mats",
  },
  openGraph: {
    title: "Portable Cleanroom Mats | CC Matting",
    description:
      "Flexible and mobile contamination control solutions for critical areas. No permanent adhesion required.",
    url: "https://ccmatting.com/products/portable-cleanroom-mats",
    siteName: "CC Matting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ccmatting.com/assets/products Page/CleanRoomMate.png",
        width: 1200,
        height: 630,
        alt: "Portable Cleanroom Mats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portable Cleanroom Mats | CC Matting",
    description:
      "Flexible and mobile contamination control solutions for critical areas.",
    images: ["https://ccmatting.com/assets/products Page/CleanRoomMate.png"],
  },
};

export default function PortableCleanroomMatsPage() {
  return (
    <PublicLayout className="bg-white">
      <PortableCleanroomMatsContent />
    </PublicLayout>
  );
}
