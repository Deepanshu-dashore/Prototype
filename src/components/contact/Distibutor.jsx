"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function DistributorSection() {
    return (
        <section className="bg-gradient-to-br from-[#0047AB] to-indigo-700 py-16 sm:py-20 relative">

            {/* Background Pattern */}
            <div
                className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.03]"
                aria-hidden
            />

            <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* LEFT CONTENT */}
                        <div className="lg:col-span-7">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                                Become a Distributor
                            </h2>

                            <div className="space-y-6 text-sm sm:text-base text-white/80 leading-relaxed">
                                <p>
                                    We have developed our own range of high-performance polymeric
                                    contamination control mats for worldwide distribution,
                                    supported by <strong className="text-white">Enterprise Ireland</strong>.
                                </p>

                                <p>
                                    Our products undergo rigorous testing to ensure superior
                                    durability, reliability, and long-term performance in
                                    critical environments.
                                </p>

                                <p>
                                    We are expanding our global distribution network and seeking
                                    committed partners focused on quality, growth, and long-term collaboration.
                                </p>

                                {/* CTA Buttons */}
                                <div className="pt-6 flex flex-col sm:flex-row gap-4">

                                    {/* Primary Button */}
                                    <Link
                                        href="/distributor/login"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/30 text-white border-white/20 border font-semibold rounded-lg shadow-lg hover:bg-white/40 transition-all duration-300 group/login"
                                    >
                                        Distributor Login
                                        <ArrowRightIcon className="w-4 h-4 group-hover/login:translate-x-1 transition-transform" />
                                    </Link>

                                    {/* Secondary Button */}
                                    <Link
                                        href="/distributor/register"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white hover:text-[#0047AB] transition-all duration-300 group/register"
                                    >
                                        Register as a New Distributor
                                        <ArrowRightIcon className="w-4 h-4 group-hover/register:translate-x-1 transition-transform" />
                                    </Link>

                                </div>
                            </div>
                        </div>

                        {/* RIGHT VISUAL BLOCK */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-10 flex items-center justify-center shadow-xl">

                                <div className="text-center text-white">
                                    <h3 className="text-xl font-semibold mb-3">
                                        Global Distribution Network
                                    </h3>
                                    <p className="text-white/70 text-sm">
                                        Partner with CCMatting and expand your business with
                                        industry-leading contamination control solutions.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
