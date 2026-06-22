import PublicLayout from "@/src/components/share/PublicLayout";
import Link from "next/link";
import { getAllIndustries } from "@/src/utils/industriesData";
import { products } from "@/src/utils/productsData";
import { cleanTechProducts } from "@/src/utils/cleanTechData";
import { getPublicBlogs } from "@/src/utils/blogUtils";
import {
  HomeIcon,
  SparklesIcon,
  CubeIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  NewspaperIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Site Map | CC Matting Ireland",
  description:
    "Explore all pages and sections of the CC Matting Ireland website for easy navigation and information access.",
  alternates: {
    canonical: "https://www.ccmatting.ie/site-map",
  },
};

export default async function SiteMapPage() {
  const industries = getAllIndustries();
  const { blogs } = await getPublicBlogs({ limit: 100 });

  const sections = [
    {
      title: "Main Navigation",
      icon: HomeIcon,
      links: [
        { name: "Home", href: "/" },
        { name: "Features & Benefits", href: "/features-benefits" },
        { name: "Compliance & Quality Overview", href: "/compliance" },
        { name: "Technical Documentation", href: "/compliance" },
        { name: "Video Gallery", href: "/videos" },
        { name: "Contact & Distribution", href: "/contact" },
        { name: "Biomaster Technology", href: "/biomaster" },
      ],
    },
    {
      title: "Products & Solutions",
      icon: CubeIcon,
      links: [
        { name: "CCM Heavy Duty Mats", href: "/products/heavy-duty" },
        {
          name: "CCM Portable Cleanroom/Data Center Mats",
          href: "/products/portable-cleanroom-mats",
        },
        ...products
          .filter(
            (p) => !["heavy-duty", "portable-cleanroom-mats"].includes(p.slug),
          )
          .map((p) => ({
            name: p.title,
            href: `/products/anti-fatigue-mats/${p.slug}`,
          })),
        ...cleanTechProducts.map((p) => ({
          name: p.title,
          href: `/products/${p.slug}`,
        })),
      ],
    },
    {
      title: "Industries Served",
      icon: BuildingOffice2Icon,
      links: [
        { name: "Industries Overview", href: "/industries" },
        ...industries.map((ind) => ({
          name: ind.title.replace("Contamination Control Mats for ", ""),
          href: `/industries/${ind.slug}`,
        })),
      ],
    },
    {
      title: "Information & Resources",
      icon: NewspaperIcon,
      links: [
        { name: "Latest Insights (Blog)", href: "/blog" },
        ...blogs.slice(0, 8).map((blog) => ({
          name: blog.title,
          href: `/blog/${blog.slug || blog._id}`,
        })),
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
      ],
    },
  ];

  return (
    <PublicLayout className="bg-slate-50">
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1B48] mb-4">
              Site Map
            </h1>
            <p className="text-lg text-[#0B1B48]/60 max-w-2xl mx-auto">
              Easily navigate through our collections, technical resources, and
              industry-specific contamination control solutions.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#0B1B48]/5 rounded-xl text-[#0B1B48]">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0B1B48]">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-[#0B1B48]/70 hover:text-[#0B1B48] transition-colors py-1"
                      >
                        <span className="text-sm font-medium">{link.name}</span>
                        <ChevronRightIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-16 p-8 rounded-3xl bg-linear-to-r from-[#0B1B48] to-[#1E3A8A] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CubeIcon className="w-32 h-32 rotate-12" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Can't find what you are looking for?
            </h3>
            <p className="text-white/80 mb-6">
              Our team is here to help you find the perfect solution for your
              facility.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-[#0B1B48] font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
