'use client'

import { useState } from 'react'
import UtilityBar from '../src/components/share/UtilityBar'
import Header from '../src/components/share/Header'
import Hero from '../src/components/home/Hero'
import QuickBenefitsStrip from '../src/components/home/QuickBenefitsStrip'
import WhatSetsApartDark from '../src/components/home/WhatSetsApartDark'
import AboutSection from '../src/components/home/AboutSection'
import IndustrySolutions from '../src/components/home/IndustrySolutions'
import CustomersLogos from '../src/components/home/CustomersLogos'
import CaseStudies from '../src/components/home/CaseStudies'
import VideoGallery from '../src/components/home/VideoGallery'
import ContactFormSection from '../src/components/contact/ContactFormSection'
import CTASection from '../src/components/home/CTASection'
import Footer from '../src/components/share/Footer'
import ContactForm from '../src/components/share/ContactForm'
import FloatingMessageButton from '../src/components/share/FloatingMessageButton'
import FloatingWhatsAppButton from '../src/components/share/FloatingWhatsAppButton'

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  const handleContactClick = () => {
    setIsContactFormOpen(true)
  }

  const handleCloseContactForm = () => {
    setIsContactFormOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <UtilityBar />
      <Header onContactClick={handleContactClick} />
      
      <main className="grow ">
        {/* 1. HERO SECTION */}
        <Hero 
          onPrimaryClick={handleContactClick}
          onSecondaryClick={() => {
            const element = document.getElementById('videos')
            element?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        
        {/* 2. FEATURE CARDS ("Why Choosing Us") */}
        {/* <QuickBenefitsStrip /> */}
        
        {/* 2.5. WHAT SETS APART (Dark Section) */}
        <WhatSetsApartDark />
        
        {/* 3. CLIENT LOGO STRIP */}
        <CustomersLogos />
        
        {/* 4. MATERIALS / QUALITY SECTION */}
        <AboutSection />
        
        {/* 7. INDUSTRY SOLUTIONS */}
        <IndustrySolutions />

        {/* 5. VIDEO GALLERY */}
        {/* <VideoGallery /> */}
        
        {/* 6. TESTIMONIALS */}
        <CaseStudies />
        
        {/* 8. CONTACT SECTION */}
        {/* <ContactFormSection /> */}
        
        {/* 9. CTA SECTION */}
        <CTASection />
        
        <FloatingMessageButton onContactClick={handleContactClick} />
        <FloatingWhatsAppButton />
      </main>
      
      {/* 8. FOOTER */}
      <Footer />
      <ContactForm isOpen={isContactFormOpen} onClose={handleCloseContactForm} />
    </div>
  )
}
