'use client';

import { motion } from "framer-motion";
import {
    ArrowsRightLeftIcon,
    DocumentTextIcon,
    BeakerIcon,
    ShieldCheckIcon,
    BookOpenIcon,
    ArrowDownTrayIcon,
    EyeIcon
} from "@heroicons/react/24/outline";

export default function TechnicalContent() {
    const technicalItems = [
        {
            name: 'CC MATTING V PEEL OFF MATT COMPARISON',
            href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.2-Copy.pdf',
            icon: ArrowsRightLeftIcon,
            description: 'Compare CC Matting with peel-off mats and discover the advantages of our contamination control solutions.',
        },
        {
            name: 'CC HEAVY DUTY TECHNICAL DATA SHEET',
            href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.1-Copy.pdf',
            icon: DocumentTextIcon,
            description: 'Comprehensive technical specifications and data for our heavy-duty contamination control mats.',
        },
        {
            name: 'CC Matting cleaning procedure',
            href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.5-Copy.pdf',
            icon: BeakerIcon,
            description: 'Step-by-step cleaning procedures to maintain optimal performance of your CC Matting products.',
        },
        {
            name: 'CC Matting Warranty',
            href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.3-Copy.pdf',
            icon: ShieldCheckIcon,
            description: 'Complete warranty information and terms for all CC Matting contamination control products.',
        },
        {
            name: 'CC Matting Brochure',
            href: 'https://www.ccmatting.ie/wp-content/uploads/2024/10/CCMatting-2pager-2.pdf',
            icon: BookOpenIcon,
            description: 'Download our comprehensive product brochure with detailed information about all our solutions.',
        },
    ];

    return (
        <main className="grow">
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-primary/10 via-gray-50 to-primary/5 py-20 sm:py-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Resources
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                            Technical <span className="text-primary">Documentation</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                            Access comprehensive technical resources, data sheets, and documentation for all CC Matting products.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Technical Items Grid */}
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {technicalItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative overflow-hidden group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                                >
                                    {/* Background Slide Animation */}
                                    <div className="absolute inset-0 bg-linear-to-br from-primary to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-14 h-14 rounded-xl bg-primary group-hover:bg-white/20 transition-all duration-500 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110">
                                            <Icon className="w-7 h-7 text-white transition-colors duration-500" />
                                        </div>

                                        <h3 className="text-xl font-bold text-neutral-dark mb-3 leading-tight group-hover:text-white transition-colors duration-500">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-neutral-dark/70 mb-8 leading-relaxed grow group-hover:text-white/90 transition-colors duration-500">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center gap-3 pt-6 border-t border-gray-100 group-hover:border-white/20 transition-colors duration-500">
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 group-hover:bg-white/20 hover:bg-primary group-hover:hover:bg-white text-primary group-hover:text-white group-hover:hover:text-primary rounded-xl font-semibold text-sm transition-all duration-300 flex-1 justify-center group/preview"
                                            >
                                                <EyeIcon className="w-4 h-4 group-hover/preview:scale-110 transition-transform" />
                                                <span>Preview</span>
                                            </a>
                                            <a
                                                href={item.href}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 group-hover:bg-white/10 hover:bg-primary group-hover:hover:bg-white text-neutral-dark group-hover:text-white group-hover:hover:text-primary rounded-xl font-semibold text-sm transition-all duration-300 flex-1 justify-center group/download"
                                            >
                                                <ArrowDownTrayIcon className="w-4 h-4 group-hover/download:scale-110 transition-transform" />
                                                <span>Download</span>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
