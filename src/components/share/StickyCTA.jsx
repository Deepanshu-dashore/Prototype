'use client'

import { motion } from 'framer-motion'
import { PhoneIcon } from '@heroicons/react/24/solid'
import { trackPhoneClick, trackFormOpen } from '../../utils/analytics'
import Magnet from '../animations/Magnet'

export default function StickyCTA({ onContactClick }) {
  const handlePhoneClick = () => {
    trackPhoneClick('sticky_cta')
  }

  const handleContactClick = () => {
    trackFormOpen('sticky_cta')
    onContactClick()
  }
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-dark/10 shadow-lg lg:hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <a
            href="tel:+353214701669"
            onClick={handlePhoneClick}
            className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            <PhoneIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">021 4701669</span>
          </a>
          <Magnet magnetStrength={3} padding={80}>
            <button
              onClick={handleContactClick}
              className="px-5 py-2.5 rounded-lg bg-cta text-white text-sm font-medium hover:scale-[1.03] transform transition shadow-md"
            >
              Get Quote
            </button>
          </Magnet>
        </div>
      </div>
    </motion.div>
  )
}



