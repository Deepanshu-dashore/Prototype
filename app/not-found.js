import PublicLayout from "@/src/components/share/PublicLayout";
import Link from "next/link";

export default function NotFound() {
  return (
    <PublicLayout className="bg-white">
      <div className="grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-6">
          {/* Large Clean 404 Heading */}
          <div className="space-y-2">
            <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-primary">
              404
            </h1>
            <h2 className="text-2xl font-bold text-slate-800">
              Contamination Detected: Page Not Found
            </h2>
            <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
              You're on the wrong path! Just like foot-borne particles, this
              error has been successfully captured. Let's redirect you back to
              safety.
            </p>
          </div>

          {/* Horizontal List of Links in One Row with Separators */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-lg font-bold text-primary pt-4 border-t border-slate-100">
            <Link href="/" className="hover:text-primary/80 transition-colors">
              Home Page
            </Link>
            <span className="text-slate-300 select-none">|</span>
            <Link
              href="/industries"
              className="hover:text-primary/80 transition-colors"
            >
              Our Industries
            </Link>
            <span className="text-slate-300 select-none">|</span>
            <Link
              href="/compliance"
              className="hover:text-primary/80 transition-colors"
            >
              Compliance & Certs
            </Link>
            <span className="text-slate-300 select-none">|</span>
            <Link
              href="/contact"
              className="hover:text-primary/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/95 shadow-lg shadow-primary/25 transition duration-200 hover:-translate-y-0.5"
            >
              Back to Safety
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
