'use client'

import React, { useState } from 'react';
import UtilityBar from '../../src/components/share/UtilityBar'
import Header from '../../src/components/share/Header'
import Footer from '../../src/components/share/Footer'
import ContactForm from '../../src/components/share/ContactForm'

export default function TermsAndConditions() {
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
      
      <main className="grow bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-dark mb-8">TERMS AND CONDITIONS</h1>

          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-dark/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">1. Warranty and Performance</h2>
              <p>
                CC Matting provides a <strong>100% 3-year warranty</strong> on its contamination control floor mats. We guarantee that the CC Matting polymer floor surface will continue to remove and hold foot and wheel-borne contamination at an equal or greater quantity than a new adhesive, disposable mat for a period of <strong>36 months</strong>.
              </p>
              <p className="mt-4">
                A properly installed CC Matting floor mat system is expected to have an average active life of <strong>5 years</strong> if maintained correctly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">2. Maintenance Requirements</h2>
              <p>
                To maintain the validity of the warranty, the floor surface must be regularly cleaned in accordance with manufacturer instructions. This requirements include:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Daily cleaning with a detergent/disinfectant water solution.</li>
                <li>Use of an appropriate mop.</li>
                <li>Squeegee drying to ensure surface integrity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">3. Exclusions and Limitations</h2>
              <p>
                The warranty does not cover damage caused by:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Motorized wheels turning on the surface.</li>
                <li>Dragging heavy equipment or pallets across the mat.</li>
                <li>Improper cleaning techniques or use of unapproved chemicals.</li>
              </ul>
              <p className="mt-4 italic">
                Note: Traffic should move straight across the floor mat. For vehicles making slight turns, the CC Matting Heavy Duty product is recommended.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">4. Term and Termination</h2>
              <p>
                These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">5. Modifications and Interruptions</h2>
              <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
              </p>
              <p className="mt-4">
                We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">6. Governing Law</h2>
              <p>
                These conditions are governed by and interpreted following the laws of <strong>Ireland</strong>. CC Matting (Trade and Consult Europe Sp.Z.O.O) and yourself both agree to submit to the non-exclusive jurisdiction of the courts of <strong>Cork</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">7. Dispute Resolution</h2>
              <h3 className="text-lg font-semibold text-neutral-dark mt-4">Informal Negotiations</h3>
              <p>
                To expedite resolution and control the cost of any dispute, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
              </p>
              <h3 className="text-lg font-semibold text-neutral-dark mt-4">Binding Arbitration</h3>
              <p>
                Any dispute arising from the relationships between the Parties to this contract shall be determined by one arbitrator chosen in accordance with the rules of the European Court of Arbitration. The seat of arbitration shall be Cork, Ireland.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-dark mb-4 uppercase">8. Disclaimer</h2>
              <p className="border-l-4 border-primary/20 pl-4 py-2 bg-neutral-50 rounded-r-lg">
                THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF.
              </p>
            </section>

            <section id="contact" className="mt-12 bg-neutral-900 text-white p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4 opacity-80">
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
              </p>
              <p className="font-bold">CC Matting</p>
              <p className="opacity-80">Unit 14, Riverstick Industrial Estate</p>
              <p className="opacity-80">Riverstick, Co. Cork, Ireland</p>
              <p className="mt-4">
                <span className="font-semibold">Phone:</span> +353 21 470 1669<br />
                <span className="font-semibold">Email:</span> info@ccmatting.ie
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <ContactForm isOpen={isContactFormOpen} onClose={handleCloseContactForm} />
    </div>
  );
}
