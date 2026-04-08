import PublicLayout from "../../src/components/share/PublicLayout";
import ContactHero from "../../src/components/contact/ContactHero";
import ContactFormSection from "../../src/components/contact/ContactFormSection";
import Distibutor from "@/src/components/contact/Distibutor";
import DistributorHero from "@/src/components/contact/DistributorHero";

export const metadata = {
  title: "Distributor - Expert Contamination Control Guidance",
  description:
    "Get in touch with CC Matting for expert contamination control solutions in Ireland. Request a quote or site survey for cleanroom and polymeric matting.",
  alternates: {
    canonical: "https://www.ccmatting.ie/distributor",
  },
  openGraph: {
    title: "Distributor CC Matting | Expert Contamination Control Solutions",
    description:
      "Inquiry about our up to 99.9% effective polymeric mats. Our team is ready to assist you with your cleanroom needs.",
    url: "https://www.ccmatting.ie/distributor",
    images: ["/CCMate-Logo.jpg"],
    type: "website",
  },
};

export default function DistributorPage() {
  return (
    <PublicLayout className="bg-white">
      <main className="grow">
        <DistributorHero />
        <Distibutor />
        <ContactFormSection />
      </main>
    </PublicLayout>
  );
}
