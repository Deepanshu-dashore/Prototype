'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#041bc6] to-[#000151] w-full border-t border-primary">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-10">
          {/* Top Section */}
          <div className="mb-6">
            {/* Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">

              {/* Social Media & Legal */}
              <div>
                <div className="inline-block bg-white px-2 py-1 rounded-md mb-3">
                  <Image 
                    src="/assets/CC MATTING_New_2_Horizontal version_page-0001.jpg" 
                    alt="CC Matting" 
                    width={200} 
                    height={45} 
                    className="h-10 sm:h-12 w-auto object-contain" 
                  />
                </div>
                <p className="text-xs text-white/75 leading-relaxed mb-4 max-w-xs">
                  Leading provider of contamination control solutions and cleanroom matting systems for critical environments worldwide.
                </p>
                <h3 className="font-semibold text-white text-sm mb-3 tracking-tight">Follow</h3>
                <div className="flex space-x-3 mb-4">
                  <a 
                    href="https://www.linkedin.com/company/cc-matting" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/75 hover:text-white hover:bg-white/15 transition-all duration-200 group" 
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-200">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/ccmatting" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/75 hover:text-white hover:bg-white/15 transition-all duration-200 group" 
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-200">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com/ccmatting" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/75 hover:text-white hover:bg-white/15 transition-all duration-200 group" 
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-200">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/ccmatting" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/75 hover:text-white hover:bg-white/15 transition-all duration-200 group" 
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-200">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-white text-sm mb-3 tracking-tight">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/features-benefits" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Features & Benefits
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Industries
                    </Link>
                  </li>
                  <li>
                    <Link href="/videos" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Videos
                    </Link>
                  </li>
                  <li>
                    <Link href="/technical" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Technical
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-semibold text-white text-sm mb-3 tracking-tight">Products</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/products/heavy-duty" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      CC Heavy Duty
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/portable-cleanroom-mats" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      CCM Portable Cleanroom Mats
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/anti-fatigue-mats/classic-ergonomic-mat" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      CC Classic Ergonomic Mat
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/anti-fatigue-mats/infinity-ergonomic-mat" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      CC Infinity Ergonomic Mat
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/anti-fatigue-mats/complete-ergonomic-mat" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      CC Complete Ergonomic Mat
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-white text-sm mb-3 tracking-tight">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms-and-conditions" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-sm text-white/80 hover:text-white transition-colors duration-200 inline-block hover:translate-x-0.5">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold text-white text-sm mb-3 tracking-tight">Contact</h3>
                <ul className="space-y-2.5">
                  <li>
                    <a href="tel:+353214701669" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200 group">
                      <PhoneIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>+353 21 470 1669</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@ccmatting.ie" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200 group">
                      <EnvelopeIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="break-all">info@ccmatting.ie</span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom Bar - ISO Logos & Copyright */}
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-xs text-center text-white/75 font-medium">
              © 2025 CC Matting. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}



