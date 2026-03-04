'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    SwatchIcon,
    ArrowPathIcon,
    Square3Stack3DIcon,
    CalendarIcon,
    ShieldCheckIcon,
    CheckBadgeIcon,
    SparklesIcon,
    CpuChipIcon,
    GiftIcon,
    WrenchScrewdriverIcon,
    Cog6ToothIcon,
    HomeIcon,
    UserGroupIcon,
    ExclamationTriangleIcon,
    LockClosedIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";
import DotGrid from '../share/DotGrid';
import ImageZoom from '../ui/ImageZoom';
import Aurora from '../share/Aurora';

// YouTube Video Component
function YouTubeVideo({ videoId, title }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    if (isPlaying) {
        return (
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <iframe
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        );
    }

    return (
        <div
            className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setIsPlaying(true)}
        >
            <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover"
                onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

// Synced Side Section Component for Scroll Progress
function SyncedSideSection({ children, videoId, videoTitle, reverse = false, bgClass = "bg-white", disableOpacity = false }) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Animation mapping as provided by user
    const xLeft = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [-150, 0, 0, -150])
    const xRight = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [150, 0, 0, 150])
    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [disableOpacity ? 1 : 0, 1, 1, disableOpacity ? 1 : 0])
    const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.95, 1, 1, 0.95])

    return (
        <section ref={containerRef} className={`${bgClass} py-16 sm:py-20 relative overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                    <motion.div
                        style={{
                            x: reverse ? xRight : xLeft,
                            opacity,
                            scale
                        }}
                        className={reverse ? "order-2 lg:order-2" : "order-1"}
                    >
                        {children}
                    </motion.div>

                    <motion.div
                        style={{
                            x: reverse ? xLeft : xRight,
                            opacity,
                            scale
                        }}
                        className={`relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden ${reverse ? "order-1 lg:order-1" : "order-2"}`}
                    >
                        <YouTubeVideo videoId={videoId} title={videoTitle} />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default function FeaturesContent() {
    const benefits = [
        {
            title: "100% Recyclable",
            description: "100% Recyclable and has a very low environmental footprint.",
            icon: <ArrowPathIcon className="w-6 h-6" />
        },
        {
            title: "8+ Overstrikes",
            description: "The mat is still effective after 8 overstrikes not like a tacky mat which is no longer effective after 2.",
            icon: <Square3Stack3DIcon className="w-6 h-6" />
        },
        {
            title: "3–5 Year Life Cycle",
            description: "Engineered for durability, our mats provide a reliable 4-5 year life cycle in high-traffic areas, offering significant cost savings.",
            icon: <CalendarIcon className="w-6 h-6" />
        },
        {
            title: "Non-Volatile & Non-Toxic",
            description: "The polymer in the mat is totally non-volatile and non-toxic which makes it safe for all cleanroom classifications.",
            icon: <ShieldCheckIcon className="w-6 h-6" />
        },
        {
            title: "Manufacturer 2-Year Warranty",
            description: "We provide a comprehensive 2-year warranty on all mats, ensuring your facility remains protected with guaranteed performance.",
            icon: <CheckBadgeIcon className="w-6 h-6" />
        },
        {
            title: "Ease of Maintenance",
            description: "Simple cleaning procedure, clean with a mop and squeegee dry. The cleaning process removes the contaminants from the mat rendering it like new.",
            icon: <SparklesIcon className="w-6 h-6" />
        }
    ];

    return (
        <main className="grow">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-b from-primary/10 via-white to-white border-b border-gray-100">
                {/* Animated floating circles */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <motion.svg
                        className="absolute top-0 left-0 w-96 h-96 text-primary/10"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{
                            y: [0, 30, 0],
                            opacity: [0.1, 0.2, 0.1]
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
                        className="absolute bottom-0 right-0 w-96 h-96 text-primary/10"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.15, 0.25, 0.15]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>
                </div>

                {/* Animated dots/particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`dot-${i}`}
                            className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full shadow-sm"
                            animate={{
                                y: [0, -40, 0],
                                x: [0, (i % 5) * 10 - 20, 0],
                                opacity: [0, 0.6, 0],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 4 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: `${(i * 11) % 100}%`,
                                top: `${(i * 17) % 100}%`
                            }}
                        />
                    ))}
                </div>

                {/* Pulsing corner accents */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/10"
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
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
                    className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/10"
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Soft gradient background accents */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.15, scale: 0.95 }}
                        animate={{ opacity: 0.25, scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute left-[10%] top-[-10%] w-[40rem] h-[40rem] rounded-full blur-3xl"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.2), transparent 70%)'
                        }}
                    />
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0.12, scale: 1 }}
                        animate={{ opacity: 0.22, scale: 1.05 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute right-[5%] bottom-[5%] w-[35rem] h-[35rem] rounded-full blur-3xl"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.15), transparent 70%)'
                        }}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-white text-neutral-dark px-4 py-2 rounded-md text-xs font-medium mb-6 border border-gray-200">
                            <SparklesIcon className="w-3.5 h-3.5" />
                            Key Advantages
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                            Advanced Contamination Control Solutions
                        </h1>
                        <p className="text-lg sm:text-xl text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                            Discover how our polymeric matting technology protects your critical areas with Up to 99% particulate retention.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What is Polymeric Mat Section - Refactored for Scroll Sync */}
            <section className='relative bg-white'>
                {/* <div className="pointer-events-none absolute inset-0 bg-[url('/Shape2.svg')] bg-repeat opacity-[0.06]" aria-hidden /> */}
                <div className="pointer-events-none absolute bg-linear-to-t from-white to-blue-600/40 animate-[pulse_3s_infinite] inset-0 bg-repeat opacity-[0.05]" aria-hidden />

                <SyncedSideSection
                    videoId="DXUpivYwE0M"
                    videoTitle="What is a Polymeric Mat"
                    bgClass="relative z-10"
                >
                    <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-6">
                        <CpuChipIcon className="w-3.5 h-3.5" />
                        Innovation
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-6 leading-tight">
                        What is a Polymeric Mat?
                    </h2>
                    <div className="space-y-5 text-sm sm:text-base text-neutral-dark/70 leading-relaxed">
                        <p>
                            A polymeric mat is manufactured with a patented polymeric compound and a non migratory plasticizer, creating a natural tack and proven to retain up to <strong className="text-neutral-dark font-semibold">Up to 99% of foot and wheel borne particulate</strong> from entering your critical areas.
                        </p>
                        <p>
                            The high tack surface is slightly conforming which allows a concentrated loading of particles as you walk or traverse across the mat.
                        </p>
                        <p>
                            These properties enable the surface to attract, collect and retain particles ranging in size from over <strong className="text-neutral-dark font-semibold">100 microns down to a few nanometers</strong>.
                        </p>
                        <p>
                            The mats also function due to a phenomena known as <strong className="text-neutral-dark font-semibold">Van der Waals forces</strong>, a high level of short range electromagnetic forces.
                        </p>
                    </div>
                </SyncedSideSection>
            </section>


            {/* Bio Master section */}
            <section className="bg-linear-to-br from-[#0047AB] to-indigo-700 py-16 sm:py-20 relative">
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.03]" aria-hidden />
                <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7">
                                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-100 mb-6">
                                    Biomaster™ Antimicrobial Technology
                                </h3>
                                <div className="space-y-6 text-sm sm:text-base text-neutral-100/80 leading-relaxed">
                                    <p>
                                        CCMatting products incorporate <strong className="text-white font-semibold">"Biomaster™ Antimicrobial Technology"</strong> from Addmaster as an integral part of their polymer composition.
                                    </p>
                                    <p>
                                        This advanced antimicrobial solution inhibits the growth of bacteria, fungi, mould, and other microorganisms, supporting cleaner products, safer processes, and more controlled environments.
                                    </p>
                                    <div className="pt-4">
                                        <Link
                                            href="/biomaster"
                                            className="inline-flex mx-auto lg:mx-0 items-center gap-2 px-6 py-3 bg-white/10 border-2 border-white/20 backdrop-blur-[1px] text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 shadow-lg shadow-black/20 group/bio"
                                        >
                                            <span>Learn more about BioMaster Advantage</span>
                                            <ArrowRightIcon className="w-4 h-4 group-hover/bio:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                                <div className="relative w-full h-56 md:w-[70dvw] md:h-72 bg-white border-4 divide-y divide-x divide-gray-200 backdrop-blur-md rounded-2xl p-8 flex items-center justify-center group/logo transition-colors duration-500">
                                    <Image
                                        src="/biomasterLogo.png"
                                        alt="Biomaster Logo"
                                        width={320}
                                        height={320}
                                        className="object-contain relative z-10 drop-shadow-2xl lg:scale-115 md:scale-125 xl:scale-130 group-hover/logo:scale-125 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
                {/* Floating Background Icons */}
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#5360ff20"
                        activeColor="#a4aef8"
                        proximity={120}
                        shockRadius={250}
                        shockStrength={5}
                        resistance={750}
                        returnDuration={1.5}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-neutral-dark px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <GiftIcon className="w-3.5 h-3.5" />
                            Capability and Value
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                            Benefits of CCM Heavy-Duty Polymeric Matting
                        </h2>
                        <p className="text-neutral-dark/70 text-sm sm:text-base max-w-3xl mx-auto px-4 sm:px-0">
                            Our advanced polymeric technology offers unparalleled advantages in contamination control, durability, and sustainability.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-white hover:bg-accent shadow-md border border-gray-200 rounded-xl p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
                            >
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-neutral-dark flex-1 transition-colors duration-300 group-hover:text-white">
                                            {benefit.title}
                                        </h3>
                                        {/* Spacer to maintain layout when icon moves */}
                                        <div className="w-10 h-10 shrink-0" />
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed mb-6 grow transition-colors duration-300 group-hover:text-white/80">
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Animated Icon Container (Top Right) */}
                                <div className="absolute right-8 top-8 w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-white group-hover:scale-150 group-hover:rounded-bl-3xl group-hover:rounded-br-none group-hover:rounded-tl-none group-hover:h-14 group-hover:right-0 group-hover:top-0 z-0">
                                    <div className="text-white transition-transform duration-500 group-hover:text-primary group-hover:scale-75 group-hover:translate-y-1 group-hover:-translate-x-1">
                                        {benefit.icon}
                                    </div>
                                </div>

                                {/* Decorative Animated Element (Bottom Left) */}
                                <div className="w-8 h-8 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0">
                                </div>
                                <div className="w-14 h-14 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0">
                                </div>
                                <div className="w-20 h-20 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0">
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Heavy Duty Section - Refactored for Scroll Sync */}
            <div className='relative bg-linear-to-br from-primary via-indigo-700 to-indigo-800'>
                <div className="pointer-events-none absolute z-10 inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]" aria-hidden />
                <SyncedSideSection
                    videoId="Kysx_WHLrFQ"
                    videoTitle="CC Matting Heavy Duty"
                    reverse={true}
                    bgClass="relative z-20"
                    disableOpacity={true}
                >


                    <div className="relative">
                        <span className="inline-flex items-center gap-1.5 bg-white text-primary px-3 py-1.5 rounded text-xs font-medium mb-6">
                            <WrenchScrewdriverIcon className="w-3.5 h-3.5" />
                            Our Product
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                            CC Matting Heavy Duty
                        </h2>
                        <div className="space-y-5 text-sm sm:text-base text-white/70 leading-relaxed mb-8">
                            <p>
                                The CC Matting heavy duty polymeric mat is the <strong className="text-white font-semibold">strongest most durable polymer mat in the world</strong> with a point load bearing of <strong className="text-white font-semibold">130kg/cm²</strong>.
                            </p>
                            <p>
                                All our current customers employ the CCM heavy duty polymeric mats in pedestrian walkways PALs and MALs and critical areas with heavy footfall traffic, use of forkilfts, motorized pallet trucks and heavy trolleys.
                            </p>
                        </div>

                        <Link
                            href="/products/heavy-duty"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-primary border border-white/20 rounded-lg font-medium transition-all duration-300 group/btn"
                        >
                            <span>View Technical Specification</span>
                            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </SyncedSideSection>
            </div>

            {/* Install Procedure Section */}
            <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
                {/* Decorative animated circles */}
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
                        className="absolute top-0 right-0 w-96 h-96 text-primary/20"
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
                </div>

                <div className="max-w-[90dvw] mx-auto px-4 pb-10 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-6">
                            <Cog6ToothIcon className="w-3.5 h-3.5" />
                            Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-8 leading-tight">
                            Install Procedure
                        </h2>

                        <div className="space-y-6 text-sm sm:text-base text-neutral-dark/70 leading-relaxed">
                            <p>
                                We do not use subcontractors to install our mats, it is all completed by our own <strong className="text-neutral-dark font-semibold">in-house personnel who are fully trained and competent</strong> on the process. The mats are adhered to the floor with a semi permanent adhesive film.
                            </p>
                            <p>
                                A diminishing strip of 3mm profile is then applied to all sides to ensure the mat is a <strong className="text-neutral-dark font-semibold">non trip hazard</strong> and also to aid with aesthetics. <br />The mat is chemically sealed to the dim strip and the dim strip to the floor to ensure it is a totally sealed surface and it is not possible for any contaminants to harbour under the mat.
                            </p>
                            <p>
                                This ensures there will be <strong className="text-neutral-dark font-semibold">no possible way that your EM counts can ever be adversely affected</strong>.
                            </p>
                        </div>

                        <div className="mt-12 grid @max-xs:grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: "In-House Installation", icon: HomeIcon },
                                { title: "Fully Trained Personnel", icon: UserGroupIcon },
                                { title: "Non-Trip Hazard", icon: ExclamationTriangleIcon },
                                { title: "Totally Sealed Surface", icon: LockClosedIcon }
                            ].map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="bg-gray-50 hover:bg-primary border group relative flex gap-3 pl-12 items-center border-gray-200 rounded-lg p-4 hover:border-primary/30 hover:shadow-md transition-all duration-400 group"
                                    >
                                        <div className="w-10 h-full rounded-r-lg rounded-l-md absolute left-0 bg-primary flex items-center justify-center transition-colors duration-300">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="sm:text-xs text-[12px] xl:text-sm font-medium group-hover:text-white text-neutral-dark">
                                            {feature.title}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
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
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark leading-tight">
                                Get a Custom Quote for Your Facility
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <p className="md:text-sm text-xs flex items-center gap-3 bg-linear-to-bl from-accent/60 via-accent/75 to-accent rounded-md px-5 py-1 w-fit sm:text-base text-white leading-relaxed">
                                <span className="w-3 h-3 inline-block rounded-full bg-white" >
                                </span>
                                If you want an alternative size, call us directly for custom sizing.
                            </p>
                            <p className="text-sm text-justify md:text-left md:text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
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
