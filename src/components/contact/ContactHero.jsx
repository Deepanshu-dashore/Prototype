'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { trackPhoneClick, trackFormOpen } from '../../utils/analytics'
import { getAllProducts } from '@/src/utils/productsData'
import { useContactForm } from '../share/ContactFormContext'
import axios from 'axios'
import { useRef, useEffect } from 'react'

const countries = [
  { code: 'IE', flag: '🇮🇪', dialCode: '+353', name: 'Ireland' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44', name: 'United Kingdom' },
  { code: 'US', flag: '🇺🇸', dialCode: '+1', name: 'United States' },
  { code: 'CA', flag: '🇨🇦', dialCode: '+1', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', dialCode: '+61', name: 'Australia' },
  { code: 'DE', flag: '🇩🇪', dialCode: '+49', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', dialCode: '+33', name: 'France' },
  { code: 'ES', flag: '🇪🇸', dialCode: '+34', name: 'Spain' },
  { code: 'IT', flag: '🇮🇹', dialCode: '+39', name: 'Italy' },
  { code: 'NL', flag: '🇳🇱', dialCode: '+31', name: 'Netherlands' },
  { code: 'BE', flag: '🇧🇪', dialCode: '+32', name: 'Belgium' },
  { code: 'CH', flag: '🇨🇭', dialCode: '+41', name: 'Switzerland' },
  { code: 'AT', flag: '🇦🇹', dialCode: '+43', name: 'Austria' },
  { code: 'SE', flag: '🇸🇪', dialCode: '+46', name: 'Sweden' },
  { code: 'NO', flag: '🇳🇴', dialCode: '+47', name: 'Norway' },
  { code: 'DK', flag: '🇩🇰', dialCode: '+45', name: 'Denmark' },
  { code: 'FI', flag: '🇫🇮', dialCode: '+358', name: 'Finland' },
  { code: 'PL', flag: '🇵🇱', dialCode: '+48', name: 'Poland' },
  { code: 'IN', flag: '🇮🇳', dialCode: '+91', name: 'India' },
  { code: 'CN', flag: '🇨🇳', dialCode: '+86', name: 'China' },
]

export default function ContactHero() {
  const { openContactForm } = useContactForm()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const countryDropdownRef = useRef(null)
  const productDropdownRef = useRef(null)

  const allProducts = getAllProducts()
  const baseProducts = allProducts.map(product => product.title)
  const productOptions = [
    ...baseProducts,
    "Anti-fingerprint Mat - Portable",
    "Anti-fingerprint Mat - Heavy Duty",
    "Anti-fingerprint Mat - Custom Size"
  ]

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle country dropdown
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false)
      }
      // Handle product dropdown
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false)
      }
    }

    if (isCountryDropdownOpen || isProductDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCountryDropdownOpen, isProductDropdownOpen])

  const handlePhoneClick = () => {
    trackPhoneClick('contact_hero')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    const newErrors = {}
    if (!formData.name) newErrors.name = true
    if (!formData.email) newErrors.email = true
    if (!formData.phone) newErrors.phone = true
    if (!formData.product) newErrors.product = true
    if (!formData.message) newErrors.message = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Clear errors after 2 seconds
      setTimeout(() => setErrors({}), 2000)
      return
    }

    setIsSubmitting(true)
    trackFormOpen('contact_hero')

    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: `${selectedCountry.dialCode}${formData.phone.replace(/\s+/g, '')}`,
        product: formData.product,
        message: formData.message
      }

      await axios.post(process.env.GOOGLE_SHEET_URL,
        JSON.stringify(payload),
        {
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
        }
      )

      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', product: '', message: '' })
      console.log('Form submitted successfully to Google Sheets')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const shakeAnimation = {
    shake: {
      x: [0, -4, 4, -4, 4, 0],
      transition: { duration: 0.4 }
    }
  }

  return (
    <section className="relative bg-linear-to-b from-blue-50 via-gray-50 to-gray-100 py-16 sm:py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between py-2 lg:py-8"
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold text-neutral-dark mb-4 leading-[1.15]">
                  CC Matting Contact <br className="hidden sm:block" /> and Support
                </h1>
                <p className="text-lg lg:text-2xl font-bold text-primary mb-4 leading-snug">
                  Ireland's leading supplier of contamination control mats.
                </p>
                <p className="text-lg text-neutral-dark/70 leading-relaxed text-justify max-w-xl">
                  We provide innovative solutions for cleanrooms, critical environments, and high-traffic areas. Our polymeric matting technology ensures <span className="text-neutral-dark font-bold">99.9% particle retention</span>, protecting your critical areas from harmful contaminants.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-base text-neutral-dark/70 leading-relaxed max-w-xl">
                  Whether you're in healthcare, pharmaceuticals, or semiconductor manufacturing, our team is ready to help you find the perfect solution for your specific contamination control needs.
                </p>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 pt-8 space-y-6">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-dark/40 font-bold mb-1">Direct Line</p>
                  <span className="text-xl font-bold text-neutral-dark">
                    021 4701669
                  </span>
                </div>
                <a
                  href="tel:+353214701669"
                  onClick={handlePhoneClick}
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              <div className="border-t border-gray-200/60 pt-6">
                <p className="text-sm text-neutral-dark/50 leading-relaxed">
                  Alternatively, please fill in the contact form and our <br className="hidden lg:block" /> specialist team will be in touch within 24 hours.
                </p>
              </div>
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
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-8 sm:p-12 min-h-[500px] flex flex-col justify-center overflow-hidden">
              <h2 className="text-xl font-semibold text-neutral-dark mb-8">Contact Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email in Same Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    animate={errors.name ? 'shake' : ''}
                    variants={shakeAnimation}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-dark mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full h-[52px] px-4 bg-[#F9FAFB] border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all text-sm`}
                      placeholder="John Doe"
                    />
                  </motion.div>

                  <motion.div
                    animate={errors.email ? 'shake' : ''}
                    variants={shakeAnimation}
                  >
                    <label htmlFor="email" className="flex items-baseline gap-2y text-sm font-semibold text-neutral-dark mb-1">
                      Email (Work email)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full h-[52px] px-4 bg-[#F9FAFB] border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all text-sm`}
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  animate={errors.phone ? 'shake' : ''}
                  variants={shakeAnimation}
                >
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-dark mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 h-[52px] border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="text-sm text-neutral-dark font-medium">{selectedCountry.dialCode}</span>
                        <ChevronDownIcon className={`w-3.5 h-3.5 text-neutral-dark/40 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isCountryDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto w-64 p-1"
                          >
                            {countries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country)
                                  setIsCountryDropdownOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-primary/5 transition-colors text-left ${selectedCountry.code === country.code ? 'bg-primary/5 text-primary' : 'text-neutral-dark'
                                  }`}
                              >
                                <span className="text-lg">{country.flag}</span>
                                <span className="flex-1 font-medium">{country.name}</span>
                                <span className="text-neutral-dark/40 text-xs">{country.dialCode}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`flex-1 h-[52px] px-4 bg-[#F9FAFB] border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all text-sm`}
                      placeholder="Enter phone number"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={errors.product ? 'shake' : ''}
                  variants={shakeAnimation}
                >
                  <label htmlFor="product" className="block text-sm font-semibold text-neutral-dark mb-2">
                    Product Of Interest
                  </label>
                  <div className="relative" ref={productDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                      className={`w-full h-[52px] px-4 flex items-center justify-between bg-[#F9FAFB] border ${errors.product ? 'border-red-500' : 'border-gray-200'} rounded-lg focus-within:bg-white focus-within:rounded-xl focus-within:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus-within:border-primary outline-none transition-all text-sm text-left ${!formData.product ? 'text-neutral-dark/40' : 'text-neutral-dark'}`}
                    >
                      <span className="truncate">
                        {formData.product || 'Select a product'}
                      </span>
                      <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isProductDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto p-1.5 overflow-x-hidden"
                        >
                          {productOptions.map((product, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, product })
                                setIsProductDropdownOpen(false)
                                setErrors({ ...errors, product: false })
                              }}
                              className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg hover:bg-primary/5 transition-colors text-left ${formData.product === product ? 'bg-primary/5 text-primary font-semibold' : 'text-neutral-dark'
                                }`}
                            >
                              {product}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  animate={errors.message ? 'shake' : ''}
                  variants={shakeAnimation}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-dark mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full min-h-[100px] px-4 py-3 bg-[#F9FAFB] border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all resize-none text-sm`}
                    placeholder="Your message"
                  />
                </motion.div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center gap-2 bg-linear-to-b from-primary to-blue-700 text-white px-6 py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <PaperAirplaneIcon className="w-4 h-4 group-hover:translate-x-[3px] transition-transform" />
                  </button>
                </div>
              </form>

              {/* Success Overlay */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    className="absolute inset-0 z-20 bg-white/80 flex items-center justify-center p-6 text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-xs"
                    >
                      <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                          <CheckCircleIcon className="w-10 h-10 text-green-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-3">Message Received!</h3>
                      <p className="text-sm text-neutral-dark/60 leading-relaxed mb-6">
                        Thank you for your interest. Our specialist team will reach out to you <span className="text-primary font-semibold">within 7 working days</span>.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                      >
                        Dismiss
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



