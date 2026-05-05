import { ContactFormProvider } from "../src/components/share/ContactFormContext";
import "./globals.css";
import Script from "next/script";


export const metadata = {
  metadataBase: new URL("https://www.ccmatting.co.uk"),
  title: {
    default: "CC Matting - Contamination Control Solutions Ireland",
    template: "%s | CC Matting",
  },
  description:
    "Ireland's leading provider of high-performance polymeric contamination control matting. Capture up to 99.9% of particles for cleanrooms, pharma, and medical facilities.",
  keywords: [
    "cleanroom mats",
    "contamination control",
    "polymeric matting",
    "Ireland",
    "antimicrobial mats",
    "static dissipative mats",
    "pharmaceutical solutions",
    "medical device cleanroom",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.ccmatting.co.uk",
    siteName: "CC Matting",
    title: "CC Matting - Contamination Control Solutions",
    description:
      "Advanced polymeric matting solutions proven to capture up to 99.9% of foot and wheel-borne particulates.",
    images: [
      {
        url: "/CCMate-Logo.jpg",
        width: 1200,
        height: 630,
        alt: "CC Matting Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CC Matting - Contamination Control Solutions",
    description:
      "Up to 99.9% Particle Retention Matting for Critical Environments.",
    images: ["/CCMate-Logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { Toaster } from "react-hot-toast";
import TanstackProvider from "../src/providers/TanstackProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PSGVCTF40C"
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-PSGVCTF40C');
            `}
        </Script>

        <TanstackProvider>
          <ContactFormProvider>{children}</ContactFormProvider>
          <Toaster position="top-right" />
        </TanstackProvider>
      </body>
    </html>
  );
}
