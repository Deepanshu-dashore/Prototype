'use client'

import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function QuickContactStrip() {
  return (
    <section className="bg-neutral-light border-y border-neutral-dark/10 py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
          <a 
            href="tel:+353214701669" 
            className="flex items-center gap-2 text-neutral-dark font-medium hover:text-primary transition-colors"
          >
            <PhoneIcon className="w-5 h-5" aria-hidden="true" />
            <span>021 4701669</span>
          </a>
          <a 
            href="mailto:info@ccmatting.ie" 
            className="flex items-center gap-2 text-neutral-dark font-medium hover:text-primary transition-colors"
          >
            <EnvelopeIcon className="w-5 h-5" aria-hidden="true" />
            <span>info@ccmatting.ie</span>
          </a>
          <a 
            href="https://www.linkedin.com/company/cc-matting" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-dark font-medium hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>Follow Us on LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  )
}



