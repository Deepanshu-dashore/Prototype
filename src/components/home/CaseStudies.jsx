'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import DotGrid from '../share/DotGrid'


export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imageErrors, setImageErrors] = useState({})

  const caseStudies = [
    {
      id: 1,
      count: 1,
      name: "Steven Dee",
      position: "Associate Scientist, Tech Services",
      company: "Gilead Sciences Ireland",
      img: "assets/Our Valuable Customers/asset 22.png",
      companyLogo: "assets/Our Valuable Customers/asset 22.png",
      quote: "Having a local company supply these products is great. Due to the nature of this business, things sometimes need to be turned around quickly and that's when companies like this are invaluable to organisations.",
      category: "Fast & Reliable Service",
      reviewImage: "/assets/Our Valuable Customers/gilead.png",
      zoomLogo: false
    },
    {
      id: 2,
      count: 2,
      name: "Majella O'Brien",
      position: "Aseptic Lead",
      company: "WuXi Vaccines",
      img: "assets/Our Valuable Customers/asset 19.png",
      companyLogo: "assets/Our Valuable Customers/asset 19.jpeg",
      quote: "Great product and excellent installation. CC Matting are a great business to work with. Brendan and his team were very approachable, helpful and informative even after installation. Would highly recommend them.",
      category: "Excellent Installation & Support",
      reviewImage: "/assets/Our Valuable Customers/wuxi.png",
      zoomLogo: true
    },
    {
      id: 3,
      count: 3,
      name: "Richard Keohane",
      position: "Facilities Engineer",
      company: "Stryker",
      img: "/images/clients/stryker.png",
      quote: "I found CC Matting to be very professional and well informed about their products. They provided ample training for my staff and check in periodically to see if anything is required and complete an annual check on their products. Very dependable company and would have no problem recommending them.",
      companyLogo: "assets/Our Valuable Customers/img12.jpg",
      category: "Professional & Dependable",
      reviewImage: "/assets/Our Valuable Customers/stryker.png",
      zoomLogo: false
    },
    {
      id: 4,
      count: 4,
      name: "Nigel Delaney",
      position: "Equipment Engineer",
      company: "Analog Devices",
      img: "/images/clients/analog-devices.png",
      quote: "Excellent communication and feedback from product selection to post install maintenance.",
      companyLogo: "assets/Our Valuable Customers/AnalogDevices.png",
      category: "Outstanding Customer Service",
      reviewImage: "/assets/Our Valuable Customers/analog-devices.png",
      zoomLogo: true
    },
    {
      id: 5,
      count: 5,
      name: "Colin Byrne",
      position: "Production Compliance Officer",
      company: "GE Healthcare",
      img: "/images/clients/ge-healthcare.png",
      quote: "Very efficient response to questions, pricing, quotations and installation.",
      companyLogo: "assets/Our Valuable Customers/asset 7.png",
      category: "Efficient & Responsive",
      reviewImage: "/assets/Our Valuable Customers/ge-healthcare.png",
      zoomLogo: true
    },
    {
      id: 6,
      count: 6,
      name: "Garreth O Donovan",
      position: "Utilities Engineer",
      company: "Biomarin",
      img: "/images/clients/biomarin.png",
      quote: "I found CC Matting very professional from start to finish of the installation of the mats.",
      companyLogo: "assets/Our Valuable Customers/asset 20.png",
      category: "Professional Installation",
      reviewImage: "/assets/Our Valuable Customers/biomarin.png",
      zoomLogo: false
    },
    {
      id: 7,
      count: 7,
      name: "Denis Dragoman",
      position: "GMP Lead",
      company: "Apleona / BMS",
      img: "/images/clients/apleona-bms.png",
      quote: "Brendan and Donal from CC Matting are always professional. Any issues or requests are dealt with urgency. Great products. Also to mention their input for Contamination Control Strategy requirements of EudraLex Annex 1. Great company to work with.",
      companyLogo: "assets/Our Valuable Customers/asset 23.png",
      category: "Strategic Compliance Support",
      reviewImage: "/assets/Our Valuable Customers/apleona-bms.png",
      zoomLogo: true
    }
  ];

  // Handle window resize for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-advance reviews
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex(prev => (prev + 1) % caseStudies.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [caseStudies.length, isPaused])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }

  // Animation variants for sliding
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8
    })
  }

  // Get current reviews to display
  const getCurrentReviews = () => {
    if (isMobile) {
      return [caseStudies[currentIndex]]
    }
    const reviews = []
    const prevIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length
    const nextIndex = (currentIndex + 1) % caseStudies.length
    reviews.push(caseStudies[prevIndex]) // Left card
    reviews.push(caseStudies[currentIndex]) // Center card
    reviews.push(caseStudies[nextIndex]) // Right card
    return reviews
  }

  return (
    <section id="case-studies" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Floating Background Icons */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#5360ff20"
          activeColor="#a4aef8"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 1.0 }}
          className="text-center mb-10 sm:mb-12 md:mb-5"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-neutral-dark mb-3 sm:mb-4">
            Our <span className="text-primary">Client Reviews</span>
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0">
            See what our satisfied customers have to say about our contamination control solutions.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 lg:-translate-x-8 z-20 bg-white hover:bg-primary text-neutral-dark hover:text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Previous reviews"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7"><g fill="none"><path fill="currentColor" d="M20 12.75a.75.75 0 0 0 0-1.5zm0-1.5H4v1.5h16z" opacity={0.4}></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10 6l-6 6l6 6"></path></g></svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 lg:translate-x-8 z-20 bg-white hover:bg-primary text-neutral-dark hover:text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Next reviews"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 transform rotate-180"><g fill="none"><path fill="currentColor" d="M20 12.75a.75.75 0 0 0 0-1.5zm0-1.5H4v1.5h16z" opacity={0.4}></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10 6l-6 6l6 6"></path></g></svg>
          </button>

          {/* Carousel Slides - 3 Cards with Center Highlight */}
          <div className="overflow-visible px-6 sm:px-12 lg:px-16 py-12">
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              {getCurrentReviews().map((review, idx) => {
                const isCenter = isMobile ? true : idx === 1
                return (
                  <motion.div
                    key={review.id}
                    initial={false}
                    animate={{
                      opacity: isCenter ? 1 : 0.75,
                      scale: isCenter ? 1.05 : 0.95,
                      y: isCenter ? -8 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className={`bg-gray-50 rounded-xl relative shadow-sm flex flex-col ${isCenter
                      ? 'p-5 sm:p-6 lg:p-8 w-full max-w-xs lg:max-w-md xl:max-w-lg z-10 shadow-xl border-2 border-primary/20'
                      : 'p-4 sm:p-5 lg:p-6 w-full max-w-[280px] sm:max-w-sm lg:max-w-md z-0 hover:opacity-90'
                      }`}
                    style={{
                      flex: isCenter ? '1.2' : '0.85',
                    }}
                  >
                    {/* Top: Stars Only */}
                    <div className={`flex justify-start gap-0.5 ${isCenter ? 'mb-3' : 'mb-2'}`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`text-amber-400 ${isCenter ? 'w-4 h-4' : 'w-3 h-3'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote Icon */}
                    <div className={`absolute right-2 top-2 ${isCenter ? '' : ''}`}>
                      <svg className={`text-gray-200 ${isCenter ? 'w-8 h-8' : 'w-6 h-6'
                        }`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Middle: Review Text */}
                    <div className="min-h-[80px] sm:min-h-[96px] mb-4">
                      <p className={`text-neutral-dark/75 leading-relaxed text-sm sm:text-base line-clamp-4`}>
                        "{review.quote}"
                      </p>
                    </div>

                    {/* Bottom: Company Logo + Company Name + Person Info */}
                    <div className={`flex items-start justify-between gap-4 mt-auto pt-3 border-t border-gray-100 ${isCenter ? '' : ''}`}>
                      {/* Left: Company Logo */}
                      <div className="shrink-0">
                        {(!review.companyLogo) ? (
                          <div className={`text-gray-700 font-semibold ${isCenter ? 'text-xs sm:text-sm' : 'text-xs'
                            }`}>
                            {review.company}
                          </div>
                        ) : (
                          <img
                            src={review.companyLogo}
                            alt={review.company}
                            className={`rounded-lg grayscale object-contain hover:grayscale-0 transition-all duration-300  ${isCenter ? 'w-12 h-12 sm:w-20 sm:h-20 grayscale-0'
                              : 'w-10 h-10 sm:w-16 sm:h-16'
                              }
                                ${review.zoomLogo && 'scale-140 ml-2'}
                                `}
                            onError={(e) => {
                              setImageErrors(prev => ({
                                ...prev,
                                [`${review.id}-img`]: true
                              }))
                            }}
                          />
                        )}
                      </div>

                      {/* Right: Person Name + Position */}
                      <div className="flex-1 min-w-0 text-right">
                        {/* <div className={`text-gray-700 font-semibold ${isCenter ? 'text-xs sm:text-sm' : 'text-xs'
                            }`}>
                            {review.company}
                          </div> */}
                        <div className="mt-1.5">
                          <h4 className={`font-bold text-neutral-dark truncate ${isCenter ? 'text-sm sm:text-sm' : 'text-xs sm:text-xs'
                            }`}>
                            {review.name}
                          </h4>
                          <p className={`text-neutral-dark/60 ${isCenter ? 'text-xs sm:text-sm' : 'text-xs'
                            }`}>
                            {review.position}
                          </p>
                        </div>
                      </div>
                    </div>



                  </motion.div>
                )
              })}
            </div>
          </div>


          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                  ? 'bg-primary w-8'
                  : 'bg-neutral-dark/20 hover:bg-neutral-dark/40 w-2'
                  }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

