'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { trackPhoneClick, trackFormOpen } from '../../utils/analytics'
import { getAllProducts } from '@/src/utils/productsData'
import { useContactForm } from '../share/ContactFormContext'

export default function ContactHero() {
  const { openContactForm } = useContactForm()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  })

  const allProducts = getAllProducts()
  const productOptions = allProducts.map(product => product.title)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    trackFormOpen('contact_hero')
    openContactForm()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
  }

  return (
    <section className="relative bg-linear-to-b from-blue-50 via-gray-50 to-gray-100 py-16 sm:py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-8 space-y-8"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-dark mb-6 leading-tight">
                CC Matting Contact and Support
              </h1>
              <p className="text-base lg:text-lg text-neutral-dark/70 leading-relaxed mb-4">
                If you have any inquiries regarding our products please contact us on
              </p>
              <p className="text-lg font-semibold text-neutral-dark mb-6">
                CC Matting
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base text-neutral-dark/70 leading-relaxed">
                We are Ireland's leading supplier of contamination control mats, providing innovative solutions for cleanrooms, critical environments, and high-traffic areas. Our polymeric matting technology ensures 99.9% particle retention and protects your critical areas from harmful contaminants.
              </p>
              <p className="text-base text-neutral-dark/70 leading-relaxed">
                Whether you're in healthcare, pharmaceuticals, semiconductor manufacturing, or any industry requiring contamination control, our team is ready to help you find the perfect solution for your needs.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <span className="text-2xl font-semibold text-primary">
                021 4701669
              </span>
              <a
                href="tel:+353214701669"
                onClick={handlePhoneClick}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <PhoneIcon className="w-5 h-5" />
                Call Now
              </a>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-neutral-dark/60 leading-relaxed">
                Alternatively please fill in the contact form and we will be in touch shortly.
              </p>
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
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
              <h2 className="text-xl font-semibold text-neutral-dark mb-8">Contact Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email in Same Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">
                      Email
                    </label>
                    <span className="block text-xs text-neutral-dark/60 mb-2">Work email</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 border border-gray-200 rounded-lg bg-gray-50">
                      <span className="text-sm text-neutral-dark">+353</span>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-neutral-dark mb-2">
                    Product Of Interest
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all bg-white text-sm"
                  >
                    <option value="">Select a product</option>
                    {productOptions.map((product, index) => (
                      <option key={index} value={product}>{product}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-dark mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none text-sm"
                    placeholder="Your message"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 text-sm group"
                  >
                    <span>Send Message</span>
                    <PaperAirplaneIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



