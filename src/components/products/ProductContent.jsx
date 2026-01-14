'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImageZoom from "@/src/components/ui/ImageZoom";
import {
    ShieldCheckIcon,
    DocumentTextIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    SparklesIcon,
    HeartIcon,
    ExclamationTriangleIcon,
    BoltIcon,
    CheckCircleIcon,
    ScissorsIcon,
    XMarkIcon,
    ClipboardDocumentCheckIcon,
    ArrowsRightLeftIcon,
    ListBulletIcon,
    WrenchScrewdriverIcon,
    SwatchIcon
} from "@heroicons/react/24/outline";

const iconMap = {
    HeartIcon,
    ExclamationTriangleIcon,
    BoltIcon,
    CheckCircleIcon,
    ScissorsIcon,
    XMarkIcon,
    ClipboardDocumentCheckIcon,
    CheckBadgeIcon,
    ShieldCheckIcon
};

export default function ProductContent({ product, slug }) {
    const benefits = product.benefits?.map(benefit => ({
        ...benefit,
        icon: iconMap[benefit.icon] || CheckBadgeIcon
    })) || [];

    const getImageFolder = () => {
        if (slug === "classic-ergonomic-mat") return "Classic Ergonomic Mat";
        if (slug === "infinity-ergonomic-mat") return "CC Infinity Ergonomic Mat";
        if (slug === "complete-ergonomic-mat") return "Complete Ergonomic Mat";
        return "Classic Ergonomic Mat";
    };

    const imageFolder = getImageFolder();
    const benefitImages = product.benefitImages || [1, 2, 3, 4];

    return (
        <main className="grow">
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[85vh] flex items-center">
                <div className="absolute inset-0 z-20 bg-linear-to-br to-transparent from-black/60" />
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />

                <div
                    className="absolute left-0 top-0 w-1 /3 h-full z-30"
                    style={{ background: `linear-gradient(to right,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4), transparent)` }}
                />
                <div
                    className="absolute right-0 top-0 w-1/3 h-full z-30"
                    style={{ background: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4), transparent)` }}
                />
                <div className="absolute left-1/3 top-0 w-1/3 h-full z-30" />
                <div
                    className="absolute bottom-0 left-0 right-0 h-1/3 z-30"
                    style={{ background: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3), transparent)` }}
                />

                <div className="relative max-w-7xl z-40 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl max-w-4xl mx-auto sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg"
                    >
                        {product.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base sm:text-lg lg:text-xl mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
                    >
                        {product.description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/technical"
                            className="inline-flex items-center gap-2 bg-white text-neutral-dark px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md group"
                        >
                            <DocumentTextIcon className="w-5 h-5" />
                            <span>Technical Documentation</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-neutral-dark px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md group"
                        >
                            <span>Get a Quote</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Color/Profile Options */}
            {product.colorOptions && product.colorOptions.length > 0 && (
                <section className="bg-white py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex lg:gap-8 flex-col lg:flex-row gap-0 justify-center">
                            <div className={`grid grid-cols-1 shrink-0 w-full ${product.colorOptions.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8 max-w-4xl mx-auto mb-12`}>
                                {product.colorOptions.map((option, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300">
                                            <div className="mb-4 relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                                <ImageZoom src={option.image} alt={option.name}>
                                                    <Image src={option.image} alt={option.name} width={400} height={400} className="w-full h-full object-contain" />
                                                </ImageZoom>
                                            </div>
                                            <h3 className="text-xl font-bold text-neutral-dark mb-2 text-center">{option.name}</h3>
                                            <p className="text-sm text-neutral-dark/70 text-center">
                                                {option.thickness ? `Thickness: ${option.thickness}` : (product.colorOptions.length === 2 ? "Available in 6\" (1.5cm) thickness" : "Available in ESD version")}
                                            </p>
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
                                <div className="mb-8">
                                    <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                                        <SwatchIcon className="w-3 h-3" />
                                        {product.colorOptions.length === 2 ? "Customization" : "Variations"}
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark">
                                        {product.colorOptions.length === 2 ? "Colour Options Available" : "Profile Options Available"}
                                    </h2>
                                </div>
                                <p className="text-base text-neutral-dark/70 leading-relaxed">
                                    {product.colorOptions.length === 2
                                        ? "Choose from our two premium color options, both available in 6\" (1.5cm) thickness."
                                        : "Choose from our three premium profile options, all available in ESD version."}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Warranty */}
            {product.warranty && (
                <section className="relative bg-linear-to-br from-primary via-blue-800 to-indigo-700 py-12 sm:py-16 overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]" aria-hidden />
                    <div className="max-w-7xl mx-auto px-4 relative">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col md:flex-row">
                                <div className="bg-gray-100 p-8 flex items-center justify-center md:w-1/2">
                                    <Image src={product.warranty.badgeImage} alt="Warranty" width={300} height={300} className="h-64 w-auto object-contain" />
                                </div>
                                <div className="p-8 flex flex-col justify-center md:w-1/2">
                                    <h2 className="text-2xl font-bold text-neutral-dark mb-4">{product.warranty.title}</h2>
                                    <span className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4 w-fit">
                                        <ShieldCheckIcon className="w-4 h-4" /> Guarantee
                                    </span>
                                    <p className="text-sm text-neutral-dark/70 mb-3">{product.warranty.description}</p>
                                    <p className="text-sm text-neutral-dark/70">{product.warranty.additionalInfo}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Benefits */}
            <section className="bg-white py-12 sm:py-20">
                <div className="max-w-[1300px] mx-auto px-4">
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Advantages
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold text-neutral-dark mb-3">Key Benefits</h2>
                    </div>

                    {benefitImages.length > 0 && (
                        <div className={`grid grid-cols-2 ${benefitImages.length === 3 ? 'md:grid-cols-3' : benefitImages.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'} gap-4 mb-12 max-w-7xl mx-auto`}>
                            {benefitImages.map((num) => (
                                <div key={num} className="relative w-full aspect-square border border-gray-200 rounded-lg overflow-hidden bg-neutral-500/10">
                                    <ImageZoom
                                        src={typeof num === 'string'
                                            ? `/assets/products Page/benifits/${num}.png`
                                            : `/assets/products Page/${imageFolder}/${num}.png`
                                        }
                                        alt={`Benefit ${num}`}
                                    >
                                        <Image
                                            src={typeof num === 'string'
                                                ? `/assets/products Page/benifits/${num}.png`
                                                : `/assets/products Page/${imageFolder}/${num}.png`
                                            }
                                            alt={`Benefit ${num}`}
                                            fill
                                            className="object-cover scale-120 p-2"
                                        />
                                    </ImageZoom>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center overflow-hidden justify-between p-6 border group border-gray-200 rounded-2xl bg-white shadow-sm hover:border-primary/30 transition-all"
                                >
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-1.5">{benefit.title}</h3>
                                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{benefit.description}</p>
                                    </div>
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 translate-x-6 translate-y-2 w-28 h-28 bg-primary/10 rounded-full" />
                                        <div className="relative w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Sizes */}
            {product.sizes && (
                <section className="bg-gray-50 py-16 sm:py-20 relative">
                    <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.03]" aria-hidden />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                                Available Sizes & Customization
                            </h2>
                            <p className="text-neutral-dark/60 max-w-2xl mx-auto">
                                Flexible sizing options to meet your specific requirements
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {/* Widths Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                            <ArrowsRightLeftIcon className="w-6 h-6 text-neutral-700 group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark mb-2">
                                            Widths
                                        </h3>
                                    </div>
                                    <p className="text-sm text-neutral-dark/70 leading-relaxed">
                                        {product.sizes.widths}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Standard Lengths Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                            <ListBulletIcon className="w-6 h-6 text-neutral-700 group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark mb-2">
                                            Standard Lengths
                                        </h3>
                                    </div>
                                    <p className="text-sm text-neutral-dark/70 leading-relaxed">
                                        {product.sizes.standardLengths}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Custom Sizes Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                            <WrenchScrewdriverIcon className="w-6 h-6 text-neutral-700 group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark mb-2">
                                            Custom Sizes
                                        </h3>
                                    </div>
                                    <p className="text-sm text-neutral-dark/70 leading-relaxed">
                                        {product.sizes.customSizes}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
