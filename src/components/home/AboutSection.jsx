'use client'

import { motion } from 'framer-motion'
import {
  CheckBadgeIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="bg-linear-to-br relative from-primary/10 via-white to-accent/20 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm my-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-bold text-neutral-600 uppercase tracking-wider">
                Quality Standards
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-neutral-dark mb-4 sm:mb-6">
              Engineered With Superior Quality Materials For <span className="text-primary">Lasting Durability</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-neutral-dark/70 leading-relaxed text-sm sm:text-base">
              <p>
                Our contamination control mats are manufactured using advanced polymer technology, ensuring exceptional performance and longevity. Each mat undergoes rigorous quality testing to meet the highest industry standards for cleanroom environments.
              </p>
            </div>

            {/* Bullet points with star icons */}
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-2 sm:gap-3">
                <div className='w-4 h-4 sm:w-5 sm:h-5 bg-linear-to-br from-purple-100 via-blue-100 to-blue-500/10 rounded-full mt-0.5 flex items-center justify-center shrink-0'>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-linear-to-br from-blue-100 via-primary/60 to-blue-900 rounded-full" ></div>
                </div>
                <span className="text-sm sm:text-base text-neutral-dark/80">Advanced multi-layer polymer construction</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className='w-4 h-4 sm:w-5 sm:h-5 bg-linear-to-br from-purple-100 via-blue-100 to-primary/10 rounded-full mt-0.5 flex items-center justify-center shrink-0'>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-linear-to-br from-blue-100 via-primary/60 to-blue-900 rounded-full" ></div>
                </div>
                <span className="text-sm sm:text-base text-neutral-dark/80">Superior adhesive technology for maximum particle capture</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <div className='w-4 h-4 sm:w-5 sm:h-5 bg-linear-to-br from-purple-100 via-blue-100 to-primary/10 rounded-full mt-0.5 flex items-center justify-center shrink-0'>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-linear-to-br from-blue-100 via-primary/60 to-blue-900 rounded-full" ></div>
                </div>
                <span className="text-sm sm:text-base text-neutral-dark/80">Eco-friendly materials with recyclable components</span>
              </li>
            </ul>

            <a href="#products" className="btn-primary py-2.5 px-5 sm:py-3 sm:px-6 inline-flex items-center gap-2 text-sm sm:text-base">
              Learn More
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Right: 2x2 Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-3 sm:gap-4 order-1 lg:order-2"
          >
            <div className='row-1 flex flex-col gap-3 sm:gap-4 flex-1'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src="/assets/aboutHomeSection/mat-closeup-new.png"
                  alt="Close-up view of contamination control mat showing texture and construction"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-40 sm:h-48 md:h-56 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src="/assets/aboutHomeSection/mat-detail-new.png"
                  alt="Detailed view of mat surface capturing particles"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
            <div className='row-2 flex flex-col gap-3 sm:gap-4 flex-1'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-40 sm:h-48 md:h-56 mt-6 sm:mt-8 md:mt-10 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src="/assets/aboutHomeSection/mat-installation-new.png"
                  alt="Contamination control mat installed in cleanroom environment"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src="/assets/aboutHomeSection/mat-quality-new.png"
                  alt="Quality testing and inspection of contamination control mats"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100" height="228" viewBox="0 0 107 235" className="absolute -bottom-16 right-16 rotate-90 opacity-40">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectangle_1121" data-name="Rectangle 1121" width="107" height="235" transform="translate(1259 2995)" fill="#fff" />
          </clipPath>
        </defs>
        <g id="Mask_Group_1" data-name="Mask Group 1" transform="translate(-1259 -2995)" clipPath="url(#clip-path)">
          <g id="Group_1506" data-name="Group 1506" transform="translate(2339.953 2726.896)">
            <path id="Path_732" data-name="Path 732" d="M-1058.737,404.883l55.9-96.825,55.9,96.825Z" transform="translate(-10.015 -17.873)" fill="#7a66eaff" />
            <path id="Path_733" data-name="Path 733" d="M-925.325,284.63l-18.9,32.743-18.9-32.743Z" transform="translate(-52.784 -7.393)" fill="#4266baff" />
            <path id="Path_734" data-name="Path 734" d="M-778.4,268.1l-.5,35.2-30.239-18.033Z" transform="translate(-121.674 0)" fill="#5d529e" />
            <path id="Path_735" data-name="Path 735" d="M-1025.811,333.3l-27.657,47.9-27.657-47.9Z" transform="translate(0 -29.164)" fill="#425ebaff" />
            <path id="Path_736" data-name="Path 736" d="M-777.405,483.257l-39.52,68.451-39.519-68.451Z" transform="translate(-100.509 -96.247)" fill="#546df9ff" />
            <path id="Path_737" data-name="Path 737" d="M-848.915,359.394l-39.519,68.454-39.52-68.454Z" transform="translate(-68.519 -40.838)" fill="#cc9dfaff" />
            <path id="Path_738" data-name="Path 738" d="M-920.417,483.257l-39.52,68.451-39.521-68.451Z" transform="translate(-36.533 -96.247)" fill="#3a06f4ff" />
            <path id="Path_739" data-name="Path 739" d="M-708.3,424.852l-11.957,20.711-11.957-20.711Z" transform="translate(-156.082 -70.12)" fill="#301b84" />
            <path id="Path_740" data-name="Path 740" d="M-970.069,605.285l-14.448,25.025-14.447-25.025Z" transform="translate(-36.754 -150.836)" />
            <path id="Path_741" data-name="Path 741" d="M-967.523,607.956l61.392-106.335,61.392,106.335Z" transform="translate(-50.819 -104.462)" fill="#7761e2ff" />
            <path id="Path_742" data-name="Path 742" d="M-856.445,427.848l39.519-68.454,39.52,68.454Z" transform="translate(-100.509 -40.838)" fill="#331e7e" />
            <path id="Path_743" data-name="Path 743" d="M-769.383,583.278l18.194-31.513L-733,583.278Z" transform="translate(-139.455 -126.894)" fill="#3eb0acff" />
            <path id="Path_744" data-name="Path 744" d="M-1028.972,562.038l15.365-26.614,15.365,26.614Z" transform="translate(-23.33 -119.584)" />
            <path id="Path_745" data-name="Path 745" d="M-703.822,359.595l9.123-15.8,9.123,15.8Z" transform="translate(-168.783 -33.859)" fill="#ae3844" />
          </g>
        </g>
      </svg>

    </section>
  )
}



