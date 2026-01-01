'use client';

import { useState } from "react";
import Header from "../share/Header";
import UtilityBar from "../share/UtilityBar";
import Footer from "../share/Footer";
import ContactForm from "../share/ContactForm";

export default function BlogLayout({ children }) {
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <UtilityBar />
            <Header onContactClick={() => setIsContactFormOpen(true)} />

            {children}

            <Footer />
            <ContactForm
                isOpen={isContactFormOpen}
                onClose={() => setIsContactFormOpen(false)}
            />
        </div>
    );
}
