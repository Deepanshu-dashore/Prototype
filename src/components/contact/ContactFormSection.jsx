'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { DocumentTextIcon, ArrowRightIcon, BuildingOffice2Icon, HeartIcon, CpuChipIcon, BeakerIcon, GlobeAmericasIcon, AcademicCapIcon, ServerIcon, WrenchScrewdriverIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { industries } from '../../utils/industriesData'

// Icon mapping
const iconMap = {
  'nursing-homes': HeartIcon,
  'semi-conductor': CpuChipIcon,
  'hospitals': BuildingOffice2Icon,
  'pharmaceutical-industry': BeakerIcon,
  'life-science': GlobeAmericasIcon,
  'schools-public-entrances': AcademicCapIcon,
  'data-centres': ServerIcon,
  'medical-devices': WrenchScrewdriverIcon,
}

export default function ContactFormSection() {
  const [duplicatedIndustries, setDuplicatedIndustries] = useState([])

  useEffect(() => {
    // Duplicate industries for seamless loop
    const allIndustries = industries.map(industry => ({
      ...industry,
      icon: iconMap[industry.slug] || BuildingOffice2Icon
    }))
    setDuplicatedIndustries([...allIndustries, ...allIndustries, ...allIndustries])
  }, [])

  return (
    <>
      {/* Technical Support & Documentation Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left Section - Badge + Heading */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-dark font-medium">
                  TECHNICAL SUPPORT
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark leading-tight">
                Need Technical Documentation?
              </h2>
            </div>

            {/* Right Section - Description + Button */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                Access comprehensive technical documentation, data sheets, and specifications for all our products.
              </p>
              <Link
                href="/technical"
                className="inline-flex items-center gap-2 bg-primary/80 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary transition-all duration-300 group"
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span>View Technical Documents</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CTA Header - Same style as Technical Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16"
          >
            {/* Left Section - Badge + Heading */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-dark font-medium">
                  INDUSTRY SOLUTIONS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark leading-tight">
                Explore Our Industry Solutions
              </h2>
            </div>

            {/* Right Section - Description + Button */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                Discover how our contamination control solutions are tailored for different industries and critical environments.
              </p>
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 bg-primary/80 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary transition-all duration-300 group"
              >
                <BuildingOffice2Icon className="w-5 h-5" />
                <span>Explore Industries</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Continuous Loop Carousel */}
          <div className="overflow-hidden relative">
            <div 
              className="flex gap-6 animate-scroll"
              style={{ width: 'max-content' }}
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {duplicatedIndustries.map((industry, index) => {
                const Icon = industry.icon
                const displayTitle = industry.title.replace('Contamination Control Mats for ', '')
                return (
                  <Link
                    key={`${industry.slug}-${index}`}
                    href={`/industries/${industry.slug}`}
                    className="shrink-0 w-fit bg-white rounded-xl border border-gray-200 p-3 py-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Industry Name */}
                    <h3 className="text-base text-nowrap font-bold flex gap-2 items-center text-neutral-dark/90 group-hover:text-primary transition-colors line-clamp-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      {displayTitle}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}



