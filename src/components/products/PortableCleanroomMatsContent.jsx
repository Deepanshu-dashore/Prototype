'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImageZoom from "@/src/components/ui/ImageZoom";
import ComparisonTable from "./ComparisonTable";
import SpecificationsTable from "./SpecificationsTable";
import {
    ShieldCheckIcon,
    DocumentTextIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    ArrowPathIcon,
    SparklesIcon,
    ArrowsPointingOutIcon,
    MapPinIcon,
    ClockIcon,
    WrenchScrewdriverIcon,
    BeakerIcon,
    BoltIcon
} from "@heroicons/react/24/outline";

export default function PortableCleanroomMatsContent() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const productImages = [
        "/assets/products%20Page/carosul1.png",
        "/assets/products%20Page/carosul2.png",
        "/assets/products%20Page/carosul3.png",
        "/assets/products%20Page/carosul4.png"
    ];

    const features = [
        {
            title: "Portable & Flexible Placement",
            description: "Enables placement in multiple locations and can be repositioned as operational requirements change, while maintaining effective contamination control.",
            icon: MapPinIcon
        },
        {
            title: "Non-Permanent Installation",
            description: "Ideal for environments where long-term or permanent adhesion to the floor surface is not suitable or permitted.",
            icon: ArrowsPointingOutIcon
        },
        {
            title: "Optional Fixing Method",
            description: "Supplied with double-sided adhesive tape along the outer rear edges, allowing optional floor fixing when required.",
            icon: WrenchScrewdriverIcon
        },
        {
            title: "Raised Floor Compatible",
            description: "Specifically suited for use on raised access flooring systems commonly found in cleanroom and controlled environments.",
            icon: CheckBadgeIcon
        },
        {
            title: "Rapid Repositioning",
            description: "Can be relocated between areas within minutes, supporting dynamic workflows and evolving process layouts.",
            icon: ClockIcon
        },
        {
            title: "Future-Proof Design",
            description: "Well suited for critical areas requiring full contamination control, even where future changes in room use or layout are anticipated.",
            icon: ArrowPathIcon
        },
        {
            title: "Maximised Utilisation",
            description: "The ability to relocate the mat ensures it remains in active use, preventing redundancy and maximising operational efficiency.",
            icon: SparklesIcon
        }
    ];

    return (
        <main className="grow">
            {/* Hero Section */}
            <section className="relative bg-linear-to-b from-primary/10 via-white to-white border-b border-gray-100 overflow-hidden">
                {/* Animated geometric circles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -top-32 left-10 w-72 h-72 rounded-full bg-blue-200/30"
                        animate={{
                            y: [0, 30, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <motion.div
                        className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-blue-200/20"
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 15, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.div
                        className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-indigo-200/20"
                        animate={{
                            y: [0, -25, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.div
                        className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-indigo-200/20"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-white text-neutral-dark px-4 py-2 rounded-md text-xs font-medium mb-6 border border-gray-200">
                            <ShieldCheckIcon className="w-3.5 h-3.5" />
                            Portablity
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                            CCM Portable Cleanroom Mats
                        </h1>
                        <p className="text-lg sm:text-lg text-neutral-dark/70 max-w-4xl mx-auto leading-relaxed">
                            Designed for facilities that need serious contamination control without permanent installation, our Portable Cleanroom Mats deliver the same performance as our Heavy Duty flooring — but loose laid, flexible, and faster to deploy. For customers considering tacky mats, this is a cleaner, greener, and far more cost-effective alternative that dramatically reduces particulate ingress into critical areas
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Cleanroom Mate Image with Benefits Section */}
            <section className=" py-12 sm:py-16 relative">
                <div className="pointer-events-none absolute bg-linear-to-t from-white to-blue-600/40 animate-[pulse_2s_infinite] inset-0 bg-repeat opacity-[0.05]" aria-hidden />
                <div className="max-w-[90dvw] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 items-center">
                        {/* Left Side - Image (70%) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-5"
                        >
                            <div className="relative w-full h-auto">
                                <ImageZoom src="/assets/products Page/clenRoomCarousle images/home.jpg" alt="CCM Portable Cleanroom Mats">
                                    <Image
                                        src="/assets/products%20Page/CleanRoomMate.png"
                                        alt="CCM Portable Cleanroom Mats"
                                        width={1100}
                                        height={500}
                                        className="w-full h-[410px] object-contain object-center rounded-lg bg-white"
                                    />
                                </ImageZoom>
                            </div>
                        </motion.div>

                        {/* Right Side - Benefits Cards (30%) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-5 grid grid-cols-2 gap-5"
                        >
                            {[
                                {
                                    title: "Anti-microbial",
                                    description: "Incorporates Anti-Microbial technology that inhibits the growth of bacteria, fungi, mould, and other microorganisms",
                                    icon: BeakerIcon
                                },
                                {
                                    title: "Static dissipative",
                                    description: "Prevents electrostatic discharge in sensitive environments",
                                    icon: BoltIcon
                                },
                                {
                                    title: "Portable",
                                    description: "Loose laid system that can be moved as per requirements",
                                    icon: MapPinIcon
                                },
                                {
                                    title: "Removes up to 99% of floor level contamination",
                                    description: "Proven effectiveness in removing particulates and bacteria",
                                    icon: CheckBadgeIcon
                                }
                            ].map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="relative overflow-hidden flex items-center justify-between p-5 sm:p-6 border group border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                                    >
                                        <div className="flex-1 min-w-0 pr-4 group-hover:z-50">
                                            <h3 className="text-base sm:text-lg font-semibold transition-colors group-hover:text-white text-neutral-900 mb-1.5">
                                                {benefit.title === "Static dissipative" ? (
                                                    <>
                                                        Static dissipative 10<sup>10</sup> ohm
                                                    </>
                                                ) : (
                                                    benefit.title
                                                )}
                                            </h3>

                                            <p className="text-sm sm:text-sm transition-colors group-hover:text-white/80 text-neutral-700 leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                        <div className="relative shrink-0">
                                            <div className="absolute group-hover:-left-1/2 group-hover:z-0 group-hover:-top-1/2 group-hover:scale-500 group-hover:-translate-x-1/2 transition-all group-hover:bg-linear-to-br to-primary from-indigo-500 duration-600 group-hover:-translate-y-3 inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl group-hover:bg-white group-hover:text-indigo-700 bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-all duration-300">
                                                <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Image Carousel Section */}
            {/* <section className="bg-gray-100 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-9 gap-6"
                    >
                        Main Image - Left Side (70%)
                        <div className="lg:col-span-7">
                            <div className="relative w-full h-96 sm:h-[500px] rounded-xl overflow-hidden bg-white border border-gray-200 shadow-xs">
                                <ImageZoom src={productImages[activeImageIndex]} alt={`Product image ${activeImageIndex + 1}`}>
                                    <Image
                                        src={productImages[activeImageIndex]}
                                        alt={`Product image ${activeImageIndex + 1}`}
                                        fill
                                        className="object-cover p-4"
                                    />
                                </ImageZoom>
                            </div>
                        </div>

                        Thumbnail Images - Right Side (30%)
                        <div className="lg:col-span-1 flex flex-col gap-3">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === index
                                        ? 'border-primary shadow-lg scale-105'
                                        : 'border-gray-200 hover:border-primary/50'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section> */}

            {/* Technical Specifications Section */}
            <section className="bg-white py-16 sm:py-20 relative">
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.02]" aria-hidden />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <DocumentTextIcon className="w-3 h-3" />
                            Specs
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                            Technical Specifications
                        </h2>
                        <p className="text-sm text-neutral-dark/70 max-w-3xl mx-auto">
                            Comprehensive technical data and specifications for CCM Portable Cleanroom Mats.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-5xl mx-auto"
                    >
                        <ComparisonTable />
                    </motion.div>


                </div>
            </section>

            {/* Why and Where to Use Cleanroom Mats Section */}
            {/* Why and Where Section */}
            <section className="bg-linear-to-b relative from-primary to-[#000e7b] py-16 sm:py-20">
                <div className="absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.07] mix-blend-multiply" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-white text-primary px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Use Cases & Applications
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Why and Where to Use Portable Cleanroom Mats
                        </h2>
                        <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
                            Understanding the ideal scenarios and environments where portable cleanroom mats deliver maximum value and contamination control effectiveness.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Why Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <CheckBadgeIcon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white">Why Choose Portable Mats</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Operational Flexibility",
                                        description: "Adapt to changing facility layouts and process requirements without permanent floor modifications"
                                    },
                                    {
                                        title: "Cost-Effective Alternative",
                                        description: "Eliminate recurring costs of disposable tacky mats while maintaining superior contamination control"
                                    },
                                    {
                                        title: "No Floor Damage",
                                        description: "Protect floor surfaces in leased facilities or areas where permanent adhesion is prohibited"
                                    },
                                    {
                                        title: "Rapid Deployment",
                                        description: "Install and relocate within minutes to respond to urgent contamination control needs"
                                    },
                                    {
                                        title: "Sustainable Solution",
                                        description: "100% recyclable with 3-5 year lifespan, drastically reducing waste compared to disposable alternatives"
                                    },
                                    {
                                        title: "Multi-Location Use",
                                        description: "Maximize ROI by moving mats between areas based on operational priorities and schedules"
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                                        className="flex gap-3 group"
                                    >
                                        <div className="shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm sm:text-base mb-1">{item.title}</h4>
                                            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Where Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <MapPinIcon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white">Where to Deploy</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Temporary Cleanroom Areas",
                                        description: "Project-based or seasonal critical zones requiring contamination control for limited durations"
                                    },
                                    {
                                        title: "Raised Access Floors",
                                        description: "Data centers, laboratories, and facilities with raised flooring systems where permanent adhesion is impractical"
                                    },
                                    {
                                        title: "Leased Facilities",
                                        description: "Rental or temporary spaces where floor modifications are restricted by lease agreements"
                                    },
                                    {
                                        title: "Multi-Shift Operations",
                                        description: "Facilities with varying contamination control needs across different production shifts or schedules"
                                    },
                                    {
                                        title: "R&D and Pilot Areas",
                                        description: "Research facilities and pilot production zones with frequently changing layouts and equipment"
                                    },
                                    {
                                        title: "Emergency Response",
                                        description: "Rapid deployment for contamination incidents, audits, or temporary critical area expansions"
                                    },
                                    {
                                        title: "Pharmaceutical Manufacturing",
                                        description: "Clean corridors, airlocks, and transition zones between different classification areas"
                                    },
                                    {
                                        title: "Electronics Assembly",
                                        description: "ESD-sensitive areas requiring both contamination control and static dissipation"
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                                        className="flex gap-3 group"
                                    >
                                        <div className="shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm sm:text-base mb-1">{item.title}</h4>
                                            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                                    <DocumentTextIcon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-white text-sm sm:text-base font-medium">
                                    Not sure if portable mats are right for your facility?
                                </p>
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all duration-300 group whitespace-nowrap"
                            >
                                <span>Contact Our Experts</span>
                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Features/Benefits Section */}
            <section className="bg-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
                {/* Animated floating circles */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <motion.svg
                        className="absolute top-0 left-0 w-96 h-96 text-primary/20"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{
                            y: [0, 30, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>

                    <motion.svg
                        className="absolute bottom-0 right-0 w-96 h-96 text-primary/20"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>

                    {/* Middle floating circle */}
                    <motion.svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 text-primary/15"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.15, 0.3, 0.15]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>
                </div>

                {/* Animated dots/particles */}
                <div className="absolute border-t border-primary/10 shadow-lg inset-0 pointer-events-none overflow-hidden">
                    {[...Array(55)].map((_, i) => (
                        <motion.div
                            key={`dot-${i}`}
                            className="absolute w-2 h-2 bg-primary/50 rounded-full shadow-sm"
                            animate={{
                                y: [0, -50, 0],
                                x: [0, (i % 5) * 12 - 30, 0],
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 5 + i * 0.4,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: `${(i * 7) % 100}%`,
                                top: `${(i * 13) % 100}%`
                            }}
                        />
                    ))}
                </div>

                {/* Abstract flowing lines */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/10 to-transparent"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute top-3/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-primary/10 to-transparent"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Diagonal flowing lines */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-5"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(83, 96, 255, 0.1) 35px, rgba(83, 96, 255, 0.1) 70px)",
                        backgroundSize: "200% 200%"
                    }}
                />

                {/* Pulsing corner accents */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Floating Background Icons */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
                </div>
                <div className="max-w-325 mx-auto px-4 sm:px-6 md:px-8 lg:px-2 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Functional Advantages
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-3">
                            Key Features/Benefits
                        </h2>
                        <p className="text-sm text-neutral-dark/60 max-w-2xl mx-auto">
                            Our portable cleanroom mats offer unmatched flexibility and superior contamination control for dynamic critical environments.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="relative overflow-hidden flex items-center justify-between p-5 sm:p-6 border group border-gray-200 rounded-2xl bg-white shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className="flex-1 min-w-0 pr-4 group-hover:z-50">
                                        <h3 className="text-lg sm:text-xl font-semibold transition-colors group-hover:text-white text-neutral-900 mb-1.5">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm transition-colors group-hover:text-white/80 text-neutral-700 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="relative shrink-0">
                                        <div className="absolute group-hover:-left-1/2 group-hover:z-0 group-hover:-top-1/2 group-hover:scale-500 group-hover:-translate-x-1/2 transition-all group-hover:bg-linear-to-br to-primary from-indigo-500 duration-600 group-hover:-translate-y-3 inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl group-hover:bg-white group-hover:text-indigo-700 bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-all duration-300">
                                            <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Size Images Section */}
            <section className="bg-linear-to-b from-primary to-[#000e7b] py-4 sm:py-6 sm:pb-24 relative">
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]" aria-hidden />

                <div className="max-w-325 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-2">

                    {/* Specifications Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-6xl mx-auto mt-16"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                Product Specifications
                            </h3>
                            <p className="text-sm text-white/70">
                                Available sizes and configurations for our portable cleanroom mats
                            </p>
                        </div>
                        <SpecificationsTable />
                    </motion.div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="bg-white py-16 sm:py-20">
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
                                <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-dark font-medium">
                                    ORDER NOW
                                </span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-neutral-dark leading-tight">
                                Get a Custom Quote for Your Facility
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm flex items-center gap-3 bg-linear-to-bl from-accent/60 via-accent/75 to-accent rounded-md px-5 py-1 w-fit sm:text-base text-white leading-relaxed">
                                <span className="w-3 h-3 inline-block rounded-full bg-white" >
                                </span>
                                If you want an alternative size, call us directly for custom sizing.
                            </p>
                            <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                                Get a free, no-obligation quote tailored to your specific contamination control requirements. Our experts will help you determine the optimal mat configuration and sizing for your facility.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-primary/90 transition-all duration-300 group"
                                >
                                    <span>Request a Quote</span>
                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main >
    );
}
