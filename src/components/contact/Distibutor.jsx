"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRightIcon,
    BookOpenIcon,
    DocumentTextIcon,
    StarIcon,
    PresentationChartLineIcon,
    GlobeAltIcon,
    LightBulbIcon,
} from "@heroicons/react/24/outline";

const distributorBenefits = [
    {
        title: "Distributor Sales Playbook",
        description:
            "Gain access to a comprehensive, proven sales playbook designed to help CCMatting distributors quickly and effectively commercialise our advanced polymer contamination-control flooring systems in regulated and mission-critical environments.",
        icon: BookOpenIcon,
    },
    {
        title: "Exclusive Technical Resources",
        description:
            "Receive exclusive access to detailed technical documentation, product specifications, and compliance information to support confident selling and accurate project execution.",
        icon: DocumentTextIcon,
    },
    {
        title: "Best-in-Class Product Portfolio",
        description:
            "Become part of the CCMatting distributor network and represent products that are recognised as best-in-market for performance, quality, and reliability.",
        icon: StarIcon,
    },
    {
        title: "Professional Sales Pitch Materials",
        description:
            "Use professionally developed sales pitch documents that clearly communicate product value, competitive advantages, and application benefits to key decision-makers.",
        icon: PresentationChartLineIcon,
    },
];

