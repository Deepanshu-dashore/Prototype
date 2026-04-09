'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { trackPhoneClick, trackFormOpen } from '../../utils/analytics'
import { getAllProducts } from '@/src/utils/productsData'
import { useContactForm } from '../share/ContactFormContext'
import axios from 'axios'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

const countries = [
  {
    code: "IE", flag: "🇮🇪", dialCode: "+353", name: "Ireland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#5c9e31" d="M5 17h21v38H5z"></path>
      <path fill="#e27022" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "GB", flag: "🇬🇧", dialCode: "+44", name: "United Kingdom", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#fff" d="M40 28.856V32h10.181L67 21.691V17h-7.654z"></path>
      <path fill="#d22f27" d="M67 17h-3.827L40 31.203V32h3.482L67 17.586z"></path>
      <path fill="#fff" d="M59.347 55H67v-4.692L50.182 40H40v3.143z"></path>
      <path fill="#d22f27" d="M67 55v-2.347L46.355 40h-4.787l24.474 15z"></path>
      <path fill="#fff" d="M32 43.144V40H21.819L5 50.309V55h7.654z"></path>
      <path fill="#d22f27" d="M5 55h3.827L32 40.797V40h-3.482L5 54.414z"></path>
      <path fill="#fff" d="M12.653 17H5v4.692L21.818 32H32v-3.143z"></path>
      <path fill="#d22f27" d="M5 17v2.347L25.646 32h4.786L5.958 17z"></path>
      <path fill="#fff" d="M5 31h62v10H5z"></path>
      <path fill="#fff" d="M31 17h10v38H31z"></path>
      <path fill="#d22f27" d="M5 33h62v6H5z"></path>
      <path fill="#d22f27" d="M33 17h6v38h-6z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "US", flag: "🇺🇸", dialCode: "+1", name: "United States", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 17h62v5H5zm0 9h62v4H5zm0 8h62v4H5z"></path>
      <path fill="#1e50a0" d="M5 17h32v21H5z"></path>
      <path fill="#d22f27" d="M5 42h62v4H5z"></path>
      <circle cx={9.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={17.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={25.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={33.5} cy={22} r={1.75} fill="#fff"></circle>
      <circle cx={29.5} cy={26} r={1.75} fill="#fff"></circle>
      <circle cx={21.5} cy={26} r={1.75} fill="#fff"></circle>
      <circle cx={13.5} cy={26} r={1.75} fill="#fff"></circle>
      <circle cx={9.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={17.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={25.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={33.5} cy={30} r={1.75} fill="#fff"></circle>
      <circle cx={29.5} cy={34} r={1.75} fill="#fff"></circle>
      <circle cx={21.5} cy={34} r={1.75} fill="#fff"></circle>
      <circle cx={13.5} cy={34} r={1.75} fill="#fff"></circle>
      <path fill="#d22f27" d="M5 50h62v5H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "CA", flag: "🇨🇦", dialCode: "+1", name: "Canada", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 17h17v38H5zm45 0h17v38H50z"></path>
      <path fill="#d22f27" stroke="#d22f27" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M36 46v-5m0 0h6.8l-.8-2l4-4v-3h-3l-4 4v-7l-3-3m0 15h-6.8l.8-2l-4-4v-3h3l4 4v-7l3-3"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "AU", flag: "🇦🇺", dialCode: "+61", name: "Australia", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m54.233 38.945l.927-3l.927 3l-2.427-1.855l3 .001zM20.5 46.999l-1.558 1.477l.155-2.17L17 45.978l1.75-1.23l-1.057-1.886l2.028.637l.779-2.023l.779 2.023l2.028-.637l-1.057 1.886l1.75 1.23l-2.097.328l.155 2.17zm24-11.578l-1.113 1.055l.111-1.55L42 34.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55zm15-3l-1.113 1.055l.111-1.55L57 31.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55zm-8-6l-1.113 1.055l.111-1.55L49 25.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55zm0 21l-1.113 1.055l.111-1.55L49 46.691l1.25-.878l-.755-1.347l1.449.455l.556-1.445l.556 1.445l1.449-.455l-.755 1.347l1.25.878l-1.498.235l.111 1.55z" strokeWidth={1.9}></path>
      <path fill="#fff" d="M9.887 18H6v2.332L32.113 36H36v-2.332z"></path>
      <path fill="#fff" d="M36 20.332V18h-3.887L6 33.668V36h3.887z"></path>
      <path fill="#fff" d="M6 24h30v6H6z"></path>
      <path fill="#fff" d="M18 18h6v18h-6z"></path>
      <path fill="#d22f27" d="M20 18h2v18h-2z"></path>
      <path fill="#d22f27" d="M6 26h30v2H6zm30 7.668L29.887 30H26l10 6zM36 18h-3.887L24 22.868V24h2zM6 20.332L12.113 24H16L6 18zM6 36h3.887L18 31.132V30h-2z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "DE", flag: "🇩🇪", dialCode: "+49", name: "Germany", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#f1b31c" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 30h62v12H5z"></path>
      <path d="M5 17h62v13H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "FR", flag: "🇫🇷", dialCode: "+33", name: "France", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#1e50a0" d="M5 17h21v38H5z"></path>
      <path fill="#d22f27" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "ES", flag: "🇪🇸", dialCode: "+34", name: "Spain", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#f1b31c" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M23 33v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7M5 17h62v9H5zm0 29h62v9H5z"></path>
      <path fill="#f1b31c" d="M19 33h4v4h-4z"></path>
      <circle cx={19} cy={37} r={1.5} fill="#6a462f"></circle>
      <path fill="none" stroke="#6a462f" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M27 33v9m-16-9v9m4-12a8.6 8.6 0 0 1 4-1m4 1a8.6 8.6 0 0 0-4-1m-4 4h8m0 0v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7m-5 9h2m14 0h2"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "IT", flag: "🇮🇹", dialCode: "+39", name: "Italy", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#5c9e31" d="M5 17h21v38H5z"></path>
      <path fill="#d22f27" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "NL", flag: "🇳🇱", dialCode: "+31", name: "Netherlands", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 17h62v13H5z"></path>
      <path fill="#fff" d="M5 30h62v12H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "BE", flag: "🇧🇪", dialCode: "+32", name: "Belgium", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fcea2b" d="M5 17h62v38H5z"></path>
      <path d="M5 17h21v38H5z"></path>
      <path fill="#d22f27" d="M46 17h21v38H46z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "CH", flag: "🇨🇭", dialCode: "+41", name: "Switzerland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M17 17h38v38H17z"></path>
      <path fill="#fff" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} d="M47 32.462h-7.462V25h-7.076v7.462H25v7.076h7.462V47h7.076v-7.462H47z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h38v38H17z"></path>
    </svg>)
  },
  {
    code: "AT", flag: "🇦🇹", dialCode: "+43", name: "Austria", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 42h62v13H5zm0-25h62v13H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "SE", flag: "🇸🇪", dialCode: "+46", name: "Sweden", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
      <path fill="#fcea2b" stroke="#fcea2b" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "NO", flag: "🇳🇴", dialCode: "+47", name: "Norway", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M5 17h62v38H5z"></path>
      <path fill="#1e50a0" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "DK", flag: "🇩🇰", dialCode: "+45", name: "Denmark", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M5 17h62v38H5z"></path>
      <path fill="#fff" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "FI", flag: "🇫🇮", dialCode: "+358", name: "Finland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#1e50a0" stroke="#1e50a0" strokeMiterlimit={10} strokeWidth={2} d="M67 33H30V17h-6v16H5v6h19v16h6V39h37z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "PL", flag: "🇵🇱", dialCode: "+48", name: "Poland", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#fff" d="M5 17h62v38H5z"></path>
      <path fill="#d22f27" d="M5 36h62v19H5z"></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "IN", flag: "🇮🇳", dialCode: "+91", name: "India", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#5c9e31" d="M5 17h62v38H5z"></path>
      <path fill="#e27022" d="M5 17h62v13H5z"></path>
      <path fill="#fff" d="M5 30h62v12H5z"></path>
      <path fill="none" stroke="#1e50a0" strokeLinecap="round" strokeLinejoin="round" d="M36.296 34.896L38 32.536l-1.192 2.656L39.464 34l-2.36 1.704L40 36l-2.896.296L39.464 38l-2.656-1.192L38 39.464l-1.704-2.36L36 40l-.296-2.896L34 39.464l1.192-2.656L32.536 38l2.36-1.704L32 36l2.896-.296L32.536 34l2.656 1.192L34 32.536l1.704 2.36L36 32z" strokeWidth={1.9}></path>
      <circle cx={36} cy={36} r={5} fill="none" stroke="#1e50a0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.9}></circle>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
  {
    code: "CN", flag: "🇨🇳", dialCode: "+86", name: "China", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 72 72">
      <path fill="#d22f27" d="M5 17h62v38H5z"></path>
      <circle cx={24} cy={34} r={1.75} fill="#f1b31c"></circle>
      <circle cx={24} cy={24} r={1.75} fill="#f1b31c"></circle>
      <circle cx={28} cy={31} r={1.75} fill="#f1b31c"></circle>
      <circle cx={28} cy={26} r={1.75} fill="#f1b31c"></circle>
      <path fill="#f1b31c" stroke="#f1b31c" strokeLinecap="round" strokeLinejoin="round" d="m13.528 32.445l2.472-8l2.473 8L12 27.5h8z" strokeWidth={1.9}></path>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"></path>
    </svg>)
  },
];

export default function ContactHero() {
  const { openContactForm } = useContactForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);
  const productDropdownRef = useRef(null);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const allProducts = getAllProducts();
  const baseProducts = allProducts.map((product) => product.title);
  const productOptions = [
    "CCM Heavy Duty Mat",
    "CCM Portable Cleanroom/Data Center Mats",
    "CCM Anti-Fatigue Mats"
  ]
    ;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle country dropdown
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryDropdownOpen(false);
      }
      // Handle product dropdown
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target)
      ) {
        setIsProductDropdownOpen(false);
      }
    };

    if (isCountryDropdownOpen || isProductDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCountryDropdownOpen, isProductDropdownOpen]);

  const handlePhoneClick = () => {
    trackPhoneClick("contact_hero");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.product) newErrors.product = true;
    if (!formData.message) newErrors.message = true;
    if (captchaInput !== captcha) newErrors.captcha = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Clear errors after 2 seconds
      setTimeout(() => setErrors({}), 2000);
      return;
    }

    setIsSubmitting(true);
    trackFormOpen("contact_hero");

    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: `${selectedCountry.dialCode}${formData.phone.replace(/\s+/g, "")}`,
        productOfInterest: formData.product,
        message: formData.message,
      };

      await axios.post("/api/enquiry", payload);

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", product: "", message: "" });
      generateCaptcha();
      // console.log("Form submitted successfully to Google Sheets");
    } catch (error) {
      // console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shakeAnimation = {
    shake: {
      x: [0, -4, 4, -4, 4, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative bg-linear-to-b from-blue-50 via-gray-50 to-gray-100 py-16 sm:py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col  py-2 lg:py-8"
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-700 mb-5 leading-[1.15] flex items-center gap-3">
                  Contact Us
                </h1>
                <p className="text-lg lg:text-2xl font-semibold text-blue-900 mb-4 leading-snug  ">
                  A trusted global manufacturer of advanced contamination
                  control matting solutions.
                </p>
                <p className="text-lg text-neutral-dark/70 leading-relaxed  max-w-xl">
                  We provide innovative solutions for cleanrooms, critical
                  environments, and high-traffic areas. Our polymeric matting
                  technology ensures{" "}
                  <span className="text-neutral-dark font-bold">
                    Up to 99% particle retention
                  </span>
                  , protecting your critical areas from harmful contaminants.
                </p>
              </div>

              {/* <div className="space-y-4">
                <p className="text-base text-neutral-dark/70 leading-relaxed max-w-xl">
                  We design and manufacture high-performance polymeric contamination control mats for cleanrooms, pharmaceutical facilities, healthcare environments, and high-traffic industrial areas.

                  Our advanced matting technology delivers up to 99% particle retention, ensuring maximum protection for critical controlled environments.
                </p>
              </div> */}
            </div>
            <div className="mt-8 lg:mt-4 pt-4 space-y-6">
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="tel:+353214701669"
                  onClick={handlePhoneClick}
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              {/* Contact Info Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col gap-2 group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Support</span>
                  </div>
                  <a href="mailto:sales@ccmatting.ie" className="text-base font-bold text-neutral-dark hover:text-primary transition-colors">
                    sales@ccmatting.ie
                  </a>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col gap-2 group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Regional Office</span>
                  </div>
                  <a href="tel:+0214701669" className="text-base font-bold text-neutral-dark hover:text-primary transition-colors">
                    021 4701669
                  </a>
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Our Presence</p>
                <div className="flex items-center gap-6">
                  <Link
                    className="flex items-center gap-2 text-primary opacity-100 hover:opacity-100 transition-all duration-300 group"
                    href="https://www.linkedin.com/company/ccmatting/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                      ></path>
                    </svg>
                    <span className="text-primary font-bold group-hover:underline">LinkedIn</span>
                  </Link>
                  {/* <Link
                    href="#industries"
                    className="flex items-center gap-2 text-emerald-600 font-bold group"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="group-hover:underline">Explore Industry Solutions</span>
                  </Link> */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form with Gradient Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gradient Background Box */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-100/50 via-primary/10 to-blue-50/50 rounded-2xl -z-10"></div>

            {/* Form Container */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-8 sm:p-12 min-h-[500px] flex flex-col justify-center overflow-hidden">
              <h2 className="text-xl font-semibold text-neutral-dark mb-8">
                Contact Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email in Same Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    animate={errors.name ? "shake" : ""}
                    variants={shakeAnimation}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-neutral-dark mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full h-[52px] px-4 bg-[#F9FAFB] border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all text-sm`}
                      placeholder="John Doe"
                    />
                  </motion.div>

                  <motion.div
                    animate={errors.email ? "shake" : ""}
                    variants={shakeAnimation}
                  >
                    <label
                      htmlFor="email"
                      className="flex items-baseline gap-2y text-sm font-semibold text-neutral-dark mb-1"
                    >
                      Email (Work email)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full h-[52px] px-4 bg-[#F9FAFB] border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all text-sm`}
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  animate={errors.phone ? "shake" : ""}
                  variants={shakeAnimation}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-neutral-dark mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() =>
                          setIsCountryDropdownOpen(!isCountryDropdownOpen)
                        }
                        className="flex items-center gap-1.5 px-3 h-[52px] border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="text-sm text-neutral-dark font-medium">
                          {selectedCountry.dialCode}
                        </span>
                        <ChevronDownIcon
                          className={`w-3.5 h-3.5 text-neutral-dark/40 transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isCountryDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto w-64 p-1"
                          >
                            {countries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsCountryDropdownOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-primary/5 transition-colors text-left ${selectedCountry.code === country.code
                                  ? "bg-primary/5 text-primary"
                                  : "text-neutral-dark"
                                  }`}
                              >
                                <span className="text-lg w-6 h-5 overflow-hidden rounded-full flex justify-center items-center">{<country.icon className="w-7 h-6 opacity-85" />}</span>
                                <span className="flex-1 font-medium">
                                  {country.name}
                                </span>
                                <span className="text-neutral-dark/40 text-xs">
                                  {country.dialCode}
                                </span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`flex-1 h-[52px] px-4 bg-[#F9FAFB] border ${errors.phone ? "border-red-500" : "border-gray-200"} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all text-sm`}
                      placeholder="Enter phone number"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={errors.product ? "shake" : ""}
                  variants={shakeAnimation}
                >
                  <label
                    htmlFor="product"
                    className="block text-sm font-semibold text-neutral-dark mb-2"
                  >
                    Product Of Interest
                  </label>
                  <div className="relative" ref={productDropdownRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setIsProductDropdownOpen(!isProductDropdownOpen)
                      }
                      className={`w-full h-[52px] px-4 flex items-center justify-between bg-[#F9FAFB] border ${errors.product ? "border-red-500" : "border-gray-200"} rounded-lg focus-within:bg-white focus-within:rounded-xl focus-within:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus-within:border-primary outline-none transition-all text-sm text-left ${!formData.product ? "text-neutral-dark/40" : "text-neutral-dark"}`}
                    >
                      <span className="truncate">
                        {formData.product || "Select a product"}
                      </span>
                      <ChevronDownIcon
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProductDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isProductDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto p-1.5 overflow-x-hidden"
                        >
                          {productOptions.map((product, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, product });
                                setIsProductDropdownOpen(false);
                                setErrors({ ...errors, product: false });
                              }}
                              className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg hover:bg-primary/5 transition-colors text-left ${formData.product === product
                                ? "bg-primary/5 text-primary font-semibold"
                                : "text-neutral-dark"
                                }`}
                            >
                              {product}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  animate={errors.message ? "shake" : ""}
                  variants={shakeAnimation}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-neutral-dark mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full min-h-[100px] px-4 py-3 bg-[#F9FAFB] border ${errors.message ? "border-red-500" : "border-gray-200"} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all resize-none text-sm`}
                    placeholder="Your message"
                  />
                </motion.div>

                {/* Captcha Section */}
                <motion.div
                  animate={errors.captcha ? "shake" : ""}
                  variants={shakeAnimation}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex items-center justify-between px-4 h-[52px] bg-gray-100 rounded-lg border border-gray-200 select-none overflow-hidden relative group">
                      {/* Advanced Noise Layers */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                        {/* Wavy Strike-throughs */}
                        <svg className="absolute inset-0 w-full h-full">
                          <path
                            d="M 0 26 Q 50 10 100 26 T 200 26 T 300 26"
                            fill="none"
                            stroke="currentColor"
                            className="text-primary/30"
                            strokeWidth="2"
                          />
                          <path
                            d="M 0 30 Q 70 45 140 30 T 280 30"
                            fill="none"
                            stroke="currentColor"
                            className="text-primary/20"
                            strokeWidth="1.5"
                          />
                        </svg>

                        {/* More noise elements */}
                        <div className="absolute inset-0 flex justify-around items-center">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-[1.5px] h-full bg-primary/10"
                              style={{
                                transform: `rotate(${((i * 37) % 60) - 30}deg) translateX(${((i * 13) % 20) - 10}px)`,
                                opacity: 0.1 + (i % 2) * 0.1
                              }}
                            />
                          ))}
                        </div>

                        {/* Random "dust" pixels */}
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div
                            key={`dust-${i}`}
                            className="absolute w-1 h-1 bg-primary/40 rounded-full"
                            style={{
                              left: `${(i * 17) % 100}%`,
                              top: `${(i * 23) % 100}%`,
                              opacity: 0.3
                            }}
                          />
                        ))}
                      </div>

                      {/* Decorative background for captcha */}
                      <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex flex-wrap gap-1">
                        {Array.from({ length: 60 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="w-3 h-3 rounded-full bg-primary"
                            style={{
                              transform: `rotate(${Math.sin(idx) * 360}deg) scale(${0.3 + Math.cos(idx) * 0.7})`,
                              opacity: 0.1 + Math.abs(Math.sin(idx)) * 0.4
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center relative z-10 select-none px-2">
                        {captcha.split("").map((char, index) => {
                          const colors = ["text-primary", "text-blue-600", "text-blue-800", "text-indigo-700"];
                          const colorClass = colors[index % colors.length];

                          return (
                            <span
                              key={index}
                              className={`font-mono text-3xl font-black ${colorClass} inline-block`}
                              style={{
                                transform: `
                                  rotate(${((index * 17) % 50) - 25}deg) 
                                  translateY(${Math.sin(index) * 8}px) 
                                  skew(${((index * 13) % 24) - 12}deg)
                                  scale(${0.9 + (index % 3) * 0.1})
                                `,
                                filter: `blur(0.3px)`,
                                letterSpacing: `-2px`,
                                textShadow: `
                                  ${index % 2 ? '1px' : '-1px'} 1px 2px rgba(0,0,0,0.1),
                                  0 0 5px rgba(0,34,204,0.1)
                                `,
                                margin: "0 -2px"
                              }}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-1.5 hover:bg-white/90 rounded-full transition-all duration-300 relative z-10 shadow-md border border-gray-200 bg-white/50"
                        title="Refresh Captcha"
                      >
                        <ArrowPathIcon className="w-5 h-5 text-primary" />
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Type the code"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        if (errors.captcha) setErrors({ ...errors, captcha: false });
                      }}
                      className={`flex-1 h-[52px] px-4 bg-[#F9FAFB] border ${errors.captcha ? "border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]" : "border-gray-200"} rounded-lg focus:bg-white focus:rounded-xl focus:shadow-[0_0_0_4px_rgba(0,34,204,0.1)] focus:border-primary outline-none transition-all text-sm font-mono tracking-widest`}
                    />
                  </div>
                  {errors.captcha && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                      Incorrect security code. Please try again.
                    </p>
                  )}
                </motion.div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center gap-2 bg-linear-to-b from-primary to-blue-700 text-white px-6 py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm group ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <PaperAirplaneIcon className="w-4 h-4 group-hover:translate-x-[3px] transition-transform" />
                  </button>
                </div>
              </form>

              {/* Success Overlay */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="absolute inset-0 z-20 bg-white/80 flex items-center justify-center p-6 text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-xs"
                    >
                      <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                          <CheckCircleIcon className="w-10 h-10 text-green-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-3">
                        Message Received!
                      </h3>
                      <p className="text-sm text-neutral-dark/60 leading-relaxed mb-6">
                        Thank you for your interest. Our team will
                        reach out to you{" "}
                        <span className="text-primary font-semibold">
                          as soon as possible
                        </span>
                        .
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                      >
                        Dismiss
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



