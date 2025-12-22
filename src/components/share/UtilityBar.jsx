'use client'

import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { trackPhoneClick } from '../../utils/analytics'

export default function UtilityBar() {
  const handlePhoneClick = () => {
    trackPhoneClick('utility_bar')
  }
  return (
    <div className="bg-neutral-dark text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <a 
            href="tel:+353214701669" 
            onClick={handlePhoneClick}
            className="flex items-center gap-2 hover:text-accent transition-colors"
            aria-label="Call us at 021 4701669"
          >
            <PhoneIcon className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">021 4701669</span>
            <span className="sm:hidden">Call</span>
          </a>
          <a 
            href="mailto:info@ccmatting.ie" 
            className="flex items-center gap-2 hover:text-accent transition-colors"
            aria-label="Email us at info@ccmatting.ie"
          >
            <EnvelopeIcon className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">info@ccmatting.ie</span>
            <span className="sm:hidden">Email</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:inline text-neutral-light/70">Follow us:</span>
            <a 
              href="https://www.linkedin.com/company/cc-matting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Visit our LinkedIn page"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}



