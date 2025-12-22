'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  BeakerIcon,
  DocumentCheckIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export default function WhatSetsApartDark() {
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
      icon: BeakerIcon,
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
      icon: AcademicCapIcon,
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
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-3">
            What sets <span className="text-primary">CCMatting</span> apart
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-3xl mx-auto">
            Technically superior designs that redefine contamination control standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex gap-4 p-6 border group border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all duration-300 bg-white"
              >
                {/* Icon */}
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/60 duration-300 transition-all group-hover:bg-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-dark mb-2 leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

