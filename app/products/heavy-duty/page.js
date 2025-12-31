"use client";

import { useState } from "react";
import Header from "../../../src/components/share/Header";
import UtilityBar from "../../../src/components/share/UtilityBar";
import Footer from "../../../src/components/share/Footer";
import ContactForm from "../../../src/components/share/ContactForm";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  ArrowPathIcon,
  SwatchIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { getProductBySlug } from "../../../src/utils/productsData";

export default function HeavyDutyPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const product = getProductBySlug("heavy-duty");

  // Map icon names to actual icon components
  const iconMap = {
    CheckBadgeIcon,
    ShieldCheckIcon,
    ClockIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    PaintBrushIcon,
    ArrowPathIcon
  };

  const benefits = product.benefits.map(benefit => ({
    ...benefit,
    icon: iconMap[benefit.icon]
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UtilityBar />
      <Header onContactClick={() => setIsContactFormOpen(true)} />

      <main className="grow">
        {/* Hero Section with Background */}
        <section className="relative overflow-hidden h-[85vh] flex items-center">
          {/* Base Background with linear */}
          <div className={`absolute inset-0 z-20 bg-linear-to-br to-transparent from-black`} />
          <img 
            src={product.image} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-cover" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          
          {/* Left Side Gradient - Darker */}
          <div 
            className="absolute left-0 top-0 w-1/3 h-full z-30"
            style={{
              background: `linear-gradient(to right, ${product.gradientColors.dark}80, ${product.gradientColors.primary}40, transparent)`
            }}
          />
          
          {/* Right Side Gradient - Darker */}
          <div 
            className="absolute right-0 top-0 w-1/3 h-full z-30"
            style={{
              background: `linear-gradient(to left, ${product.gradientColors.dark}80, ${product.gradientColors.primary}40, transparent)`
            }}
          />
          
          {/* Center Transparent Area */}
          <div className="absolute left-1/3 top-0 w-1/3 h-full z-30" />
          
          {/* Bottom Gradient */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/3 z-30"
            style={{
              background: `linear-gradient(to top, ${product.gradientColors.dark}60, ${product.gradientColors.primary}30, transparent)`
            }}
          />
          
          <div className="relative max-w-7xl z-40 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl max-w-4xl mx-auto sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
              >
                {product.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-white mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
              >
                {product.description}
              </motion.p>

              {/* Technical Data Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href="/technical"
                  className="inline-flex items-center gap-2 bg-white text-neutral-dark px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group"
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  <span>TECHNICAL DATA</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Color Options Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 lg:hidden block"
            >
              <span className=" inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                <SwatchIcon className="w-3 h-3" />
                Colors
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                See Colours Below
              </h2>
            </motion.div>

            <div className="flex lg:gap-8 flex-col lg:flex-row gap-0 justify-center">
            <div className="grid grid-cols-1 shrink-0 w-full md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {product.colorOptions.map((color, index) => (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300">
                    <div className="mb-4 relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Image
                        src={color.image}
                        alt={color.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-dark mb-2 text-center">
                      {color.name}
                    </h3>
                    <p className="text-sm text-neutral-dark/70 text-center">
                      {color.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Color Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-left"
            >
               <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left mb-8 hidden lg:block"
            >
              <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                <SwatchIcon className="w-3 h-3" />
                Colors
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark">
              Colour Options Available
              </h2>
            </motion.div>
              <p className="text-base text-neutral-dark/70 leading-relaxed">
                Choose from our two premium color options: Solid Blue for a classic, professional look, or Grey Speck for an elegant, modern finish. Both options maintain the same high-performance standards and durability.
              </p>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 sm:mb-12"
            >
              <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                <SparklesIcon className="w-3 h-3" />
                Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-3">
              CC HEAVY DUTY Benefits
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative overflow-hidden flex items-center justify-between p-5 sm:p-6 border group border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-1.5">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>

                    {/* Icon area */}
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Warranty Card Section */}
        <section className="relative bg-gray-100 py-12 sm:py-16 overflow-hidden">
  {/* Pattern layer */}
  <div
    className="pointer-events-none absolute inset-0 
               bg-[url('/circle-pattern.svg')] 
               bg-repeat opacity-[0.02]"
    aria-hidden
  />

  {/* Content layer */}
  <div className="relative z-10"> 
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="bg-gray-100 p-6 sm:p-8 flex items-center justify-center">
                    <div className="relative w-full max-w-xs">
                      <Image
                        src={product.warranty.badgeImage}
                        alt="2 Years Warranty Badge"
                        width={600}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-4">
                      {product.warranty.title}
                    </h2>
                      <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4 w-fit">
                        <ShieldCheckIcon className="w-4 h-4" />
                        Warranty
                      </div>
                    <div className="text-neutral-dark/70">
                      <p className="text-sm sm:text-base leading-relaxed mb-3">
                        {product.warranty.description}
                      </p>
                      <p className="text-sm sm:text-base leading-relaxed">
                        {product.warranty.additionalInfo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  );
}

