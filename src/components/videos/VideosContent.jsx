'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useContactForm } from "../share/ContactFormContext";

export default function VideosContent() {
    const { openContactForm } = useContactForm();
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const videos = [
        {
            id: 1,
            title: 'Contamination Control Mats: Purpose, Performance & Protection',
            description: 'Discover why contamination control mats are essential in critical environments and explore the key features that set CCMatting solutions apart.',
            thumbnail: 'https://img.youtube.com/vi/z8qylWg6XcI/hqdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/z8qylWg6XcI',
            badgeColor: 'bg-primary',
            badgeText: 'Tutorial',
        },
        {
            id: 2,
            title: 'Peel-Off Mats vs CCMatting: A Smarter, Sustainable Choice',
            description: 'Learn the limitations of peel-off mats and how CCMatting delivers superior performance while significantly reducing your facility\'s carbon footprint.',
            thumbnail: 'https://img.youtube.com/vi/JQH4wPAGTU0/hqdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/JQH4wPAGTU0',
            badgeColor: 'bg-blue-500',
            badgeText: 'Comparison',
        },
        {
            id: 3,
            title: 'How our Polymer Mats work - CCMatting',
            description: 'See how CCMatting polymer mats reduce contamination at entry points and help maintain cleanroom integrity.',
            thumbnail: 'https://img.youtube.com/vi/DXUpivYwE0M/hqdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/DXUpivYwE0M',
            badgeColor: 'bg-rose-400',
            badgeText: 'Technology',
        },
        {
            id: 4,
            title: 'Controlling Contamination from Forklift Traffic',
            description: 'See how CCMatting solutions prevent contamination ingress caused by forklift and fork truck movement in high-traffic facilities.',
            thumbnail: 'https://img.youtube.com/vi/TiVEu0V3Lq8/hqdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/TiVEu0V3Lq8',
            badgeColor: 'bg-teal-500',
            badgeText: 'Industrial',
        },
        {
            id: 5,
            title: 'Restoring Performance: CCMatting Mat Maintenance Explained',
            description: 'A step-by-step guide to cleaning and maintaining your CCMatting contamination control mat to restore 100% working efficiency.',
            thumbnail: 'https://img.youtube.com/vi/abzEtfgnLrw/hqdefault.jpg',
            embedUrl: 'https://www.youtube.com/embed/abzEtfgnLrw',
            badgeColor: 'bg-indigo-500',
            badgeText: 'Maintenance',
        },
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
                        <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Watch & Learn
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                            Informative <span className="text-primary">Videos</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                            Learn how our Advanced Polymer Contamination Control Mats help maintain cleanroom integrity and protect cleanroom environments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Video Gallery Section */}
            <section className="relative">
                <div className="pointer-events-none absolute inset-0 bg-[url('/square2.svg')] bg-repeat opacity-[0.05]" aria-hidden />
            <section className="bg-white py-16 sm:py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {videos.map((video, index) => (
                            <motion.div
                                key={`${video.id}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative z-20 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative aspect-video bg-neutral-light">
                                    {playingVideoId === video.id ? (
                                        <iframe
                                            src={`${video.embedUrl}?autoplay=1`}
                                            title={video.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <>
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                width={640}
                                                height={360}
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors cursor-pointer"
                                                onClick={() => setPlayingVideoId(video.id)}
                                            >
                                                <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                                    <PlayIcon className="w-8 h-8 text-primary ml-1" aria-hidden="true" />
                                                </div>
                                            </div>
                                            <div className={`absolute top-3 left-3 ${video.badgeColor} text-white px-2.5 py-1 rounded-md text-xs font-semibold shadow-lg`}>
                                                {video.badgeText}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-neutral-dark mb-2 line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-sm text-neutral-dark/70 mb-4 line-clamp-2 leading-relaxed">
                                        {video.description}
                                    </p>
                                    {playingVideoId !== video.id && (
                                        <button
                                            onClick={() => setPlayingVideoId(video.id)}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-primary hover:text-white text-neutral-dark px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border border-gray-200 hover:border-primary group/btn"
                                        >
                                            <span>Watch Video</span>
                                            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Minimalist CTA Section */}
            <section className=" py-16 sm:pb-20 sm:pt-0 relative overflow-hidden">
                <div className="pointer-events-none rotate-15 absolute inset-0 bg-[url('/Shape.svg')] bg-repeat opacity-[0.08]" aria-hidden />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="bg-linear-to-b flex items-center justify-evenly from-primary/50 via-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl text-center">
                            
                            <div className=" text-left">
                                <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white mb-4">
                                Ready to Learn More?
                            </h2>
                            <p className="text-base sm:text-base text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Contact us to discover how our contamination control solutions can protect your facility. Our team is ready to help you find the perfect matting solution for your needs.
                            </p></div>
                            <button
                                onClick={openContactForm}
                                className="inline-flex  h-fit items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Get in Touch
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
            </section>
        </main>
    );
}
