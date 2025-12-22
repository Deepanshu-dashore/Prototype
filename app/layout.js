import "./globals.css";

export const metadata = {
  title: "CC Matting - Contamination Control Solutions",
  favicon: "/src/favicon.png",
  description: "Leading provider of contamination control solutions for cleanroom environments worldwide. High-quality matting solutions designed to capture 99.9% of particulates.",
  keywords: "cleanroom mats, contamination control, anti-fatigue mats, cleanroom solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
