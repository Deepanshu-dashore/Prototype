'use client'

import { motion } from 'framer-motion'
import { PhoneIcon } from '@heroicons/react/24/solid'

export default function CTASection({ onContactClick }) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/90 py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl lg:text-[1.75rem] font-semibold text-white mb-6">
            Need a Contamination Control Solution?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onContactClick}
              className="btn-primary bg-white text-primary hover:bg-white/90 inline-flex items-center gap-2"
            >
              Request a Quote
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="tel:+353214701669"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition"
            >
              <PhoneIcon className="w-5 h-5" aria-hidden="true" />
              Book Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}



