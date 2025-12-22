"use client";

import { useState } from "react";
import Header from "../../src/components/share/Header";
import UtilityBar from "../../src/components/share/UtilityBar";
import Footer from "../../src/components/share/Footer";
import ContactForm from "../../src/components/share/ContactForm";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HomeIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  SparklesIcon,
  CpuChipIcon,
  GiftIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

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
          // Fallback to hqdefault if maxresdefault fails
          e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />
      {/* Play Button Overlay */}
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

export default function FeaturesBenefitsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const benefits = [
    {
      title: "100% Recyclable",
      description: "100% Recyclable and has a very low environmental footprint.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "8+ Overstrikes",
      description: "The mat is still effective after 8 overstrikes not like a tacky mat which is no longer effective after 2.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "4-5 Year Life Cycle",
      description: "4-5 year life cycle.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Non-Volatile & Non-Toxic",
      description: "The polymer in the mat is totally non-volatile and non-toxic which makes it safe for all cleanroom classifications.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Full 2 Year Warranty",
      description: "Full 2 yr warranty",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Simple Cleaning",
      description: "Simple cleaning procedure, clean with a mop and squeegee dry. The cleaning process removes the contaminants from the mat rendering it like new.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  const properties = [
    "200 employees",
    "Sage Intacct",
    "Procore",
    "Prevailing Wage"
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
              <span className="inline-flex items-center gap-1.5 bg-white text-neutral-dark px-4 py-2 rounded-md text-xs font-medium mb-6 border border-gray-200">
                <SparklesIcon className="w-3.5 h-3.5" />
                Features & Benefits
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight tracking-tight">
                Advanced Contamination Control Solutions
              </h1>
              <p className="text-lg sm:text-xl text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                Discover how our polymeric matting technology protects your critical areas with proven 99.9% particle retention.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What is Polymeric Mat Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-6">
                  <CpuChipIcon className="w-3.5 h-3.5" />
                  Technology
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-6 leading-tight">
                  What is a Polymeric Mat?
                </h2>
                <div className="space-y-5 text-sm sm:text-base text-neutral-dark/70 leading-relaxed">
                  <p>
                    A polymeric mat is manufactured with a patented polymeric compound and a non migratory plasticizer, creating a natural tack and proven to retain up to <strong className="text-neutral-dark font-semibold">99.9% of foot and wheel borne particles</strong> from entering your critical areas.
                  </p>
                  <p>
                    The high tack surface is slightly conforming which allows a concentrated loading of particles as you walk or traverse across the mat with a trolley.
                  </p>
                  <p>
                    These properties enable the surface to attract, collect and retain particles ranging in size from over <strong className="text-neutral-dark font-semibold">100 microns down to a few nanometers</strong>.
                  </p>
                  <p>
                    The mats also function due to a phenomena known as <strong className="text-neutral-dark font-semibold">van der wall forces</strong>, a high level of short range electromagnetic forces.
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Video */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden bg-gray-100"
              >
                <YouTubeVideo 
                  videoId="zQW07tHqGXs" 
                  title="What is a Polymeric Mat"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Anti-Microbial Properties */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-6">
                Enhanced Performance Properties
              </h3>
              <div className="space-y-5 text-sm sm:text-base text-neutral-dark/70 leading-relaxed">
                <p>
                  To enhance the performance of the material special additives are mixed in to give <strong className="text-neutral-dark font-semibold">static dissipative and anti-microbial properties</strong>. The anti-microbial properties are due to the an addition of a silver biocide which is impregnated during manufacturing.
                </p>
                <p>
                  This ensures it is <strong className="text-neutral-dark font-semibold">non-leaching and non-diminishing</strong>. The silver biocide is capable of killing over 50 forms of gram negative and gram positive bacteria including <strong className="text-neutral-dark font-semibold">MRSA, E Coli, SARS and Listeria</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-neutral-dark px-3 py-1.5 rounded text-xs font-medium mb-4">
                <GiftIcon className="w-3.5 h-3.5" />
                Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                Benefits of Polymeric Mat
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    {/* Title with Icon */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-dark flex-1">
                        {benefit.title}
                      </h3>
                      <div className="w-10 h-10 rounded-lg bg-primary/50 flex items-center justify-center shrink-0">
                        <div className="text-white">
                          {benefit.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed mb-6 grow">
                      {benefit.description}
                    </p>
                    
                    {/* CTA Button */}
                    <button className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-primary hover:text-white rounded-lg transition-all duration-300 group/btn border border-gray-200 hover:border-primary">
                      <span className="text-sm font-medium">Learn more</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Heavy Duty Section */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Video */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden bg-gray-100 order-2 lg:order-1"
              >
                <YouTubeVideo 
                  videoId="Kysx_WHLrFQ" 
                  title="CC Matting Heavy Duty"
                />
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-6">
                  <WrenchScrewdriverIcon className="w-3.5 h-3.5" />
                  Heavy Duty
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-6 leading-tight">
                  CC Matting Heavy Duty
                </h2>
                <div className="space-y-5 text-sm sm:text-base text-neutral-dark/70 leading-relaxed">
                  <p>
                    The CC Matting heavy duty polymer mat is the <strong className="text-neutral-dark font-semibold">strongest most durable polymer mat in the world</strong> with a point load bearing of <strong className="text-neutral-dark font-semibold">130kg/cm²</strong>.
                  </p>
                  <p>
                    All of our current customers employ the use of the heavy duty range in their warehouses and areas where forktrucks or motorized pallet trucks are utilized to eliminate the ingress of harmful particulate into their critical area.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Install Procedure Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-6">
                <Cog6ToothIcon className="w-3.5 h-3.5" />
                Installation
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-8 leading-tight">
                Install Procedure
              </h2>
              
              <div className="space-y-6 text-sm sm:text-base text-neutral-dark/70 leading-relaxed">
                <p>
                  We do not use subcontractors to install our mats, it is all completed by our own <strong className="text-neutral-dark font-semibold">inhouse personnel who are fully trained and competent</strong> on the process. The mats are stuck to the floor with a semi permanent adhesive film.
                </p>
                <p>
                  A diminishing strip of 3mm profile is then applied to all sides to ensure the mat is a <strong className="text-neutral-dark font-semibold">non trip hazard</strong> and also to aid with aesthetics. The mat is chemically sealed to the dim strip and the dim strip to the floor to ensure it is a totally sealed surface and it is not possible for any contaminants to harbour benath or under the mat.
                </p>
                <p>
                  This ensures there will be <strong className="text-neutral-dark font-semibold">no possible way that your EM counts can ever be adversely affected</strong>.
                </p>
              </div>

              {/* Features Grid */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    title: "In-House Installation",
                    icon: HomeIcon
                  },
                  {
                    title: "Fully Trained Personnel",
                    icon: UserGroupIcon
                  },
                  {
                    title: "Non-Trip Hazard",
                    icon: ExclamationTriangleIcon
                  },
                  {
                    title: "Totally Sealed Surface",
                    icon: LockClosedIcon
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-gray-50 border flex gap-3 items-center border-gray-200 rounded-lg p-4 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/60 group-hover:bg-primary flex items-center justify-center transition-colors duration-300">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-neutral-dark">
                        {feature.title}
                      </p>
                    </motion.div>
                  );
                })}
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

