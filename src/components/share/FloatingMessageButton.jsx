'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { trackFormOpen } from '../../utils/analytics'

export default function FloatingMessageButton({ onContactClick }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300 && scrollY < document.documentElement.scrollHeight - window.innerHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    trackFormOpen('floating_button')
    onContactClick()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-16 lg:bottom-6 right-2 lg:right-6 z-50 lg:right-8"
        >
          <button
            onClick={handleClick}
            className="flex items-center cursor-pointer justify-center w-14 h-14 rounded-full bg-cta text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
            aria-label="Message us"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



