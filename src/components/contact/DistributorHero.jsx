'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, ChevronDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { trackPhoneClick, trackFormOpen } from '../../utils/analytics'
import { getAllProducts } from '@/src/utils/productsData'
import { useContactForm } from '../share/ContactFormContext'
import axios from 'axios'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const countries = [
  {
    code: "IE", flag: "🇮🇪", dialCode: "+353", name: "Ireland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#5c9e31" d="M5 17h21v38H5z"></path>
      <path fill="#e27022" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "GB", flag: "🇬🇧", dialCode: "+44", name: "United Kingdom", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#fff" d="M40 28.856V32h10.181L67 21.691V17h-7.654z"></path>
      <path fill="#d22f27" d="M67 17h-3.827L40 31.203V32h3.482L67 17.586z"></path>
      <path fill="#fff" d="M59.347 55H67v-4.692L50.182 40H40v3.143z"></path>
      <path fill="#d22f27" d="M67 55v-2.347L46.355 40h-4.787l24.474 15z"></path>
      <path fill="#fff" d="M32 43.144V40H21.819L5 50.309V55h7.654z"></path>
      <path fill="#d22f27" d="M5 55h3.827L32 40.797V40h-3.482L5 54.414z"></path>
      <path fill="#fff" d="M12.653 17H5v4.692L21.818 32H32v-3.143z"></path>
      <path fill="#d22f27" d="M5 17v2.347L25.646 32h4.786L5.958 17z"></path>
      <path fill="#fff" d="M5 31h62v10H5z"></path>
      <path fill="#fff" d="M31 17h10v38H31z"></path>
      <path fill="#d22f27" d="M5 33h62v6H5z"></path>
      <path fill="#d22f27" d="M33 17h6v38h-6z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "US", flag: "🇺🇸", dialCode: "+1", name: "United States", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 17h62v5H5zm0 9h62v4H5zm0 8h62v4H5z"></path>
      <path fill="#1e50a0" d="M5 17h32v21H5z"></path>
      <path fill="#d22f27" d="M5 42h62v4H5z"></path>
      <circle cx={9.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={17.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={25.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={33.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={29.5} cy={26} r={1.75} fill="#fff"></circle>
      <circle cx={21.5} cy={26} r={1.75} fill="#fff"></circle>
      <circle cx={13.5} cy={26} r={1.75} fill="#fff"></circle>
      <circle cx={9.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={17.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={25.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={33.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={29.5} cy={34} r={1.75} fill="#fff"></circle>
      <circle cx={21.5} cy={34} r={1.75} fill="#fff"></circle>
      <circle cx={13.5} cy={34} r={1.75} fill="#fff"></circle>
      <path fill="#d22f27" d="M5 50h62v5H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "CA", flag: "🇨🇦", dialCode: "+1", name: "Canada", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 17h17v38H5zm45 0h17v38H50z"></path>
      <path fill="#d22f27" stroke="#d22f27" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M36 46v-5m0 0h6.8l-.8-2l4-4v-3h-3l-4 4v-7l-3-3m0 15h-6.8l.8-2l-4-4v-3h3l4 4v-7l3-3"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "AU", flag: "🇦🇺", dialCode: "+61", name: "Australia", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m54.233 38.945l.927-3l.927 3l-2.427-1.855l3 .001zM20.5 46.999l-1.558 1.477l.155-2.17L17 45.978l1.75-1.23l-1.057-1.886l2.028.637l.779-2.023l.779 2.023l2.028-.637l-1.057 1.886l1.75 1.23l-2.097.328l.155 2.17zm24-11.578l-1.113 1.055l.111-1.55L42 34.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55zm15-3l-1.113 1.055l.111-1.55L57 31.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55zm-8-6l-1.113 1.055l.111-1.55L49 25.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55zm0 21l-1.113 1.055l.111-1.55L49 46.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55z" strokeWidth={1.9}></path>
      <path fill="#fff" d="M9.887 18H6v2.332L32.113 36H36v-2.332z"></path>
      <path fill="#fff" d="M36 20.332V18h-3.887L6 33.668V36h3.887z"></path>
      <path fill="#fff" d="M6 24h30v6H6z"></path>
      <path fill="#fff" d="M18 18h6v18h-6z"></path>
      <path fill="#d22f27" d="M20 18h2v18h-2z"></path>
      <path fill="#d22f27" d="M6 26h30v2H6zm30 7.668L29.887 30H26l10 6zM36 18h-3.887L24 22.868V24h2zM6 20.332L12.113 24H16L6 18zM6 36h3.887L18 31.132V30h-2z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "DE", flag: "🇩🇪", dialCode: "+49", name: "Germany", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#f1b31c" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 30h62v12H5z"></path>
      <path d="M5 17h62v13H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "FR", flag: "🇫🇷", dialCode: "+33", name: "France", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#1e50a0" d="M5 17h21v38H5z"></path>
      <path fill="#d22f27" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "ES", flag: "🇪🇸", dialCode: "+34", name: "Spain", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#f1b31c" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M23 33v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7M5 17h62v9H5zm0 29h62v9H5z"></path>
      <path fill="#f1b31c" d="M19 33h4v4h-4z"></path>
      <circle cx={19} cy={37} r={1.5} fill="#6a462f"></circle>
      <path fill="none" stroke="#6a462f" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M27 33v9m-16-9v9m4-12a8.6 8.6 0 0 1 4-1m4 1a8.6 8.6 0 0 0-4-1m-4 4h8m0 0v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7m-5 9h2m14 0h2"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "IT", flag: "🇮🇹", dialCode: "+39", name: "Italy", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#5c9e31" d="M5 17h21v38H5z"></path>
      <path fill="#d22f27" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "NL", flag: "🇳🇱", dialCode: "+31", name: "Netherlands", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 17h62v13H5z"></path>
      <path fill="#fff" d="M5 30h62v12H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "BE", flag: "🇧🇪", dialCode: "+32", name: "Belgium", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fcea2b" d="M5 17h62v38H5z"></path>
      <path d="M5 17h21v38H5z"></path>
      <path fill="#d22f27" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "CH", flag: "🇨🇭", dialCode: "+41", name: "Switzerland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M17 17h38v38H17z"></path>
      <path fill="#fff" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} d="M47 32.462h-7.462V25h-7.076v7.462H25v7.076h7.462V47h7.076v-7.462H47z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h38v38H17z"></path>
    </svg>)
  },
  {
    code: "AT", flag: "🇦🇹", dialCode: "+43", name: "Austria", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 42h62v13H5zm0-25h62v13H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "SE", flag: "🇸🇪", dialCode: "+46", name: "Sweden", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#fcea2b" stroke="#fcea2b" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "NO", flag: "🇳🇴", dialCode: "+47", name: "Norway", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M5 17h62v38H5z"></path>
      <path fill="#1e50a0" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "DK", flag: "🇩🇰", dialCode: "+45", name: "Denmark", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M5 17h62v38H5z"></path>
      <path fill="#fff" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "FI", flag: "🇫🇮", dialCode: "+358", name: "Finland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#1e50a0" stroke="#1e50a0" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "PL", flag: "🇵🇱", dialCode: "+48", name: "Poland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 36h62v19H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "IN", flag: "🇮🇳", dialCode: "+91", name: "India", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#5c9e31" d="M5 17h62v38H5z"></path>
      <path fill="#e27022" d="M5 17h62v13H5z"></path>
      <path fill="#fff" d="M5 30h62v12H5z"></path>
      <path fill="none" stroke="#1e50a0" strokeLinecap="round" strokeLinejoin="round" d="M36.296 34.896L38 32.536l-1.192 2.656L39.464 34l-2.36 1.704L40 36l-2.896.296L39.464 38l-2.656-1.192L38 39.464l-1.704-2.36L36 40l-.296-2.896L34 39.464l1.192-2.656L32.536 38l2.36-1.704L32 36l2.896-.296L32.536 34l2.656 1.192L34 32.536l1.704 2.36L36 32z" strokeWidth={1.9}></path>
      <circle cx={36} cy={36} r={5} fill="none" stroke="#1e50a0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.9}></circle>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "CN", flag: "🇨🇳", dialCode: "+86", name: "China", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M5 17h62v38H5z"></path>
      <circle cx={24} cy={34} r={1.75} fill="#f1b31c"></circle>
      <circle cx={24} cy={24} r={1.75} fill="#f1b31c"></circle>
      <circle cx={28} cy={31} r={1.75} fill="#f1b31c"></circle>
      <circle cx={28} cy={26} r={1.75} fill="#f1b31c"></circle>
      <path fill="#f1b31c" stroke="#f1b31c" strokeLinecap="round" strokeLinejoin="round" d="m13.528 32.445l2.472-8l2.473 8L12 27.5h8z" strokeWidth={1.9}></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
];

export default function DistributorHero() {


  const handlePhoneClick = () => {
    trackPhoneClick("contact_hero");
  };




  const shakeAnimation = {
    shake: {
      x: [0, -4, 4, -4, 4, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative bg-linear-to-b from-blue-50 via-gray-50 to-gray-100 py-16 sm:py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col  py-2 lg:py-8"
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-700 mb-5 leading-[1.15] flex items-center gap-3">
                  Partner With{" "}
                  <span className="hidden sm:block text-primary">
                    {" "}
                    CCMatting
                  </span>
                </h1>
                <p className="text-lg lg:text-2xl font-semibold text-blue-900 mb-4 leading-snug  ">
                  A trusted global manufacturer of advanced contamination
                  control matting solutions.
                </p>
                <p className="text-lg text-neutral-dark/70 leading-relaxed  max-w-xl">
                  We provide innovative solutions for cleanrooms, critical
                  environments, and high-traffic areas. Our polymeric matting
                  technology ensures{" "}
                  <span className="text-neutral-dark font-bold">
                    Up to 99% particle retention
                  </span>
                  , protecting your critical areas from harmful contaminants.
                </p>
              </div>

              {/* <div className="space-y-4">
                <p className="text-base text-neutral-dark/70 leading-relaxed max-w-xl">
                  We design and manufacture high-performance polymeric contamination control mats for cleanrooms, pharmaceutical facilities, healthcare environments, and high-traffic industrial areas.

                  Our advanced matting technology delivers up to 99% particle retention, ensuring maximum protection for critical controlled environments.
                </p>
              </div> */}
            </div>
            <div className="flex flex-wrap gap-4 pt-2 mt-10">
              <Link
                href="/distributor/register"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                Become a Distributor
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/distributor/login"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                Distributor Login
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Form with Gradient Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gradient Background Box */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-100/50 via-primary/10 to-blue-50/50 rounded-2xl -z-10"></div>

            {/* Form Container */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 max-h-[450px] flex flex-col justify-center overflow-hidden">
              <Image src="/assets/products%20Page/havydutyGray.jpeg" height={500} width={400} className='w-full h-full' alt="distributor image" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



