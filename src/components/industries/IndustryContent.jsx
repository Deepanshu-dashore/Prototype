'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IndustryContent({ industry }) {
    const [relatedIndustries, setRelatedIndustries] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        // Dynamically import industry data for related section to optimize initial load
        const loadRelatedContent = async () => {
            try {
                const { getAllIndustries } = await import("@/src/utils/industriesData");
                const all = getAllIndustries();
                setRelatedIndustries(all.filter(ind => ind.slug !== industry.slug));
            } catch (error) {
                console.error("Error loading related industries:", error);
            }
        };
        loadRelatedContent();
    }, [industry.slug]);

    return (
        <main className="grow">
            {/* Hero Section with Background */}
            <section className="relative overflow-hidden h-[85vh] flex items-center">
                <div className="absolute inset-0 z-20 bg-linear-to-br to-transparent from-black/80" />
                <img src={industry.image} alt={industry.title} className="absolute inset-0 w-full h-full object-cover" />

                <div className="relative max-w-7xl z-30 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-4xl max-w-4xl mx-auto sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
                        >
                            {industry.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-base sm:text-lg lg:text-xl text-white mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
                        >
                            {industry.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                href={industry.ctaLink}
                                className="inline-flex items-center gap-2 bg-white text-neutral-dark px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group"
                            >
                                {industry.ctaText}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Full Description Section */}
            <section className="bg-linear-to-b from-white to-gray-50 py-20 sm:py-20 sm:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="prose prose-lg max-w-none"
                    >
                        <div className="space-y-6 text-sm sm:text-base text-neutral-dark/70 leading-relaxed whitespace-pre-line">
                            {industry.fullDescription.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-6">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>



            {/* Clients Section */}
            {industry.clients && industry.clients.length > 0 && (
                <section className="bg-white border-t border-gray-100 overflow-hidden">
                    {/* Banner + Logo Grid Layout */}
                    <div className="max-w-7xl mx-auto mt-5">
                        <div className="flex flex-col">

                            {/* Left: Colored Banner Panel */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative  bg-linear-to-t from-primary via-indigo-600 to-indigo-800 w-full shrink-0 flex flex-col  justify-center px-8 py-12 lg:py-10 overflow-hidden"
                            >
                                {/* Decorative geometric accent */}
                                <div className="absolute z-10 -right-8 -bottom-8 w-40 h-40 border-20 border-white/10 rotate-12 rounded-sm pointer-events-none" />
                                <div className="absolute z-10 -right-4 -top-4 w-24 h-24 border-12 border-white/10 -rotate-6 rounded-sm pointer-events-none" />
                                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]" aria-hidden />

                                <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded mb-5 w-fit backdrop-blur-sm">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Our Clients
                                </span>

                                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                                    Some of our{" "}
                                    <span className="text-white/90">
                                        {industry.clientsLabel || industry.title
                                            .replace("Contamination Control Mats for ", "")
                                            .replace(" Industry", "")}
                                    </span>{" "}
                                    clients
                                </h2>

                                <p className="text-white/70 text-sm leading-relaxed">
                                    Trusted by leading organisations across the{" "}
                                    {(industry.clientsLabel || industry.title
                                        .replace("Contamination Control Mats for ", "")
                                        .replace(" Industry", "")).toLowerCase()}{" "}
                                    sector to deliver world-class contamination control.
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-white/60 text-xs font-medium">
                                    <div className="w-8 h-px bg-white/40" />
                                    {industry.clients.length} trusted {(industry.clientsLabel || industry.title
                                        .replace("Contamination Control Mats for ", "")
                                        .replace(" Industry", "")).toLowerCase()} Industris clients
                                </div>
                            </motion.div>

                            {/* Right: Logo Grid */}
                            <div className="flex-1 px-6 sm:px-10 py-10 lg:py-12">
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-0 divide-x divide-y divide-gray-100">
                                    {industry.clients.map((client, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.04 }}
                                            className="group flex border border-gray-100 overflow-hidden flex-col items-center justify-center gap-2 px-4 py-6 hover:bg-gray-50 transition-colors duration-200 cursor-default"
                                            title={client.name}
                                        >
                                            <div className="h-10 flex items-center justify-center">
                                                <img
                                                    src={client.logo}
                                                    alt={client.name}
                                                    className="max-h-26 max-w-[120px] grayscale-100 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 w-auto object-contain"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <span className="hidden items-center justify-center text-[10px] font-bold text-neutral-dark/50 group-hover:text-neutral-dark/70 text-center leading-tight px-1">
                                                    {client.name}
                                                </span>
                                            </div>
                                            <span className="text-[12.25px] text-neutral-dark font-medium text-center leading-tight transition-colors duration-200 max-w-32 truncate mt-6">
                                                {client.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {/* Benefits Section */}
            {industry.benefits && industry.benefits.length > 0 && (
                <section className="relative bg-linear-to-br from-primary via-indigo-600 to-indigo-800 py-12 sm:py-16 overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]" aria-hidden />
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="col-span-2"
                            >
                                <span className="inline-flex items-center gap-1.5 bg-linear-to-br from-white via-gray-100 to-gray-200 text-neutral-dark px-3 py-1.5 rounded backdrop:shadow-sm shadow-inner text-xs font-medium mb-4">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Advantages
                                </span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                                    Key Benefits
                                </h2>
                                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                                    Discover the advantages of our contamination control solutions designed specifically for your industry needs.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 col-span-3">
                                {industry.benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-3 h-3 bg-linear-to-br from-amber-500 to-amber-200 border-3 border-white mt-1.5 shrink-0" />
                                        <p className="text-sm sm:text-base text-white leading-relaxed">
                                            {benefit}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-white py-16 sm:py-20 border-t border-gray-100 relative overflow-hidden">
                {/* Animated background accents */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <motion.svg
                        className="absolute top-0 left-0 w-72 h-72 text-primary/15"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>
                    <motion.svg
                        className="absolute bottom-0 right-0 w-80 h-80 text-primary/15"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{ y: [0, -25, 0], opacity: [0.25, 0.45, 0.25] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>
                    <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-primary/15 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Sectors
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-dark mb-4">
                            Explore Other Industries
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedIndustries.map((relatedIndustry, index) => (
                            <motion.div
                                key={relatedIndustry.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredCard(relatedIndustry.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className={`transition-all duration-300 ${hoveredCard && hoveredCard !== relatedIndustry.id ? 'blur-sm opacity-70' : 'blur-0 opacity-100'} ${hoveredCard === relatedIndustry.id ? 'scale-110 md:scale-120 z-20' : 'scale-100 z-10'}`}
                            >
                                <Link href={`/industries/${relatedIndustry.slug}`}>
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                                        <h3 className="text-lg sm:text-xl font-bold text-neutral-dark mb-3 leading-tight">
                                            {relatedIndustry.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-neutral-dark/60 mb-6 leading-relaxed grow line-clamp-3">
                                            {relatedIndustry.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                                            <span>View details</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
