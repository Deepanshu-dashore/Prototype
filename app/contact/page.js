import PublicLayout from "../../src/components/share/PublicLayout";
import ContactHero from "../../src/components/contact/ContactHero";
import ContactFormSection from "../../src/components/contact/ContactFormSection";
import Distibutor from "@/src/components/contact/Distibutor";

export const metadata = {
  title: "Contact Us - Expert Contamination Control Guidance",
  description:
    "Get in touch with CC Matting for expert contamination control solutions in Ireland. Request a quote or site survey for cleanroom and polymeric matting.",
  alternates: {
    canonical: "https://www.ccmatting.co.uk/contact",
  },
  openGraph: {
    title: "Contact CC Matting | Expert Contamination Control Solutions",
    description:
      "Inquiry about our up to 99.9% effective polymeric mats. Our team is ready to assist you with your cleanroom needs.",
    url: "https://www.ccmatting.co.uk/contact",
    images: ["/CCMate-Logo.jpg"],
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <PublicLayout className="bg-white">
      <main className="grow">
        <ContactHero />
        {/* <Distibutor /> */}
        <ContactFormSection />

        {/* Product Page Type CTA Section */}
        <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-dark font-medium">
                    GET IN TOUCH
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-neutral-dark leading-tight">
                  Ready to Start Your Project?
                </h2>
              </div>
              <div className="space-y-8">
                <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                  Our specialist team is ready to assist you with technical
                  guidance, product selection, or a free site survey.
                </p>

                {/* Email and Phone Boxes */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Email Us</span>
                    <a href="mailto:info@ccmatting.ie" className="text-lg font-bold text-neutral-dark hover:text-primary transition-colors">
                      info@ccmatting.ie
                    </a>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Call Us</span>
                    <a href="tel:+353214701669" className="text-lg font-bold text-neutral-dark hover:text-primary transition-colors">
                      021 4701669
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
