import PublicLayout from "../../src/components/share/PublicLayout";
import VideosContent from "../../src/components/videos/VideosContent";

export const metadata = {
  title: "Informative Videos | CC Matting Ireland",
  description:
    "See CC Matting solutions in action. Learn about installation, maintenance, and the science behind polymeric contamination control.",
  alternates: {
    canonical: "https://ccmatting.ie/videos",
  },
  openGraph: {
    title: "Informative Videos | CC Matting Ireland",
    description:
      "Watch how our polymeric contamination control mats protect critical environments.",
    url: "https://ccmatting.ie/videos",
    siteName: "CC Matting",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/CCMate-Logo.jpg",
        width: 1200,
        height: 630,
        alt: "CC Matting Informative Videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Informative Videos | CC Matting Ireland",
    description: "Contamination control mats in action.",
    images: ["/CCMate-Logo.jpg"],
  },
};

export default function VideosPage() {
  return (
    <PublicLayout className="bg-white">
      <VideosContent />
    </PublicLayout>
  );
}
