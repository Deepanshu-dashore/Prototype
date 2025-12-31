"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../../src/components/share/Header";
import UtilityBar from "../../../../src/components/share/UtilityBar";
import Footer from "../../../../src/components/share/Footer";
import ContactForm from "../../../../src/components/share/ContactForm";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  SparklesIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  CheckCircleIcon,
  ScissorsIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  ArrowsRightLeftIcon,
  ListBulletIcon,
  WrenchScrewdriverIcon,
  SwatchIcon
} from "@heroicons/react/24/outline";
import { getProductBySlug } from "../../../../src/utils/productsData";

// Icon mapping
const iconMap = {
  HeartIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  CheckCircleIcon,
  ScissorsIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  CheckBadgeIcon,
  ShieldCheckIcon
};

export default function AntiFatigueMatsPage() {
  const params = useParams();
  const slug = params?.slug || "classic-ergonomic-mat";
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  // Map icon names to actual icon components
  const benefits = product.benefits?.map(benefit => ({
    ...benefit,
    icon: iconMap[benefit.icon] || CheckBadgeIcon
  })) || [];

  // Get benefit images folder path
  const getImageFolder = () => {
    if (slug === "classic-ergonomic-mat") {
      return "Classic Ergonomic Mat";
    } else if (slug === "infinity-ergonomic-mat") {
      return "CC Infinity Ergonomic Mat";
    } else if (slug === "complete-ergonomic-mat") {
      return "Complete Ergonomic Mat";
    }
    return "Classic Ergonomic Mat";
  };

  const imageFolder = getImageFolder();
  const benefitImages = product.benefitImages || [1, 2, 3, 4];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UtilityBar />
      <Header onContactClick={() => setIsContactFormOpen(true)} />

      <main className="grow">
        {/* Hero Section with Background Overlap */}
        <section className="relative overflow-hidden h-[85vh] flex items-center">
          {/* Base Background with linear */}
          <div className="absolute inset-0 z-20 bg-linear-to-br to-transparent from-black" />
          <img 
            src={product.image} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-cover object-top" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          
          {/* Left Side Gradient - Darker */}
          <div 
            className="absolute left-0 top-0 w-1/3 h-full z-30"
            style={{
              background: `linear-gradient(to right,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent)`
            }}
          />
          
          {/* Right Side Gradient - Darker */}
          <div 
            className="absolute right-0 top-0 w-1/3 h-full z-30"
            style={{
              background: `linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent)`
            }}
          />
          
          {/* Center Transparent Area */}
          <div className="absolute left-1/3 top-0 w-1/3 h-full z-30" />
          
          {/* Bottom Gradient */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/3 z-30"
            style={{
              background: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3), transparent)`
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

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  href="/technical"
                  className="inline-flex items-center gap-2 bg-white text-neutral-dark px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group"
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  <span>Technical Documentation</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-neutral-dark px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group"
                >
                  <span>Get a Quote</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Color Options Section */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 lg:hidden block"
              >
                <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                  <SwatchIcon className="w-3 h-3" />
                  {product.colorOptions.length === 2 ? "Color Options" : "Profiles"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                  {product.colorOptions.length === 2 ? "See Colours Below" : "See Profiles Below"}
                </h2>
              </motion.div>

              <div className="flex lg:gap-8 flex-col lg:flex-row gap-0 justify-center">
                <div className={`grid grid-cols-1 shrink-0 w-full ${product.colorOptions.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8 max-w-4xl mx-auto mb-12`}>
                  {product.colorOptions.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300">
                        <div className="mb-4 relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          <Image
                            src={option.image}
                            alt={option.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-contain transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-dark mb-2 text-center">
                          {option.name}
                        </h3>
                        {option.thickness ? (
                          <p className="text-sm text-neutral-dark/70 text-center">
                            Thickness: {option.thickness}
                          </p>
                        ) : (
                          <p className="text-sm text-neutral-dark/70 text-center">
                            {product.colorOptions.length === 2 
                              ? "Available in 6\" (1.5cm) thickness"
                              : "Available in ESD version"}
                          </p>
                        )}
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
                      {product.colorOptions.length === 2 ? "Colors" : "Profiles"}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark">
                      {product.colorOptions.length === 2 ? "Colour Options Available" : "Profile Options Available"}
                    </h2>
                  </motion.div>
                  <p className="text-base text-neutral-dark/70 leading-relaxed">
                    {product.colorOptions.length === 2 
                      ? "Choose from our two premium color options, both available in 6\" (1.5cm) thickness. Both options maintain the same high-performance standards and durability."
                      : "Choose from our three premium profile options, all available in ESD version. All profiles maintain the same high-performance standards and durability."}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        )}

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
                Key Benefits
              </h2>
            </motion.div>

            {/* Images Row */}
            {benefitImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`grid grid-cols-2 ${benefitImages.length === 3 ? 'md:grid-cols-3' : benefitImages.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'} gap-4 mb-10 sm:mb-12 max-w-5xl mx-auto`}
              >
                {benefitImages.map((num) => (
                  <div
                    key={num}
                    className="relative w-full aspect-square border border-gray-200 rounded-lg overflow-hidden bg-primary/10"
                  >
                    <Image
                      src={`/assets/products Page/${imageFolder}/${num}.png`}
                      alt={`Benefit image ${num}`}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                ))}
              </motion.div>
            )}

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

        {/* Size & Length Section */}
        {product.sizes && (
          <section className="bg-gray-50 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
                  <SparklesIcon className="w-3 h-3" />
                  Sizes
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
                  Available Sizes
                </h2>
                <p className="text-sm text-neutral-dark/70 max-w-3xl mx-auto">
                  Choose from standard widths and lengths, or request custom sizes to fit your specific requirements.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Widths */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white border-l border-r border-primary/20 p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-dark">Widths</h3>
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <ArrowsRightLeftIcon className="w-5 h-5 text-neutral-dark" />
                    </div>
                  </div>
                  <p className="text-base text-neutral-dark/70 mb-6 leading-relaxed">
                    {product.sizes.widths} These standard widths are designed to accommodate most workspace configurations.
                  </p>
                </motion.div>

                {/* Standard Lengths */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white border-l border-r border-primary/20 p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-dark">Standard Lengths</h3>
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <ListBulletIcon className="w-5 h-5 text-neutral-dark" />
                    </div>
                  </div>
                  <p className="text-base text-neutral-dark/70 mb-6 leading-relaxed">
                    {product.sizes.standardLengths} These standard lengths are available for immediate order.
                  </p>
                </motion.div>

                {/* Custom Sizes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white border-l border-r border-primary/20 p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-dark">Custom Sizes</h3>
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <WrenchScrewdriverIcon className="w-5 h-5 text-neutral-dark" />
                    </div>
                  </div>
                  <p className="text-base text-neutral-dark/70 mb-6 leading-relaxed">
                    {product.sizes.customSizes} We can manufacture mats in any length to fit your workspace.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Warranty Card Section */}
        {product.warranty && (
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
                            alt={`${product.warranty.title} Badge`}
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
        )}
      </main>

      <Footer />
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  );
}

