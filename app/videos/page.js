import PublicLayout from "../../src/components/share/PublicLayout";
import VideosContent from "../../src/components/videos/VideosContent";

export const metadata = {
  title: "Informative Videos | Contamination Control in Action | CC Matting",
  description:
    "Watch our informative videos to see CC Matting solutions in action. Learn about installation, maintenance, and the science behind polymeric contamination control.",
  alternates: {
    canonical: "https://ccmatting.com/videos",
  },
  openGraph: {
    title: "Informative Videos | CC Matting",
    description:
      "Learn how our contamination control mats protect critical environments through these informative videos.",
    url: "https://ccmatting.com/videos",
    siteName: "CC Matting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ccmatting.com/assets/videos-hero.jpg", // Placeholder for actual hero image if available
        width: 1200,
        height: 630,
        alt: "CC Matting Informative Videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Informative Videos | CC Matting",
    description:
      "Learn how our contamination control mats protect critical environments.",
    images: ["https://ccmatting.com/assets/videos-hero.jpg"],
  },
};

export default function VideosPage() {
  return (
    <PublicLayout className="bg-white">
      <VideosContent />
    </PublicLayout>
  );
}
