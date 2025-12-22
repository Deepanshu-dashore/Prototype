'use client'

import { motion } from 'framer-motion'
import { 
  BeakerIcon,
  HeartIcon,
  BuildingOfficeIcon,
  CpuChipIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

export default function IndustriesGrid() {
  const industries = [
    { icon: HomeIcon, name: 'Nursing Homes' },
    { icon: CpuChipIcon, name: 'Semiconductor' },
    { icon: HeartIcon, name: 'Hospitals' },
    { icon: BeakerIcon, name: 'Pharma' },
    { icon: BeakerIcon, name: 'Life Science' },
    { icon: AcademicCapIcon, name: 'Schools/Public Entrances' },
    { icon: CpuChipIcon, name: 'Data Centres' },
    { icon: WrenchScrewdriverIcon, name: 'Medical Devices' },
  ]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-semibold text-neutral-dark mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            We understand your environment and provide tailored solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-neutral-light rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-neutral-dark/5"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-base font-display font-semibold text-neutral-dark">
                  {industry.name}
                </h3>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



