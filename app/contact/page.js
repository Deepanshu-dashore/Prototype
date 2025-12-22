'use client'

import { useState } from 'react'
import ContactHero from '../../src/components/contact/ContactHero'
import ContactFormSection from '../../src/components/contact/ContactFormSection'
import Footer from '../../src/components/share/Footer'
import UtilityBar from '../../src/components/share/UtilityBar'
import Header from '../../src/components/share/Header'
import ContactForm from '../../src/components/share/ContactForm'

export default function ContactPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  const handleContactClick = () => {
    setIsContactFormOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UtilityBar />
      <Header onContactClick={handleContactClick} />
      
      <main className="flex-grow">
        <ContactHero onMessageClick={handleContactClick} />
        <ContactFormSection />
      </main>
      
      <Footer />
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </div>
  )
}