export default function DistributorSection() {
    return (
        <>
            {/* ── Section 1: Innovation in Every Step ── */}
            <section className="bg-white py-16 sm:py-20 border-t border-gray-100 relative overflow-hidden">
                {/* Subtle background accent */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.025]" aria-hidden />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-16 items-center">

                        {/* LEFT — 70% content */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7 space-y-6"
                        >
                            <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium">
                                <LightBulbIcon className="w-3.5 h-3.5" />
                                Innovation
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark leading-tight">
                                Innovation in every step
                            </h2>

                            <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed max-w-2xl">
                                We have developed our own range of high-performance polymeric contamination
                                control mats for worldwide distribution, supported by{" "}
                                <strong className="text-neutral-dark font-semibold">Enterprise Ireland</strong>.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="/contact#become-distributor"
                                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg group"
                                >
                                    Become a Distributor
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/distributor/login"
                                    className="inline-flex items-center gap-2 border border-gray-200 text-neutral-dark px-6 py-3 rounded-lg font-semibold hover:border-primary/40 hover:text-primary transition-all duration-300"
                                >
                                    Distributor Login
                                </Link>
                            </div>
                        </motion.div>

                        {/* RIGHT — 30% Enterprise Ireland logo panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="lg:col-span-3 flex justify-center lg:justify-end"
                        >
                            <div className="relative w-full max-w-[280px] bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center gap-4 group hover:shadow-xl transition-shadow duration-300">
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-3xl rounded-tr-2xl pointer-events-none" />

                                {/* Enterprise Ireland logo — using img with fallback text */}
                                <div className="w-full flex items-center justify-center">
                                    <img
                                        src="https://www.enterprise-ireland.com/en/images/ei-logo.png"
                                        alt="Enterprise Ireland"
                                        className="max-h-16 max-w-[180px] object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                            e.currentTarget.nextSibling.style.display = "flex";
                                        }}
                                    />
                                    <div className="hidden flex-col items-center justify-center text-center">
                                        <GlobeAltIcon className="w-10 h-10 text-primary mb-2" />
                                        <span className="text-sm font-bold text-neutral-dark">Enterprise Ireland</span>
                                    </div>
                                </div>

                                <p className="text-xs text-neutral-dark/50 text-center leading-relaxed">
                                    Supported by Enterprise Ireland for worldwide distribution
                                </p>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                                <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Globally Supported
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ── Section 2: Become a Distributor ── */}
            <section
                id="become-distributor"
                className="bg-gradient-to-br from-[#0047AB] via-indigo-700 to-indigo-800 py-16 sm:py-20 relative overflow-hidden"
            >
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.04]" aria-hidden />

                {/* Decorative geometric shapes */}
                <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 border-[32px] border-white/5 rotate-12 rounded-sm" />
                <div className="pointer-events-none absolute -left-8 -bottom-8 w-48 h-48 border-[24px] border-white/5 -rotate-6 rounded-sm" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                    >
                        {/* LEFT CONTENT */}
                        <div className="lg:col-span-8 space-y-6">
                            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded backdrop-blur-sm">
                                <GlobeAltIcon className="w-3.5 h-3.5" />
                                Global Distribution
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                Become a Distributor
                            </h2>

                            <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl">
                                <p>
                                    We are actively expanding our global distribution network and are looking for dedicated
                                    partners who share our commitment to quality, innovation, and sustainable growth.
                                </p>
                                <p>
                                    As a CCMatting distributor, you'll gain access to industry-leading contamination control
                                    solutions, proven products, and ongoing support designed to help you succeed.
                                </p>
                                <p>
                                    Partner with CCMatting to strengthen your portfolio, unlock new market opportunities, and build
                                    a long-term, mutually beneficial collaboration.
                                </p>
                            </div>

                            {/* <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <Link
                                    href="/distributor/register"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-[#0047AB] px-8 py-4 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                                >
                                    Register as a Distributor
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/distributor/login"
                                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                                >
                                    Distributor Login
                                </Link>
                            </div> */}
                        </div>

                        {/* RIGHT — Stats/Visual */}
                        <div className="lg:col-span-4 flex justify-center lg:justify-end">
                            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                {[
                                    { value: "99%", label: "Particle Retention" },
                                    { value: "5yr", label: "Product Lifespan" },
                                    { value: "50+", label: "Organisms Killed" },
                                    { value: "2yr", label: "Warranty" },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                        className="bg-white/10 border border-white/20 rounded-xl p-5 text-center backdrop-blur-sm hover:bg-white/15 transition-colors duration-300"
                                    >
                                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-xs text-white/60 leading-tight">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Section 3: Benefits of Becoming a Distributor ── */}
            <section className="bg-white py-16 sm:py-20 relative overflow-hidden border-t border-gray-100">
                {/* Subtle animated dot grid background */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <motion.svg
                        className="absolute top-0 left-0 w-96 h-96 text-primary/10"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{ y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>
                    <motion.svg
                        className="absolute bottom-0 right-0 w-80 h-80 text-primary/10"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        animate={{ y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <circle cx="50" cy="50" r="50" />
                    </motion.svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-neutral-dark px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <StarIcon className="w-3.5 h-3.5" />
                            Distributor Advantages
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                            Benefits of Becoming a Distributor
                        </h2>
                        <p className="text-neutral-dark/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            Join the CCMatting global network and unlock exclusive resources, tools, and support
                            designed to accelerate your success in contamination control markets.
                        </p>
                    </motion.div>

                    {/* Benefit Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {distributorBenefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
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
                                        <p className="text-sm sm:text-base text-neutral-dark/70 leading-relaxed grow transition-colors duration-300 group-hover:text-white/80">
                                            {benefit.description}
                                        </p>
                                    </div>

                                    {/* Animated Icon — Top Right Corner */}
                                    <div className="absolute right-8 top-8 w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-white group-hover:scale-150 group-hover:rounded-bl-3xl group-hover:rounded-br-none group-hover:rounded-tl-none group-hover:h-14 group-hover:right-0 group-hover:top-0 z-0">
                                        <div className="text-white transition-transform duration-500 group-hover:text-primary group-hover:scale-75 group-hover:translate-y-1 group-hover:-translate-x-1">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    {/* Decorative Animated Corner — Bottom Left */}
                                    <div className="w-8 h-8 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0" />
                                    <div className="w-14 h-14 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0" />
                                    <div className="w-20 h-20 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0" />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Link
                            href="/distributor/register"
                            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group"
                        >
                            Register as a Distributor
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
