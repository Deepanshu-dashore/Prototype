export const metadata = {
  title: "Biomaster™ Antimicrobial Technology | Silver Ion Protection",
  description:
    "CC Matting products incorporate Biomaster™ silver ion technology for permanent antimicrobial protection. Inhibits growth of bacteria, fungi, and mould 24/7.",
  alternates: {
    canonical: "https://ccmatting.ie/biomaster",
  },
  openGraph: {
    title: "Biomaster™ Antimicrobial Technology | CC Matting",
    description:
      "Permanent silver ion protection against bacteria and pathogens. Integrated directly into our polymeric mats.",
    url: "https://ccmatting.ie/biomaster",
    images: ["/CCMate-Logo.jpg"],
    type: "website",
  },
};

export default function BiomasterLayout({ children }) {
  return <>{children}</>;
}
