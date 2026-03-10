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
                        className="text-4xl max-w-6xl mx-auto sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg"
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
                            target="_blank"
                            href="https://www.ccmatting.co.uk/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.1-Copy.pdf"
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
                                        {"Variations"}
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
            <section className="bg-white py-12 sm:py-20 relative overflow-hidden">
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
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(25)].map((_, i) => (
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

                {/* Soft gradient circles background (professional, subtle) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.22, scale: 0.95 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute left-[10%] top-[0rem] w-[48rem] h-[48rem] rounded-full blur-2xl"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.35), transparent 60%)'
                        }}
                    />
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.2, scale: 1 }}
                        animate={{ opacity: 0.28, scale: 1.03 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute right-[0rem] top-1/3 w-[52rem] h-[52rem] rounded-full blur-2xl"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.3), transparent 65%)'
                        }}
                    />
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.18, scale: 0.98 }}
                        animate={{ opacity: 0.26, scale: 1.02 }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute left-1/2 bottom-[-6rem] -translate-x-1/2 w-[56rem] h-[56rem] rounded-full blur-2xl"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.22), transparent 70%)'
                        }}
                    />
                </div>
                <div className="max-w-[1300px] mx-auto px-4 relative z-10">
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Advantages
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold text-neutral-dark mb-3">Key Benefits</h2>
                        <p className="text-sm text-neutral-dark/60 max-w-2xl mx-auto">
                            Our ergonomic and contamination control solutions are designed to enhance workplace safety, productivity, and hygiene.
                        </p>
                    </div>

                    {/* {benefitImages.length > 0 && (
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
                    )} */}

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
                                    className="relative overflow-hidden flex items-center justify-between p-6 border group border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className="flex-1 pr-4 group-hover:z-50">
                                        <h3 className="text-lg font-semibold transition-colors group-hover:text-white text-neutral-900 mb-1.5">{benefit.title}</h3>
                                        <p className="text-xs sm:text-sm transition-colors group-hover:text-white/80 text-neutral-700 leading-relaxed">{benefit.description}</p>
                                    </div>
                                    <div className="relative shrink-0">
                                        <div className="absolute group-hover:-left-1/2 group-hover:z-0 group-hover:-top-1/2 group-hover:scale-600 group-hover:-translate-x-1/2 transition-all group-hover:bg-linear-to-br to-primary from-indigo-500 duration-600 group-hover:-translate-y-3 inset-0 translate-x-6 translate-y-2 w-28 h-28 bg-primary/10 rounded-full" />
                                        <div className="relative w-12 h-12 rounded-xl group-hover:bg-white group-hover:text-indigo-700 bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-all duration-300">
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
                <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
                    <div className="pointer-events-none absolute bg-linear-to-t from-white to-blue-600/40 animate-[pulse_3s_infinite] inset-0 bg-repeat opacity-[0.05]" aria-hidden />
                    <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.025]" aria-hidden />
                    {/* Subtle background accents */}
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                        <div className="absolute -top-12 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />
                        <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-primary/15 to-transparent" />
                    </div>

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
                                className="relative overflow-hidden bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-indigo-500 to-primary" />
                                <div className="flex flex-col h-full gap-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                                            <ArrowsRightLeftIcon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark">Widths</h3>
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
                                className="relative overflow-hidden bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 via-primary to-indigo-500" />
                                <div className="flex flex-col h-full gap-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                                            <ListBulletIcon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark">Standard Lengths</h3>
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
                                className="relative overflow-hidden bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-indigo-500 to-primary" />
                                <div className="flex flex-col h-full gap-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                                            <WrenchScrewdriverIcon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark">Custom Sizes</h3>
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
        </main>
    );
}
