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
import Link from 'next/link'

export default function QuickBenefitsStrip() {
  const certifications = [
    {
      icon: ShieldCheckIcon,
      title: 'CE Marking',
      description: 'European Conformity certification ensuring our products meet EU safety, health, and environmental protection standards.',
      badges: ['EU Certified']
    },
    {
      icon: SparklesIcon,
      title: 'No VOCs',
      description: 'Completely free from Volatile Organic Compounds, ensuring safe indoor air quality and environmental responsibility.',
      badges: ['VOC-Free', 'Eco-Friendly']
    },
    {
      icon: DocumentCheckIcon,
      title: 'BPR–EPA Compliant',
      description: 'Fully compliant with Biocidal Products Regulation and Environmental Protection Agency standards for safety and efficacy.',
      badges: ['BPR Compliant', 'EPA Approved']
    },
    {
      icon: BeakerIcon,
      title: 'Particulate Study Results',
      description: 'Scientifically validated through rigorous particulate contamination studies, proving 99.9% effectiveness.',
      badges: ['Lab Tested', '99.9% Effective']
    },
    {
      icon: CheckBadgeIcon,
      title: 'ISO Certified',
      description: 'ISO 9001:2015 (Quality Management) and ISO 45001:2018 (Occupational Health & Safety) certified operations.',
      badges: ['ISO 9001:2015', 'ISO 45001:2018']
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Quality Assurance',
      description: 'Comprehensive quality control processes ensuring consistent performance and reliability across all products.',
      badges: ['QA Verified']
    },
    {
      icon: AcademicCapIcon,
      title: 'Industry Leading',
      description: 'Recognized as industry leaders in contamination control technology with proven track record.',
      badges: ['Industry Leader']
    },
    {
      icon: StarIcon,
      title: 'Premium Materials',
      description: 'Advanced high-tech polymer construction delivering superior durability and contamination control performance.',
      badges: ['Premium Grade']
    },
    {
      icon: TrophyIcon,
      title: '2 Year Warranty',
      description: 'All products backed by comprehensive 2-year replacement warranty for complete peace of mind.',
      badges: ['Guaranteed', '2 Years']
    },
  ]

  return (
    <section id="features" className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-neutral-dark mb-3 sm:mb-4">
            What sets <span className="text-primary">CCMatting</span> apart
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-3xl mx-auto px-4 sm:px-0">
            Technically superior designs that redefine contamination control standards.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 max-w-7xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group p-6 sm:p-6 rounded-2xl border border-neutral-200 hover:border-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                {/* Enhanced Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary mb-6 group-hover:scale-110 group-hover:from-primary group-hover:to-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  <Icon className="w-8 h-8" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-lg xl:text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed mb-6 flex-grow">
                  {cert.description}
                </p>

                {/* Multiple Badges */}
                <div className="mt-auto flex flex-wrap justify-center gap-2">
                  {cert.badges.map((badge, i) => (
                    <span key={i} className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-white shadow-sm shadow-primary/20">
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



