'use client';

import { createContext, useContext, useState } from 'react';

const ContactFormContext = createContext({
    isOpen: false,
    openContactForm: () => { },
    closeContactForm: () => { },
});

export function ContactFormProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const openContactForm = () => setIsOpen(true);
    const closeContactForm = () => setIsOpen(false);

    return (
        <ContactFormContext.Provider value={{ isOpen, openContactForm, closeContactForm }}>
            {children}
        </ContactFormContext.Provider>
    );
}

export function useContactForm() {
    return useContext(ContactFormContext);
}
