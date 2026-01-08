'use client';

import { motion } from "framer-motion";
import {
    BeakerIcon,
    HeartIcon,
    BuildingOfficeIcon,
    BuildingOffice2Icon,
    CpuChipIcon,
    WrenchScrewdriverIcon,
    ServerIcon,
    GlobeAmericasIcon,
    AcademicCapIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function IndustriesListContent({ industriesData }) {
    const industryIconMap = {
        'nursing-homes': HeartIcon,
        'semi-conductor': CpuChipIcon,
        'hospitals': BuildingOffice2Icon,
        'pharmaceutical-industry': BeakerIcon,
        'life-science': GlobeAmericasIcon,
        'schools-public-entrances': AcademicCapIcon,
        'data-centres': ServerIcon,
        'medical-devices': WrenchScrewdriverIcon,
    };

    const industryShortTitles = {
        'nursing-homes': 'Nursing Homes',
        'semi-conductor': 'Semi Conductor',
        'hospitals': 'Hospitals',
        'pharmaceutical-industry': 'Pharmaceutical',
        'life-science': 'Life Science',
        'schools-public-entrances': 'Schools/Public Entrances',
        'data-centres': 'Data Centres',
        'medical-devices': 'Medical Devices',
    };

    const industries = industriesData.map(industry => ({
        ...industry,
        icon: industryIconMap[industry.slug] || BuildingOfficeIcon,
        href: `/industries/${industry.slug}`,
        shortTitle: industryShortTitles[industry.slug] || industry.title.replace('Contamination Control Mats for ', '').replace(' Industry', '')
    }));

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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Our Expertise
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                            Industry <span className="text-primary">Solutions</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                            Our range of contamination control mats are suitable for any organisation or business looking to reduce/eliminate the risk of floor level contaminants entering their critical area.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-[90dvw] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
                        {industries.map((industry, index) => {
                            const Icon = industry.icon || BuildingOfficeIcon;
                            return (
                                <Link
                                    key={industry.id}
                                    href={industry.href}
                                    className="block"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group relative bg-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 overflow-hidden h-full flex flex-col cursor-pointer"
                                    >
                                        <div className="h-48 overflow-hidden relative shrink-0">
                                            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/0 transition-colors duration-300 z-10" />
                                            <Image
                                                src={industry.image}
                                                alt={industry.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        <div className="relative flex-1 flex flex-col p-6 pb-3 pt-8 z-20 min-h-0">
                                            <div className="absolute -top-6 right-6 z-30">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                    <Icon className="w-6 h-6" aria-hidden="true" />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-neutral-dark mb-3 group-hover:text-primary transition-colors">
                                                {industry.shortTitle}
                                            </h3>
                                            <p className="text-sm text-neutral-dark/70 leading-relaxed line-clamp-5 mb-4 grow">
                                                {industry.description}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                                                    <span>View details</span>
                                                    <ArrowRightIcon className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
