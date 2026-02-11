'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImageZoom from "@/src/components/ui/ImageZoom";
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
    SparklesIcon,
    BoltIcon,
    ArrowsRightLeftIcon,
    ListBulletIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default function HeavyDutyContent({ product }) {
    const customSpaceImages = [
        "/assets/products%20Page/HavyDuty-custSpace/1.jpeg",
        "/assets/products%20Page/HavyDuty-custSpace/2.jpeg",
        "/assets/products%20Page/HavyDuty-custSpace/3.jpeg",
        "/assets/products%20Page/HavyDuty-custSpace/4.jpeg",
    ];
    const iconMap = {
        CheckBadgeIcon,
        ShieldCheckIcon,
        ClockIcon,
        CheckCircleIcon,
        CurrencyDollarIcon,
        PaintBrushIcon,
        ArrowPathIcon,
        SparklesIcon,
        BoltIcon
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
                        <div className="grid grid-cols-1 grid-rows-2 shrink-0 w-full md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
                            {product.colorOptions.map((color, index) => (
                                <motion.div
                                    key={color.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`group ${color.comingSoon ? "row-span-1" : "row-span-2"}`}
                                >
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 relative">
                                        <div className={`mb-4 relative w-full ${color.comingSoon ? 'h-14' : 'h-64'} rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center`}>
                                            {color.comingSoon ? (
                                                <div className="absolute inset-0 bg-gray-100 backdrop-blur-sm z-10 flex items-center justify-center">
                                                    <div className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm shadow-lg border-2 border-primary/20">
                                                        COMING SOON
                                                    </div>
                                                </div>
                                            ) : (
                                                <ImageZoom src={color.image} alt={color.name}>
                                                    <Image src={color.image} alt={color.name} width={400} height={400} className={`w-full h-full object-cover ${color.comingSoon ? 'opacity-40' : ''}`} />
                                                </ImageZoom>
                                            )}
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
                                    Available finishes
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark">Colour Options Available</h2>
                            </div>
                            <p className="text-base text-neutral-dark/70 leading-relaxed mb-4">
                                Choose from Solid Grey and Grey Speckled, with Cobalt Blue and Blue Speckled scheduled for release. All colour variants are produced to identical performance specifications, ensuring uniform durability and suitability for cleanroom and controlled environments.
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
                                <div className="bg-gray-100 p-8 py-2 flex items-center justify-center md:w-1/3 h-96">
                                    <Image src={product.warranty.badgeImage} alt="Warranty" width={400} height={400} className="w-full h-96 object-contain" />
                                </div>
                                <div className="p-8 flex flex-col justify-center md:w-2/3">
                                    <h2 className="text-2xl font-bold text-neutral-dark mb-4">{product.warranty.title}</h2>
                                    <span className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4 w-fit">
                                        <ShieldCheckIcon className="w-4 h-4" /> Coverage
                                    </span>
                                    <p className="text-sm text-neutral-dark/70 mb-3">{product.warranty.description}</p>
                                    <p className="text-sm text-neutral-dark/70">{product.warranty.additionalInfo}</p>
                                    <p className="text-sm text-neutral-dark/70 mt-3">{product.warranty.additionalInfo2}</p>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

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

                {/* Soft gradient circles background (professional, subtle) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.08, scale: 0.95 }}
                        animate={{ opacity: 0.12, scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute left-1/4 top-[-6rem] w-[28rem] h-[28rem] rounded-full blur-3xl"
                        style={{
                            background: `radial-gradient(circle at center, ${product.gradientColors.primary}30, transparent 60%)`
                        }}
                    />
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.06, scale: 1 }}
                        animate={{ opacity: 0.1, scale: 1.03 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute right-[-8rem] top-1/3 w-[32rem] h-[32rem] rounded-full blur-3xl"
                        style={{
                            background: `radial-gradient(circle at center, ${product.gradientColors.dark}25, transparent 65%)`
                        }}
                    />
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.06, scale: 0.98 }}
                        animate={{ opacity: 0.1, scale: 1.02 }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute left-1/2 bottom-[-10rem] -translate-x-1/2 w-[36rem] h-[36rem] rounded-full blur-3xl"
                        style={{
                            background: `radial-gradient(circle at center, ${product.gradientColors.primary}20, transparent 70%)`
                        }}
                    />

                    {/* Abstract flowing lines */}
                    <motion.div
                        aria-hidden
                        className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/10 to-transparent"
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
                        className="absolute top-3/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-primary/10 to-transparent"
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
                        className="absolute inset-0 opacity-5"
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
                        className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20"
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
                        className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20"
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
                </div>
                <div className="max-w-[1300px] mx-auto px-4 relative z-10">
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SparklesIcon className="w-3 h-3" />
                            Advantages
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold text-neutral-dark mb-3">CC HEAVY DUTY Benefits</h2>
                        <p className="text-sm text-neutral-dark/60 max-w-2xl mx-auto">
                            Our Heavy Duty Contamination Control Matting solutions provide superior contamination control and durability for high-traffic environments.
                        </p>
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
                                    className="relative overflow-hidden flex items-center justify-between p-6 border group border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className="flex-1 pr-4 group-hover:z-50">
                                        <h3 className="text-lg font-semibold transition-colors group-hover:text-white text-neutral-900 mb-1.5">{benefit.title}</h3>
                                        <p className="text-xs sm:text-sm transition-colors group-hover:text-white/80 text-neutral-700 leading-relaxed">{benefit.description}</p>
                                    </div>
                                    <div className="relative shrink-0">
                                        <div className="absolute group-hover:-left-1/2 group-hover:z-0 group-hover:-top-1/2 group-hover:scale-600 group-hover:-translate-x-1/2 transition-all group-hover:bg-linear-to-br to-primary from-indigo-500 duration-600 group-hover:-translate-y-3 inset-0 translate-x-6 translate-y-2 w-28 h-28 bg-primary/10 rounded-full" />
                                        <div className="relative w-12 h-12 rounded-xl group-hover:bg-white group-hover:text-indigo-700 bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-all duration-300">
                                            <Icon className="w-6 h-6" aria-hidden="true" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Customize To Your Space */}
            <section className="bg-primary py-16 sm:py-20 relative">
                <div className={`absolute top-0 left-0 w-full h-full bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]  pointer-events-none`} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-white text-neutral-dark font-semibold px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SwatchIcon className="w-3 h-3" />
                            Application-Specific Dimensions
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                            Customize to Your Space
                        </h2>
                        <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
                            We customize our CCM Heavy-Duty Polymeric Mat sizes to suit the required installation area. Share your dimensions and layout needs, and we will tailor the matting for the right coverage and performance.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {customSpaceImages.map((image, index) => (
                            <div
                                key={image}
                                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm"
                            >
                                <ImageZoom src={image} alt={`Customized matting ${index + 1}`}>
                                    <Image
                                        src={image}
                                        alt={`Customized matting ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </ImageZoom>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation Gallery */}
            <section className="bg-gray-50 py-16 sm:pb-10 sm:py-20 relative">
                {/* <div className="pointer-events-none absolute inset-0 bg-[url('/Shape2.svg')] bg-repeat opacity-[0.05]" aria-hidden /> */}
                <div className="pointer-events-none absolute bg-linear-to-t from-white to-blue-500/20 animate-[pulse_2s_infinite] inset-0 bg-repeat opacity-[0.05]" aria-hidden />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <SwatchIcon className="w-3 h-3" />
                            Installation Gallery
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-3">
                            CC Matting Installations
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                            Our contamination control mats have been successfully installed across leading pharmaceutical and cleanroom facilities worldwide.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { demnsions: "w-30 h-10 object-cover", src: "/assets/installation/CCM Gilead1.jpeg", name: "Gilead Installation", logo: "/assets/Our Valuable Customers/asset 15.gif", company: "Gilead" },
                            { demnsions: "w-43 pt-3 h-10 object-cover", src: "/assets/installation/CCM Gilead2.jpeg", name: "Gilead Facility", logo: "/assets/Our Valuable Customers/asset 10.png", company: "Gilead" },
                            { demnsions: "w-32 h-auto mt-2 mb-2", src: "/assets/installation/CCM Lilly2.jpeg", name: "Lilly Installation", logo: "/assets/Our Valuable Customers/asset 25.png", company: "Lilly" },
                            { demnsions: "w-18 h-auto object-cover", src: "/assets/installation/CCM Lilly3.jpeg", name: "Lilly Cleanroom", logo: "/assets/Our Valuable Customers/asset 17.png", company: "Lilly" },
                            { demnsions: "w-10 h-auto object-cover", src: "/assets/installation/CCM%20lilly%202.jpeg", name: "Lilly Facility", logo: "/assets/Our Valuable Customers/asset 14.jpeg", company: "Lilly" },
                            { demnsions: "w-44 my-1.5 h-auto object-cover", src: "/assets/installation/CCM Stryker.jpg.jpeg", name: "Stryker Installation", logo: "/assets/Our Valuable Customers/asset 23.png", company: "Stryker" },
                            { demnsions: "w-32 h-auto object-cover", src: "/assets/installation/Wuxi.jpeg", name: "Wuxi Facility", logo: "/assets/Our Valuable Customers/asset 19.jpeg", company: "Wuxi" },
                            { demnsions: "w-16 h h-auto object-cover", src: "/assets/installation/WhatsApp%20Image%202024-08-20%20at%2020.22.45%20(1).jpeg", name: "Cleanroom Installation", logo: "/assets/Our Valuable Customers/asset 16.png", company: "phzer" },
                            { demnsions: "w-22 h-auto object-cover", src: "/assets/installation/WhatsApp%20Image%202025-05-16%20at%2020.38.58%20(1).jpeg", name: "Industrial Installation", logo: "/assets/Our Valuable Customers/asset 18.png", company: "msds" },
                        ].map((image, index) => (
                            <motion.div
                                key={image.src}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <ImageZoom
                                    src={image.src}
                                    alt={image.name}
                                    zoomScale={2}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </ImageZoom>
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        {image.logo ? (
                                            <div className="bg-white w-full rounded-lg p-3 inline-block shadow-lg">
                                                <Image
                                                    src={image.logo}
                                                    alt={image.company}
                                                    width={120}
                                                    height={40}
                                                    className={`${image.demnsions}`}
                                                />
                                            </div>
                                        ) : (
                                            <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                                                <p className="text-white font-semibold text-sm">{image.name}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
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
