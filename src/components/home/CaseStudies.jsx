'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  const caseStudies = [
    {
      "id": 1,
      "count": 1,
      "name": "Nigel Delaney",
      "position": "Equipment Engineer",
      "company": "Analog Devices",
      "img": "/images/clients/analog-devices.png",
      "quote": "Excellent communication and feedback from product selection to post install maintenance.",
      "companyLogo": "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Outstanding Customer Service"
    },
    {
      "id": 2,
      "count": 2,
      "name": "O'Reilly",
      "position": "Value Stream Leader",
      "company": "GEHC",
      "img": "/images/clients/gehc.png",
      "quote": "I have found CC Matting to be excellent to deal with. Extremely professional and their advice is honest and not just chasing sales. They have been flexible to meet production and audit schedules when required and this is much appreciated. I couldn't recommend Brendan and his team highly enough.",
      "companyLogo": "4https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Professional & Reliable Partnership"
    },
    {
      "id": 3,
      "count": 3,
      "name": "Scott Farmer",
      "position": "Assistant Facilities Manager",
      "company": "CBRE",
      "img": "/images/clients/cbre.png",
      "quote": "Great service, always responds to mails and phone calls, very clean install, would not hesitate to recommend service to any other pharma site.",
      "companyLogo": "2https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Efficient Installation Process"
    },
    {
      "id": 4,
      "count": 4,
      "name": "Colin Byrne",
      "position": "Production Compliance Officer",
      "company": "GE Healthcare",
      "img": "/images/clients/ge-healthcare.png",
      "quote": "Very efficient response to questions, pricing, quotations and installation.",
      "companyLogo": "9https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Quick Response Time"
    },
    {
      "id": 5,
      "count": 5,
      "name": "Helen Duffy",
      "position": "Operations Manager",
      "company": "BidvestNoonan",
      "img": "/images/clients/bidvestnoonan.png",
      "quote": "Have highly recommended CC Matting to colleagues",
      "companyLogo": "3https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Highly Recommended"
    },
    {
      "id": 6,
      "count": 6,
      "name": "Garreth O Donovan",
      "position": "Utilities Engineer",
      "company": "Biomarin",
      "img": "/images/clients/biomarin.png",
      "quote": "I found CC matting very professional from start to finish of the installation of the mats.",
      "companyLogo": "8https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Professional Installation"
    },
    {
      "id": 7,
      "count": 7,
      "name": "Vivienne Ahern",
      "position": "Assoc Manager Operations",
      "company": "Stryker",
      "img": "/images/clients/stryker.png",
      "quote": "Excellent service and aftercare provided by CCMatting. Both Brendan and Donal are a pleasure to deal with. We look forward to working with them and using their high quality products again in the future",
      "companyLogo": "7https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Excellent Aftercare Service"
    },
    {
      "id": 8,
      "count": 8,
      "name": "Richard Keohane",
      "position": "Facilities Engineer",
      "company": "STRYKER",
      "img": "/images/clients/stryker.png",
      "quote": "I found CC Matting to be very professional and well informed about their products. They provided ample training for my staff and check in periodically to see if anything is required and complete an annual check on their products. Very dependable company and would have no problem in recommending them to other companies.",
      "companyLogo": "1https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Comprehensive Support & Training"
    },
    {
      "id": 9,
      "count": 9,
      "name": "Steven Dee",
      "position": "Associate Scientist, Tech Services",
      "company": "GILEAD SCIENCES IRELAND",
      "img": "/images/clients/gilead.png",
      "quote": "Having a local company supply these products is great, due to the nature of this business, things sometimes need to be turned around quickly and thats when companies like this are invaluable to organisations.",
      "companyLogo": "6https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Fast Turnaround & Local Support"
    },
    {
      "id": 10,
      "count": 10,
      "name": "Denis Dragoman",
      "position": "GMP Lead",
      "company": "Apleona/ BMS",
      "img": "/images/clients/bms.png",
      "quote": "Brendan and Donal from CC Matting are always professional, any issues or requests are always dealt with urgency. Great products. Also to mention their input for Contamination Control Strategy requirements of EudraLex Annex 1. Great company to work with.",
      "companyLogo": "5https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Regulatory Compliance Expertise"
    },
    {
      "id": 11,
      "count": 11,
      "name": "Colm Moynihan",
      "position": "Project Ops lead",
      "company": "DePuy Synthes",
      "img": "/images/clients/depuy.png",
      "quote": "Top quality. Efficient. Great after sales service.",
      "companyLogo": "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp",
      "category": "Top Quality Products"
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }

  // Get current 3 reviews to display (previous, current, next)
  const getCurrentReviews = () => {
    const reviews = []
    const prevIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length
    const nextIndex = (currentIndex + 1) % caseStudies.length
    reviews.push(caseStudies[prevIndex]) // Left card
    reviews.push(caseStudies[currentIndex]) // Center card
    reviews.push(caseStudies[nextIndex]) // Right card
    return reviews
  }

  return (
    <section id="case-studies" className="bg-gray-100 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-neutral-dark mb-3 sm:mb-4">
            Our <span className="text-primary">Client Reviews</span>
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0">
            See what our satisfied customers have to say about our contamination control solutions.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 lg:-translate-x-8 z-20 bg-white hover:bg-primary text-neutral-dark hover:text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Previous reviews"
          >
            <ChevronLeftIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 lg:translate-x-8 z-20 bg-white hover:bg-primary text-neutral-dark hover:text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Next reviews"
          >
            <ChevronRightIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Carousel Slides - 3 Cards with Center Highlight */}
          <div className="overflow-hidden px-4 sm:px-8 lg:px-12 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4"
              >
                {getCurrentReviews().map((review, idx) => {
                  const isCenter = idx === 1
                  return (
                    <motion.div
                      key={`${review.id}-${idx}`}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.75,
                        scale: isCenter ? 1.0 : 0.9,
                        y: 0
                      }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`bg-white rounded-xl relative shadow-sm flex flex-col transition-all duration-500 ${isCenter
                          ? 'p-4 sm:p-5 lg:p-6 w-full max-w-xs lg:max-w-sm xl:max-w-md z-10 shadow-md border border-gray-100'
                          : 'p-4 sm:p-5 lg:p-6 w-full max-w-[240px] sm:max-w-xs lg:max-w-sm z-0 hover:shadow-lg'
                        }`}
                      style={{
                        flex: isCenter ? '1.1' : '0.9',
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
                          {(!review.img || imageErrors[`${review.id}-img`]) ? (
                             <div className={`text-gray-700 font-semibold ${isCenter ? 'text-xs sm:text-sm' : 'text-xs'
                             }`}>
                             {review.company}
                           </div>
                          ) : (
                            <img
                              src={review.img}
                              alt={review.company}
                              className={`rounded-lg object-contain grayscale hover:grayscale-0 transition-all duration-300 border border-gray-200/50 ${isCenter ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 sm:w-12 sm:h-12'
                                }`}
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
              </motion.div>
            </AnimatePresence>
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

