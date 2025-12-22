'use client'

import { useState, useRef, useEffect } from 'react'
import { XMarkIcon, HomeIcon, ClockIcon, PaperAirplaneIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { trackFormSubmit } from '../../utils/analytics'

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

export default function ContactForm({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Default to Ireland
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const countryDropdownRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    
    // Track form submission
    trackFormSubmit('contact_modal', {
      phone: formData.phone,
    })
    
    // Reset form
    setFormData({ name: '', email: '', phone: selectedCountry.dialCode, message: '' })
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
    // Update phone input with new country code prefix
    const currentPhone = formData.phone.replace(/^\+\d+\s*/, '')
    setFormData({
      ...formData,
      phone: currentPhone ? `${country.dialCode} ${currentPhone}` : country.dialCode
    })
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // If user starts typing without country code, add it
    if (!value.startsWith(selectedCountry.dialCode)) {
      // Remove any existing country code and add the selected one
      const phoneNumber = value.replace(/^\+\d+\s*/, '')
      setFormData({
        ...formData,
        phone: phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : selectedCountry.dialCode
      })
    } else {
      setFormData({
        ...formData,
        phone: value
      })
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false)
      }
    }

    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCountryDropdownOpen])

  // Initialize phone with country code when form opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => {
        // Only set if phone is empty or doesn't start with a country code
        if (!prev.phone || !prev.phone.match(/^\+\d+/)) {
          return {
            ...prev,
            phone: selectedCountry.dialCode
          }
        }
        return prev
      })
    }
  }, [isOpen, selectedCountry.dialCode])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
            aria-hidden="true"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-neutral-dark/10 px-4 py-3 flex items-center justify-between shrink-0 z-10">
                <h2 id="contact-form-title" className="text-lg font-display font-semibold text-neutral-dark">
                  Contact Us
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-neutral-light rounded-lg transition-colors"
                  aria-label="Close contact form"
                >
                  <XMarkIcon className="w-5 h-5 text-neutral-dark" aria-hidden="true" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto relative">
                {/* Double Color Background - 3/4 accent, 1/4 white */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(9, 31, 208, 0.1) 0%, rgba(9, 31, 208, 0.1) 75%, white 75%, white 100%)' }} />
                
                {activeTab === 'home' && (
                  <div className="relative p-3 lg:p-4">
                    <div className="bg-white rounded-lg shadow-sm border border-neutral-dark/10 p-4 lg:p-5">
                      {/* Instruction Text at Top */}
                      <p className="text-xs text-neutral-dark/70 mb-4">
                        Please fill out the form below and we will get back to you as soon as possible.
                      </p>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name *"
                            className="w-full px-3 py-2.5 text-sm border border-neutral-dark/15 rounded-lg bg-white text-neutral-dark placeholder:text-neutral-dark/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        
                        <div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5">
                            <div className="relative" ref={countryDropdownRef}>
                              <button
                                type="button"
                                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 px-2 sm:px-2 py-2.5 text-sm border border-neutral-dark/15 rounded-lg bg-neutral-light/50 hover:bg-neutral-light transition-colors min-w-[75px] sm:min-w-[85px] w-full sm:w-auto"
                              >
                                <span className="text-base">{selectedCountry.flag}</span>
                                <span className="text-xs text-neutral-dark font-medium">{selectedCountry.dialCode}</span>
                                <ChevronDownIcon className={`w-3.5 h-3.5 text-neutral-dark/60 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                              </button>
                              
                              <AnimatePresence>
                                {isCountryDropdownOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-1 bg-white border border-neutral-dark/15 rounded-lg shadow-lg z-50 max-h-56 overflow-y-auto w-56 sm:w-56"
                                  >
                                    {countries.map((country) => (
                                      <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => handleCountrySelect(country)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-light/50 transition-colors text-left ${
                                          selectedCountry.code === country.code ? 'bg-primary/5' : ''
                                        }`}
                                      >
                                        <span className="text-base">{country.flag}</span>
                                        <span className="text-xs text-neutral-dark font-medium flex-1">{country.name}</span>
                                        <span className="text-xs text-neutral-dark/60">{country.dialCode}</span>
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
                              required
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              placeholder="Phone *"
                              className="flex-1 px-3 py-2.5 text-sm border border-neutral-dark/15 rounded-lg bg-white text-neutral-dark placeholder:text-neutral-dark/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full sm:w-auto"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email *"
                            className="w-full px-3 py-2.5 text-sm border border-neutral-dark/15 rounded-lg bg-white text-neutral-dark placeholder:text-neutral-dark/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        
                        <div>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message *"
                            className="w-full px-3 py-2.5 text-sm border border-neutral-dark/15 rounded-lg bg-white text-neutral-dark placeholder:text-neutral-dark/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
                          />
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cta text-white text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transform transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          <PaperAirplaneIcon className="w-4 h-4" />
                          <span>Submit</span>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                
                {activeTab === 'history' && (
                  <div className="relative p-4 lg:p-5">
                    <div className="bg-white rounded-lg shadow-sm border border-neutral-dark/10 p-6 lg:p-8">
                      <div className="flex flex-col items-center justify-center py-8 lg:py-12">
                        <div className="relative mb-6">
                          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto">
                            <ClockIcon className="w-10 h-10 text-primary/40" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-accent/40"></div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                          No Chat History
                        </h3>
                        <p className="text-sm text-neutral-dark/60 text-center max-w-xs mb-6 leading-relaxed">
                          Your conversation history will appear here once you start chatting with us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => setActiveTab('home')}
                            className="px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                          >
                            Start New Conversation
                          </button>
                          <button
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-lg border border-neutral-dark/20 text-neutral-dark text-sm font-medium hover:bg-neutral-light transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Bottom Tab Navigation Footer Bar */}
              <div className="bg-white border-t border-neutral-dark/10 rounded-b-xl shrink-0 shadow-[0_-1px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center">
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-3 transition-all duration-200 relative ${
                      activeTab === 'home'
                        ? 'text-primary'
                        : 'text-neutral-dark/60 hover:text-neutral-dark'
                    }`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-200 ${
                      activeTab === 'home' ? 'bg-primary' : 'bg-transparent'
                    }`} />
                    <HomeIcon className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
                    <span className="text-[10px] font-semibold">Home</span>
                  </button>
                  <div className="w-px h-6 bg-neutral-dark/10" />
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-3 transition-all duration-200 relative ${
                      activeTab === 'history'
                        ? 'text-primary'
                        : 'text-neutral-dark/60 hover:text-neutral-dark'
                    }`}
                    aria-label="Chat History"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-200 ${
                      activeTab === 'history' ? 'bg-primary' : 'bg-transparent'
                    }`} />
                    <ClockIcon className={`w-5 h-5 transition-transform ${activeTab === 'history' ? 'scale-110' : ''}`} />
                    <span className="text-[10px] font-semibold">History</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

