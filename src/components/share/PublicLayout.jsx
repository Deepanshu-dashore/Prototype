'use client';

import { useState } from "react";
import Header from "../share/Header";
import UtilityBar from "../share/UtilityBar";
import MarqueeBar from "../share/MarqueeBar";
import Footer from "../share/Footer";
import ContactForm from "../share/ContactForm";
import FloatingMessageButton from "../share/FloatingMessageButton";
import FloatingWhatsAppButton from "../share/FloatingWhatsAppButton";

export default function PublicLayout({ children, className = "" }) {
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    const handleContactClick = () => {
        setIsContactFormOpen(true);
    };

    return (
        <div className={`min-h-screen relative flex flex-col ${className}`}>
            <UtilityBar />
            <Header onContactClick={handleContactClick} />
            <MarqueeBar />

            {children}

            <Footer />
            <ContactForm
                isOpen={isContactFormOpen}
                onClose={() => setIsContactFormOpen(false)}
            />
            <FloatingMessageButton onContactClick={handleContactClick} />
            <FloatingWhatsAppButton />
        </div>
    );
}
