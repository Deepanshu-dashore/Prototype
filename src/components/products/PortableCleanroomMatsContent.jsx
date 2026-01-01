'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
        "/assets/products Page/clenRoomCarousle images/item1.jpg",
        "/assets/products Page/clenRoomCarousle images/item2.jpg",
        "/assets/products Page/clenRoomCarousle images/item3.jpg",
        "/assets/products Page/clenRoomCarousle images/item4.jpg"
    ];

    const features = [
        {
            title: "Portable & Flexible",
            description: "The main benefit of this system is that the mat can be placed anywhere and moved as per requirements and still provide full contamination control.",
            icon: MapPinIcon
        },
        {
            title: "No Permanent Adhesion",
            description: "The product is also ideal where long term adhesion to the floor is not suitable.",
            icon: ArrowsPointingOutIcon
        },
        {
            title: "Double-Sided Tape Ready",
            description: "The mats feature double-sided tape on the outer edges of the back, ready for use if the customer wants to fix the mat to the floor.",
            icon: WrenchScrewdriverIcon
        },
        {
            title: "Raised Access Floors",
            description: "Ideally suited for raised access floors.",
            icon: CheckBadgeIcon
        },
        {
            title: "Quick Relocation",
            description: "The mats can be moved from location to location in a matter of minutes.",
            icon: ClockIcon
        },
        {
            title: "Future-Proof Design",
            description: "Perfectly suited for install to areas that require full contamination control but may have a change of use in the future.",
            icon: ArrowPathIcon
        },
        {
            title: "Maximum Efficiency",
            description: "The ease of movement ensures the mat is never made redundant – thus ensuring maximum efficiency of use.",
            icon: SparklesIcon
        }
    ];

    return (
        <main className="grow">
            {/* Hero Section */}
            <section className="bg-linear-to-b from-primary/10 via-white to-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-white text-neutral-dark px-4 py-2 rounded-md text-xs font-medium mb-6 border border-gray-200">
                            <ShieldCheckIcon className="w-3.5 h-3.5" />
                            Portable Cleanroom Mats
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                            CCM Portable Cleanroom Mats
                        </h1>
                        <p className="text-lg sm:text-lg text-neutral-dark/70 max-w-4xl mx-auto leading-relaxed">
                            The CCM Portable Cleanroom Mat system has all the benefits of both the Worksafe & Heavy Duty flooring systems, however they are loose laid and not semi-permanently installed. If you are considering tacky mats as a means to help reduce the ingress of particulate into your critical area then you need to look at our environmentally friendly alternative that is also far more cost effective.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Cleanroom Mate Image with Benefits Section */}
            <section className="bg-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                        {/* Left Side - Image (70%) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7"
                        >
                            <div className="relative w-full h-auto">
                                <Image
                                    src="/assets/products Page/CleanRoomMate.png"
                                    alt="CCM Portable Cleanroom Mats"
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto object-contain rounded-lg"
                                />
                            </div>
                        </motion.div>

                        {/* Right Side - Benefits Cards (30%) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-3 space-y-4"
                        >
                            {[
                                {
                                    title: "Anti-microbial",
                                    description: "Silver biocide kills 50+ organisms including MRSA & COVID-19",
                                    icon: BeakerIcon
                                },
                                {
                                    title: "Static dissipative 10⁸ OM",
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
                                        <div className="flex-1 min-w-0 pr-4">
                                            <h3 className="text-base sm:text-base font-semibold text-neutral-900 mb-1.5">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm sm:text-xs text-neutral-700 leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                        <div className="relative shrink-0">
                                            <div className="absolute inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
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
            <section className="bg-gray-100 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-9 gap-6"
                    >
                        {/* Main Image - Left Side (70%) */}
                        <div className="lg:col-span-7">
                            <div className="relative w-full h-96 sm:h-[500px] rounded-xl overflow-hidden bg-white border border-gray-200 shadow-xs">
                                <Image
                                    src={productImages[activeImageIndex]}
                                    alt={`Product image ${activeImageIndex + 1}`}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                        </div>

                        {/* Thumbnail Images - Right Side (30%) */}
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
            </section>

            {/* Polymer Mats Vs Peel Off Mats Video Section */}
            <section className="bg-linear-to-b relative from-primary to-[#000e7b] py-16 sm:py-20">
                <div className="absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.07] mix-blend-multiply" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-white text-primary px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Comparison
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Polymer Mats Vs Peel Off Mats
                        </h2>
                        <p className="text-sm text-white/70 max-w-2xl mx-auto">
                            Discover the advantages of our polymer mats over traditional peel-off mats for superior contamination control.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-900">
                            <video
                                src="https://www.ccmatting.ie/wp-content/uploads/2024/09/STOP-POLLUTING-THE-ATMOSPHERE-SAVE-MONEY-PROTECT-YOUR-CRITICAL-AREA-FROM-CONTAMINATION.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technical Specifications Section */}
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <DocumentTextIcon className="w-3 h-3" />
                            Technical
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
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full flex justify-center"
                    >
                        <div className="max-w-5xl w-full">
                            <Image
                                src="/assets/products Page/TechnicalChart.png"
                                alt="Technical Specifications Chart"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain rounded-lg bg-white p-4"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Features/Benefits Section */}
            <section className="bg-gray-100 py-12 sm:py-16 md:py-20 relative">
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.02]" aria-hidden />
                <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Features
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-3">
                            Key Features/Benefits
                        </h2>
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
                                    className="relative overflow-hidden flex items-center justify-between p-5 sm:p-6 border group border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-1.5">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
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
            <section className="bg-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 flex flex-col"
                        >
                            <div className="relative w-full h-auto flex-1">
                                <Image
                                    src="/assets/products Page/Size1.png"
                                    alt="Size 1 Specifications"
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto object-contain rounded-lg bg-white p-4"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4 flex flex-col"
                        >
                            <div className="relative w-full h-auto flex-1">
                                <Image
                                    src="/assets/products Page/Size2.png"
                                    alt="Size 2 Specifications"
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto object-contain rounded-lg bg-white p-4"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Warranty Card Section */}
            <section className="relative bg-gray-100 py-12 sm:py-16 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.02]" aria-hidden />
                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                    <div className="bg-gray-100 p-6 sm:p-8 flex items-center justify-center">
                                        <div className="relative w-full max-w-xs">
                                            <Image
                                                src="/assets/WarentyBadge.png"
                                                alt="Warranty Badge"
                                                width={600}
                                                height={600}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-6 sm:p-8 flex flex-col justify-center">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-4">
                                            Comprehensive Warranty Coverage
                                        </h2>
                                        <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4 w-fit">
                                            <ShieldCheckIcon className="w-4 h-4" />
                                            Warranty
                                        </div>
                                        <div className="text-neutral-dark/70">
                                            <p className="text-sm sm:text-base leading-relaxed mb-3">
                                                All CCM Portable Cleanroom Mat products come with comprehensive warranty coverage, providing you with complete peace of mind and protection for your investment.
                                            </p>
                                            <p className="text-sm sm:text-base leading-relaxed">
                                                Our warranty ensures that your portable cleanroom mats maintain their high performance standards throughout the warranty period, with full replacement coverage if our product fails to perform as promoted.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
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
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark leading-tight">
                                Ready to protect your critical areas?
                            </h2>
                        </div>
                        <div className="space-y-6">
                            <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                                Contact us today to learn more about CCM Portable Cleanroom Mats and how they can protect your critical areas with superior contamination control.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-primary/80 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-primary transition-all duration-300 group"
                            >
                                <span>Order Now</span>
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
