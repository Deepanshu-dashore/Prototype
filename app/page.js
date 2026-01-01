import PublicLayout from "../src/components/share/PublicLayout";
import Hero from "../src/components/home/Hero";
import WhatSetsApartDark from "../src/components/home/WhatSetsApartDark";
import AboutSection from "../src/components/home/AboutSection";
import IndustrySolutions from "../src/components/home/IndustrySolutions";
import CustomersLogos from "../src/components/home/CustomersLogos";
import CaseStudies from "../src/components/home/CaseStudies";
import CTASection from "../src/components/home/CTASection";

export const metadata = {
  title: "CC Matting | Contamination Control & Cleanroom Matting Solutions",
  description:
    "Leading provider of advanced polyermic contamination control matting. Proven 99.9% particle retention for cleanrooms, hospitals, and critical environments. 2-year warranty.",
  alternates: {
    canonical: "https://ccmatting.com",
  },
  openGraph: {
    title: "CC Matting | Advanced Contamination Control Solutions",
    description:
      "Protect your critical environments with 99.9% effective polymeric matting. Optimized for cleanrooms, labs, and healthcare.",
    url: "https://ccmatting.com",
    siteName: "CC Matting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ccmatting.com/BlogIso.png",
        width: 1200,
        height: 630,
        alt: "CC Matting Contamination Control",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CC Matting | Contamination Control Solutions",
    description: "99.9% Particle Retention Matting for Critical Environments.",
    images: ["https://ccmatting.com/BlogIso.png"],
  },
};

export default function Home() {
  return (
    <PublicLayout>
      <main className="grow">
        {/* 1. HERO SECTION */}
        <Hero />

        {/* 2.5. WHAT SETS APART (Dark Section) */}
        <WhatSetsApartDark />

        {/* 3. CLIENT LOGO STRIP */}
        <CustomersLogos />

        {/* 4. MATERIALS / QUALITY SECTION */}
        <AboutSection />

        {/* 7. INDUSTRY SOLUTIONS */}
        <IndustrySolutions />

        {/* 6. TESTIMONIALS */}
        <CaseStudies />

        {/* 9. CTA SECTION */}
        <CTASection />
      </main>
    </PublicLayout>
  );
}
