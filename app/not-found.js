import PublicLayout from "@/src/components/share/PublicLayout";
import Link from "next/link";
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  ShieldCheckIcon, 
  EnvelopeIcon 
} from "@heroicons/react/24/outline";

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
              Page Not Available
            </h2>
            <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
              {"The page you're looking for doesn't exist or is currently unavailable. Please return to the homepage or try again later."}
            </p>
          </div>

          {/* Horizontal List of Links formatted as clean tabs/pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-slate-100">
            <Link 
              href="/" 
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-all duration-200"
            >
              <HomeIcon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <span>Home</span>
            </Link>
            <Link
              href="/industries"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-all duration-200"
            >
              <BuildingOfficeIcon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <span>Industries</span>
            </Link>
            <Link
              href="/compliance"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-all duration-200"
            >
              <ShieldCheckIcon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <span>Compliance</span>
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-all duration-200"
            >
              <EnvelopeIcon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/95 shadow-lg shadow-primary/25 transition duration-200 hover:-translate-y-0.5"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
