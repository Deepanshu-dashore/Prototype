"use client";

import { useState } from "react";
import Header from "../../src/components/share/Header";
import UtilityBar from "../../src/components/share/UtilityBar";
import Footer from "../../src/components/share/Footer";
import ContactForm from "../../src/components/share/ContactForm";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function VideosPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'CC Matting Informative Video 1',
      description: 'Learn about our contamination control solutions and how they protect your critical areas.',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/TiVEu0V3Lq8/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/TiVEu0V3Lq8',
      badgeColor: 'bg-primary',
      badgeText: 'Tutorial',
    },
    {
      id: 2,
      title: 'CC Matting Informative Video 2',
      description: 'Discover the technology behind our advanced polymeric matting systems.',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/abzEtfgnLrw/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/abzEtfgnLrw',
      badgeColor: 'bg-blue-500',
      badgeText: 'Technology',
    },
    {
      id: 3,
      title: 'CC Matting Informative Video 3',
      description: 'See how our mats are installed and maintained in various environments.',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/JQH4wPAGTU0/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/JQH4wPAGTU0',
      badgeColor: 'bg-rose-400',
      badgeText: 'Installation',
    },
    {
      id: 4,
      title: 'CC Matting Informative Video 4',
      description: 'Explore the benefits and features of our contamination control products.',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/dc_AdFCxizY/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/dc_AdFCxizY',
      badgeColor: 'bg-teal-500',
      badgeText: 'Features',
    },
    {
      id: 5,
      title: 'CC Matting Informative Video 5',
      description: 'Heavy duty matting solutions for industrial and warehouse applications.',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/Kysx_WHLrFQ/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/Kysx_WHLrFQ',
      badgeColor: 'bg-indigo-500',
      badgeText: 'Heavy Duty',
    },
    {
      id: 6,
      title: 'Eliminate Ingress Of Contamination From ForkTruck Traffic.',
      description: 'Protect your facility from contamination brought in by forklift traffic.',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/TiVEu0V3Lq8/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/TiVEu0V3Lq8',
      badgeColor: 'bg-blue-400',
      badgeText: 'Industrial',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UtilityBar />
      <Header onContactClick={() => setIsContactFormOpen(true)} />

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
                Informative Videos
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                Informative <span className="text-primary">Videos</span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                Learn more about how our products work and their impact on your cleanroom environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Gallery Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={`${video.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Video Container */}
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
                        {video.thumbnail && (
                          <Image 
                            src={video.thumbnail} 
                            alt={video.title} 
                            width={640}
                            height={360}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors cursor-pointer"
                          onClick={() => setPlayingVideoId(video.id)}
                        >
                          <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                            <PlayIcon className="w-8 h-8 text-primary ml-1" aria-hidden="true" />
                          </div>
                        </div>
                        {/* Badge on thumbnail */}
                        <div className={`absolute top-3 left-3 ${video.badgeColor} text-white px-2.5 py-1 rounded-md text-xs font-semibold shadow-lg`}>
                          {video.badgeText}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Content */}
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

        {/* Minimalist CTA Section - Floating Card */}
        <section className=" py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <div className="bg-linear-to-b from-primary/50 via-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white mb-4">
                  Ready to Learn More?
                </h2>
                <p className="text-base sm:text-base text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Contact us to discover how our contamination control solutions can protect your facility. Our team is ready to help you find the perfect matting solution for your needs.
                </p>
                <button
                  onClick={() => setIsContactFormOpen(true)}
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
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
      </main>

      <Footer />
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  );
}

