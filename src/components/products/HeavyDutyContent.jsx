'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    CheckCircleIcon,
    ShieldCheckIcon,
    DocumentTextIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PaintBrushIcon,
    ArrowPathIcon,
    SwatchIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";

export default function HeavyDutyContent({ product }) {
    const iconMap = {
        CheckBadgeIcon,
        ShieldCheckIcon,
        ClockIcon,
        CheckCircleIcon,
        CurrencyDollarIcon,
        PaintBrushIcon,
        ArrowPathIcon
    };

    const benefits = product.benefits.map(benefit => ({
        ...benefit,
        icon: iconMap[benefit.icon]
    }));

    return (
        <main className="grow">
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[85vh] flex items-center">
                <div className="absolute inset-0 z-20 bg-linear-to-br to-transparent from-black" />
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />

                <div
                    className="absolute left-0 top-0 w-1/3 h-full z-30"
                    style={{
                        background: `linear-gradient(to right, ${product.gradientColors.dark}80, ${product.gradientColors.primary}40, transparent)`
                    }}
                />
                <div
                    className="absolute right-0 top-0 w-1/3 h-full z-30"
                    style={{
                        background: `linear-gradient(to left, ${product.gradientColors.dark}80, ${product.gradientColors.primary}40, transparent)`
                    }}
                />
                <div className="absolute left-1/3 top-0 w-1/3 h-full z-30" />
                <div
                    className="absolute bottom-0 left-0 right-0 h-1/3 z-30"
                    style={{
                        background: `linear-gradient(to top, ${product.gradientColors.dark}60, ${product.gradientColors.primary}30, transparent)`
                    }}
                />

                <div className="relative max-w-7xl z-40 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
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
                            {product.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-base sm:text-lg lg:text-xl text-white mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
                        >
                            {product.description}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                href="/technical"
                                className="inline-flex items-center gap-2 bg-white text-neutral-dark px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group"
                            >
                                <DocumentTextIcon className="w-5 h-5" />
                                <span>TECHNICAL DATA</span>
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Color Options */}
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex lg:gap-8 flex-col lg:flex-row gap-0 justify-center">
                        <div className="grid grid-cols-1 shrink-0 w-full md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                            {product.colorOptions.map((color, index) => (
                                <motion.div
                                    key={color.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300">
                                        <div className="mb-4 relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                            <Image src={color.image} alt={color.name} width={400} height={400} className="w-full h-full object-contain" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark mb-2 text-center">{color.name}</h3>
                                        <p className="text-sm text-neutral-dark/70 text-center">{color.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto text-left"
                        >
                            <div className="text-left mb-8 hidden lg:block">
                                <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                                    <SwatchIcon className="w-3 h-3" />
                                    Variations
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark">Colour Options Available</h2>
                            </div>
                            <p className="text-base text-neutral-dark/70 leading-relaxed">
                                Choose from our two premium color options: Solid Blue for a classic, professional look, or Grey Speck for an elegant, modern finish. Both options maintain the same high-performance standards and durability.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Warranty */}
            <section className="relative bg-linear-to-br from-primary via-blue-800 to-indigo-700 py-12 sm:py-16 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]" aria-hidden />
                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col md:flex-row">
                                <div className="bg-gray-100 p-8 flex items-center justify-center md:w-1/2 h-96">
                                    <Image src={product.warranty.badgeImage} alt="Warranty" width={400} height={400} className="w-full h-96 object-contain" />
                                </div>
                                <div className="p-8 flex flex-col justify-center md:w-1/2">
                                    <h2 className="text-2xl font-bold text-neutral-dark mb-4">{product.warranty.title}</h2>
                                    <span className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4 w-fit">
                                        <ShieldCheckIcon className="w-4 h-4" /> Coverage
                                    </span>
                                    <p className="text-sm text-neutral-dark/70 mb-3">{product.warranty.description}</p>
                                    <p className="text-sm text-neutral-dark/70">{product.warranty.additionalInfo}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-white py-12 sm:py-20">
                <div className="max-w-[1300px] mx-auto px-4">
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Advantages
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold text-neutral-dark mb-3">CC HEAVY DUTY Benefits</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="relative overflow-hidden flex items-center justify-between p-6 border group border-gray-200 rounded-2xl bg-white shadow-sm hover:border-primary/30 transition-all"
                                >
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-1.5">{benefit.title}</h3>
                                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{benefit.description}</p>
                                    </div>
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 translate-x-6 translate-y-2 w-28 h-28 bg-primary/10 rounded-full" />
                                        <div className="relative w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                                            <Icon className="w-6 h-6" aria-hidden="true" />
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
