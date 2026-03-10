'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    DocumentTextIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    CheckBadgeIcon,
    BeakerIcon,
    GlobeAmericasIcon,
    BoltIcon,
    ChartBarIcon,
    ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import LogoLoop from "../home/LogoLoop";

export default function ComplianceContent() {
    const [hoveredDoc, setHoveredDoc] = useState(null);

    const complianceDocs = [
        { name: "ISO 9001", description: "Quality Management System Certification", icon: CheckBadgeIcon, image: "/compliances/CardImage/ISO9001.png", href: "/compliances/doc/CC Matting - ISO 9001-2015 - 2025 - 2026.pdf" },
        { name: "ISO 45001", description: "Occupational Health and Safety Management", icon: ShieldCheckIcon, image: "/compliances/CardImage/ISO45001.png", href: "/compliances/doc/ISO 45001-2018 SEP 25.pdf" },
        { name: "Anti-Microbial Efficacy - A", description: "In-depth efficacy testing results - Report A", icon: BeakerIcon, image: "/compliances/CardImage/Anti-Microbial Efficacy - A.png", href: "#" },
        { name: "Anti-Microbial Efficacy - B", description: "In-depth efficacy testing results - Report B", icon: BeakerIcon, image: "/compliances/CardImage/Anti-Microbial Efficacy - B.png", href: "#" },
        { name: "BPR/EPA", description: "Biocidal Products Regulation compliance data", icon: GlobeAmericasIcon, image: "/compliances/CardImage/EPA.png", href: "#" },
        { name: "Static Dissipative Testing", description: "ESD performance and resistance testing", icon: BoltIcon, image: "/compliances/CardImage/StaticDissipativeTesting.png", href: "/compliances/doc/CCM STATIC DISSIPATIVE TEST RESULTS 2026.pdf" },
        { name: "CCMatting Efficacy Data", description: "Internal performance and validation data", icon: ChartBarIcon, image: "/compliances/CardImage/CCMatting Efficacy Data.png", href: "#" },
        { name: "SDS Safety Data Sheet", description: "Safety data and material specifications", icon: ExclamationCircleIcon, image: "/compliances/CardImage/SDS Safety Data Sheet.png", href: "/compliances/doc/CCM MSDS.pdf" },
        { name: "CCM NPI Brochure 2026", description: "New Product Introduction Brochure 2026", icon: DocumentTextIcon, image: "/compliances/CardImage/CCMatting Efficacy Data.png", href: "/compliances/doc/CCM NPI BROCH IE 2026.pdf" }
    ];

    const logos = [
        { src: "/compliances/ce-mark.webp", alt: "CE Marking" },
        { src: "/new-iso-1.png", alt: "ISO 9001" },
        { src: "/new-iso-2.png", alt: "ISO 14001" },
        { src: "/compliances/reach.webp", alt: "REACH Compliance" }
    ];

    return (
        <main className="grow">
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-primary/10 via-gray-50 to-primary/5 py-20 sm:py-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

                    {/* Animated geometric circles */}
                    <motion.div
                        className="absolute -top-32 left-10 w-72 h-72 rounded-full bg-blue-200/30"
                        animate={{
                            y: [0, 30, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.div
                        className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-blue-200/20"
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 15, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-6xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <ShieldCheckIcon className="w-3.5 h-3.5" />
                            Compliance
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                            Quality & <span className="text-primary">Compliance</span>
                        </h1>
                        <p className="text-lg sm:text-2xl text-neutral-dark/70 max-w-6xl mx-auto leading-relaxed">
                            CC Matting is committed to the highest standards of quality, safety, and environmental responsibility.
                        </p>
                        <p className="text-lg sm:text-xl text-neutral-dark/70 mt-4 max-w-6xl mx-auto leading-relaxed">
                            Our manufacturing processes are continuously audited to meet strict in-house quality standards.
                            All critical materials are <strong>rigorously tested</strong> to ensure consistent performance in demanding environments.<br />
                            We comply with national and international standards, including <strong>CE, REACH,</strong> and <strong>BPR/EPA regulations.</strong>
                            <br />Our supply chain is strictly monitored to ensure SVHC substances are absent or within safe limits.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Logos Section */}
            <section className="py-20 bg-linear-to-b from-primary to-indigo-600 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/circle-pattern.svg')] bg-repeat opacity-6 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-22 transition-all duration-500">
                        {logos.map((logo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative w-32 h-20 sm:w-44 sm:h-26 bg-white border-4 border-gray-300 rounded-lg"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    className="object-contain p-2.5"
                                    sizes="160px"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance Documents Section */}
            <section className="bg-gray-50 py-16 sm:py-24">
                <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-sm text-xs font-bold mb-4 uppercase tracking-wider">
                            <DocumentTextIcon className="w-3.5 h-3.5" />
                            Resources
                        </span>
                        <h2 className="text-4xl font-bold text-neutral-dark mb-4">Compliance Documents</h2>
                        <p className="text-neutral-dark/60 max-w-2xl mx-auto text-lg">
                            Access our full suite of compliance certificates and efficacy data sheets.
                        </p>
                    </div>
                    <div className="h-[60dvh] relative">
                        <LogoLoop
                            showCard={false}
                            gap={20}
                            // scaleOnHover
                            hoverSpeed={1.5}
                            duration={10}
                            logos={
                                complianceDocs.map((doc, index) => {
                                    return {
                                        node: <motion.div
                                            key={doc.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            onMouseEnter={() => setHoveredDoc(index)}
                                            onMouseLeave={() => setHoveredDoc(null)}
                                            className="group relative bg-white border border-gray-200 mt-auto rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                                        >
                                            {/* Document Image Preview */}
                                            <div className="relative w-full h-60 bg-gray-50 overflow-hidden">
                                                <Image
                                                    src={doc.image}
                                                    alt={doc.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {/* Icon Overlay */}
                                                <div className={`absolute top-3 right-3 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:bg-primary group-hover:text-white transition-colors duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-primary'}`}>
                                                    <doc.icon className="w-5 h-5" />
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className={`p-6 flex relative flex-col flex-1 ${index % 2 === 0 ? 'bg-linear-to-b from-primary to-indigo-600' : ' shadow-xl'}`}>

                                                <div className={`absolute top-0 left-0 w-full h-full bg-[url('/circle-pattern.svg')] bg-repeat ${index % 2 === 0 ? 'opacity-3' : 'opacity-2.5'} pointer-events-none`} />

                                                <h3 className={`font-bold text-lg text-neutral-dark mb-2 ${index % 2 === 0 ? 'text-white' : 'group-hover:text-primary'} transition-colors duration-300`}>{doc.name}</h3>
                                                <p className={`text-sm text-neutral-dark/60 mb-3 grow ${index % 2 === 0 ? 'text-white' : 'group-hover:text-primary'} transition-colors duration-300`}>{doc.description}</p>

                                                <div className={`flex gap-3 relative z-10 pt-4 border-t ${index % 2 === 0 ? 'border-white/30' : 'border-gray-50'} transition-colors duration-300`}>
                                                    {/* <button className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-neutral-dark transition-colors ${index % 2 === 0 ? 'text-white bg-gray-100/30' : 'group-hover:text-primary hover:text-primary bg-gray-200'} transition-colors duration-300 rounded-xl`}>
                                                        <EyeIcon className="w-4 h-4" /> Preview
                                                    </button>
                                                    <button className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-colors ${index % 2 === 0 ? 'text-primary bg-white' : 'hover:bg-primary/90 bg-primary text-white'} transition-colors duration-300`}>
                                                        <ArrowDownTrayIcon className="w-4 h-4" /> Download
                                                    </button> */}
                                                    <a
                                                        href={doc.href}
                                                        target={doc.href !== '#' ? "_blank" : "_self"}
                                                        rel="noopener noreferrer"
                                                        className={`flex items-center text-xs font-semibold transition-colors mt-2 hover:underline underline-offset-4
                                                        ${index % 2 === 0 ? 'text-white/80 hover:text-white' : 'text-primary/80 hover:text-primary'}`}
                                                    >
                                                        Learn More
                                                        <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                        , src: false
                                    }
                                })
                            } />
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                                <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-dark/95 font-medium">
                                    SAMPLES
                                </span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark/95 leading-tight">
                                See our products in person
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                                Floor-Level Contamination Control
                            </p>
                            <p className="text-lg text-neutral-dark/60 leading-relaxed pb-4">
                                Contact us today to request a sample and experience the quality and performance of CC Matting firsthand.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-primary/80 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-primary transition-all duration-300 group"
                            >
                                <span>REQUEST A SAMPLE</span>
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section> */}
        </main>
    );
}
//  {/* Narrative Sections */}
//             <section className="py-16 sm:py-24 bg-white relative">
//                 {/* <div className="pointer-events-none absolute z-0 bg-linear-to-t from-white to-blue-600/40 animate-[pulse_3s_infinite] inset-0 bg-repeat opacity-[0.05]" aria-hidden /> */}
//                 <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                     {/* First Narrative */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.6 }}
//                         >
//                             <h2 className="text-3xl font-bold text-neutral-dark mb-6">Manufacturing Quality Control</h2>
//                             <p className="text-lg text-neutral-dark/70 leading-relaxed mb-6">
//                                 Our manufacturing processes are continuously monitored with both internal and external audits to ensure that our products meet our in-house quality standards and tolerances. CC Matting has developed an Integrated Management System (IMS) that meets the requirements of BS EN ISO 9001:2015 and BS EN ISO 14001:2015.
//                             </p>
//                             <p className="text-lg text-neutral-dark/70 leading-relaxed">
//                                 All critical materials are rigorously tested prior to production to ensure full compliance and consistent performance in the most demanding environments.
//                             </p>
//                         </motion.div>
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             whileInView={{ opacity: 1, scale: 1 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.6 }}
//                             className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-gray-100"
//                         >
//                             <Image
//                                 src="/compliances/matureMItur1stImage.jpg"
//                                 alt="Quality Control Testing"
//                                 fill
//                                 className="object-cover p-10 bg-white"
//                                 sizes="(max-width: 1024px) 100vw, 50vw"
//                             />
//                         </motion.div>
//                     </div>

//                     {/* Second Narrative */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             whileInView={{ opacity: 1, scale: 1 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.6 }}
//                             className="order-2 lg:order-1 relative aspect-4/3 overflow-hidden shadow-sm border border-gray-100"
//                         >
//                             <Image
//                                 src="/compliances/tastTube2nd.jpg"
//                                 alt="Laboratory Compliance Testing"
//                                 fill
//                                 className="object-cover p-10"
//                                 sizes="(max-width: 1024px) 100vw, 50vw"
//                             />
//                         </motion.div>
//                         <motion.div
//                             initial={{ opacity: 0, x: 20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.6 }}
//                             className="order-1 lg:order-2"
//                         >
//                             <h2 className="text-3xl font-bold text-neutral-dark mb-6">International Standards & Legislation</h2>
//                             <p className="text-lg text-neutral-dark/70 leading-relaxed mb-6">
//                                 Our manufacturing processes are continuously audited to meet strict in-house quality standards.
//                                 All critical materials are rigorously tested to ensure consistent performance in demanding environments.
//                                 We comply with national and international standards, including CE, REACH, and BPR/EPA regulations.
//                                 Our supply chain is strictly monitored to ensure SVHC substances are absent or within safe limits.
//                             </p>
//                             {/* <p className="text-lg text-neutral-dark/70 leading-relaxed">
//                                 We strictly monitor our supply chain to ensure any chemicals on the REACH Substances of Very High Concern (SVHC) are not present or are below acceptable levels in our products.
//                             </p> */}
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>