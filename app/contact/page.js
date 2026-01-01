import PublicLayout from "../../src/components/share/PublicLayout";
import ContactHero from "../../src/components/contact/ContactHero";
import ContactFormSection from "../../src/components/contact/ContactFormSection";

export const metadata = {
  title: "Contact Us | CC Matting | Contamination Control Support",
  description:
    "Get in touch with CC Matting for expert contamination control solutions. Request a quote for cleanroom mats, anti-fatigue flooring, and industry-specific protection.",
  alternates: {
    canonical: "https://ccmatting.com/contact",
  },
  openGraph: {
    title: "Contact CC Matting | Expert Contamination Control Solutions",
    description:
      "Inquiry about our 99.9% effective contamination control mats. Our team is ready to assist you with your cleanroom needs.",
    url: "https://ccmatting.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <PublicLayout className="bg-white">
      <main className="grow">
        <ContactHero />
        <ContactFormSection />
      </main>
    </PublicLayout>
  );
}
