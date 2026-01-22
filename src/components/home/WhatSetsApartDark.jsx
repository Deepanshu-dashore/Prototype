'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export default function WhatSetsApartDark() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Global section transforms for perfect sync
  const opacityGrid = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const yGrid = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50])

  const certifications = [
    {
      icon: ShieldCheckIcon,
      title: 'CE Marking',
      description: 'European Conformity certification ensuring our products meet EU safety, health, and environmental protection standards.',
    },
    {
      icon: SparklesIcon,
      title: 'No VOCs',
      description: 'Completely free from Volatile Organic Compounds, ensuring safe indoor air quality and environmental responsibility.',
    },
    {
      icon: DocumentCheckIcon,
      title: 'BPR–EPA Compliant',
      description: 'Fully compliant with Biocidal Products Regulation and Environmental Protection Agency standards for safety and efficacy.',
    },
    {
      icon: ChartBarIcon,
      title: 'Particulate Study Results',
      description: 'Scientifically validated through rigorous particulate contamination studies, proving 99.9% effectiveness.',
    },
    {
      icon: CheckBadgeIcon,
      title: 'ISO Certified',
      description: 'ISO 9001:2015 (Quality Management) and ISO 45001:2018 (Occupational Health & Safety) certified operations.',
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Quality Assurance',
      description: 'Comprehensive quality control processes ensuring consistent performance and reliability across all products.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Industry Leading',
      description: 'Recognized as industry leaders in contamination control technology with proven track record.',
    },
    {
      icon: StarIcon,
      title: 'Premium Materials',
      description: 'Advanced high-tech polymer construction delivering superior durability and contamination control performance.',
    },
    {
      icon: TrophyIcon,
      title: '2 Year Warranty',
      description: 'All products backed by comprehensive 2-year replacement warranty for complete peace of mind.',
    },
  ]

  return (
    <section ref={containerRef} className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gray-50">
      {/* Geometric floating shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Large circle - top left */}
        <motion.div 
          className="absolute -top-32 left-10 w-80 h-80 rounded-full bg-blue-200/25"
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Medium circle - top right */}
        <motion.div 
          className="absolute -top-32 right-20 w-64 h-64 rounded-full bg-blue-200/20"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Small circle - bottom */}
        <motion.div 
          className="absolute -bottom-20 left-1/3 w-48 h-48 rounded-full bg-indigo-200/20"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional accent circle */}
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-primary/15"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Decorative dots pattern */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-40">
          <div className="grid grid-cols-6 gap-3">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            ))}
          </div>
        </div>
        

        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/20 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <motion.div
          style={{ opacity: opacityGrid, y: yGrid }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-3">
            What sets <span className="text-primary">CCMatting</span> apart
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-3xl mx-auto">
            Technically superior designs that redefine contamination control standards.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: opacityGrid, y: yGrid }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon

            return (
              <div
                key={cert.title}
                className="relative group overflow-hidden flex items-center justify-between p-5 sm:p-6 border group border-gray-200 rounded-2xl bg-white shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                {/* Content - Preserving Design */}
                <div className="flex-1 min-w-0 pr-4 group-hover:z-50">
                  <h3 className="text-lg sm:text-xl font-semibold transition-colors group-hover:text-white text-neutral-900 mb-1.5">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm transition-colors group-hover:text-white/80 text-neutral-700 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Icon area - Preserving Design */}
                <div className="relative shrink-0">
                  <div className="absolute group-hover:-left-1/2 group-hover:z-0 group-hover:-top-1/2 group-hover:scale-500 group-hover:-translate-x-1/2  transition-all group-hover:bg-linear-to-br to-primary from-indigo-500 duration-600 group-hover:-translate-y-3 inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl group-hover:bg-white group-hover:text-indigo-700 bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

