'use client'

import { motion } from 'framer-motion'
import {
  BeakerIcon,
  HeartIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  ServerIcon,
  GlobeAmericasIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

export default function IndustrySolutions() {
  const industries = [
    {
      icon: BeakerIcon,
      title: 'PHARMACEUTICAL',
      description: 'Minimise particulate ingress and maintain GMP compliance.',
      image: '/assets/industries/pharmaceutical.png',
      href: '/industries/pharmaceutical-industry'
    },
    {
      icon: HeartIcon, // Or a medical kit icon if available, Heart is okay for medical
      title: 'MEDICAL DEVICES',
      description: 'Protect sensitive manufacturing environments from contamination.',
      image: '/assets/industries/medical-devices.png',
      href: '/industries/medical-devices'
    },
    {
      icon: CpuChipIcon,
      title: 'SEMICONDUCTOR',
      description: 'Keeping your precious products safe from contamination.',
      image: '/assets/industries/semiconductor.png',
      href: '/industries/semi-conductor'
    },
    {
      icon: ServerIcon,
      title: 'DATA CENTRES',
      description: 'Prevent dust and particulate from affecting sensitive equipment.',
      image: '/assets/industries/data-centres.png',
      href: '/industries/data-centres'
    },
    {
      icon: BuildingOffice2Icon,
      title: 'HOSPITALS',
      description: 'Protecting staff & patients with infection control solutions.',
      image: '/assets/industries/hospitals.png',
      href: '/industries/hospitals'
    },
    {
      icon: BeakerIcon, // Using Beaker for Lab as well, matches context
      title: 'LABORATORY SETTINGS',
      description: 'Maintain sterile conditions in research and development labs.',
      image: '/assets/industries/life_science_lab_1763625546556.png',
      href: '/industries/life-science'
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'AUTOMOTIVE',
      description: 'Ensure pristine paint finishes and dust-free assembly lines.',
      image: '/assets/industries/automotive.png',
      href: '/industries/automotive'
    },
    {
      icon: GlobeAmericasIcon, // Represents global travel/aerospace
      title: 'AVIATION',
      description: 'Critical contamination control for aerospace assembly and maintenance.',
      image: '/assets/industries/aviation.png',
      href: '/industries/aviation'
    },
  ]

  return (
    <section id="industries" className="bg-neutral-50 py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-dark mb-6">
            Who Are They <span className="text-primary">Suitable For?</span>
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
            Our range of contamination control mats are suitable for any organisation or business looking to reduce/eliminate the risk of floor level contaminants entering their critical area.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon || BuildingOfficeIcon
            return (
              <Link
                key={industry.title}
                href={industry.href}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 overflow-hidden h-full flex flex-col cursor-pointer"
                >
                  {/* Image Area */}
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/0 transition-colors duration-300 z-10" />
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="relative flex-1 p-6 pt-8 z-20">
                    <div className="absolute -top-6 right-6 z-30">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-dark mb-2 group-hover:text-primary transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-sm text-neutral-dark/70 leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

