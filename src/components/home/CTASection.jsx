'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function CTASection() {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-2 sm:mb-3">
            Get in <span className="text-primary">touch</span>
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-2xl mx-auto">
            Contact us today to discover how our contamination control solutions can benefit your facility.
          </p>
        </motion.div>

        {/* Two Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Distributor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
          >
            <div className="flex flex-col sm:flex-row h-full">
              {/* Image Left Side */}
              <div className="relative w-full sm:w-2/5 h-40 sm:h-full min-h-[160px] overflow-hidden bg-neutral-50">
                <Image
                  src="/assets/contactSectionHome/service.png"
                  alt="Distributor Services"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content Right Side */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-dark mb-2 sm:mb-3">
                    Become a Distributor
                  </h3>
                  <p className="text-neutral-dark/70 text-xs sm:text-sm mb-4">
                    Partner with us to bring premium contamination control solutions to your market.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors duration-200 text-xs sm:text-sm min-h-[40px] w-full sm:w-auto"
                >
                  <span>Click here if you are a distributor</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Installation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
          >
            <div className="flex flex-col sm:flex-row h-full">
              {/* Image Left Side */}
              <div className="relative w-full sm:w-2/5 h-40 sm:h-full min-h-[160px] overflow-hidden bg-neutral-50">
                <Image
                  src="/assets/aboutHomeSection/mat-installation-new.png"
                  alt="Professional Installation"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content Right Side */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-dark mb-2 sm:mb-3">
                    Install CCMats 
                  </h3>
                  <p className="text-neutral-dark/70 text-xs sm:text-sm mb-4">
                    Get professional installation services for CC Matting solutions tailored to your needs.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors duration-200 text-xs sm:text-sm min-h-[40px] w-full sm:w-auto"
                >
                  <span>Click here if you would like to install CCMats at your facility</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
