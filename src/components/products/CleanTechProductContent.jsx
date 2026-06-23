'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImageZoom from "@/src/components/ui/ImageZoom";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  SparklesIcon,
  BoltIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  CubeIcon,
  CalendarIcon,
  ScaleIcon,
  ArrowDownTrayIcon,
  SwatchIcon,
  PhotoIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  MapPinIcon,
  UserGroupIcon,
  SquaresPlusIcon,
  HeartIcon,
  GlobeAmericasIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";

const WaterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={props.className}
    {...props}
  >
    <path d="M0 0h512v512H0z" fill="none" />
    <path
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M400 320c0 88.37-55.63 144-144 144s-144-55.63-144-144c0-94.83 103.23-222.85 134.89-259.88a12 12 0 0 1 18.23 0C296.77 97.15 400 225.17 400 320Z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M344 328a72 72 0 0 1-72 72"
    />
  </svg>
);

const iconMap = {
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  CubeIcon,
  CalendarIcon,
  ScaleIcon,
  CircleStackIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  MapPinIcon,
  UserGroupIcon,
  SquaresPlusIcon,
  HeartIcon,
  GlobeAmericasIcon,
  CpuChipIcon,
  CheckBadgeIcon,
  WaterIcon
};

export default function CleanTechProductContent({ product }) {
  const [activeImage, setActiveImage] = useState(product.image);

  // Sync active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
  }, [product.image]);

  const benefits = product.benefits?.map((benefit) => ({
    ...benefit,
    icon: iconMap[benefit.icon] || CheckBadgeIcon,
  })) || [];

  const specCards = product.isEquipment ? [
    product.specs.waterConsumption && {
      title: "Water Consumption",
      description: product.specs.waterConsumption,
      icon: BeakerIcon
    },
    product.specs.electrical && {
      title: "Electrical Connection",
      description: product.specs.electrical,
      icon: BoltIcon
    },
    product.specs.plumbing && {
      title: "Plumbing Requirements",
      description: product.specs.plumbing,
      icon: WrenchScrewdriverIcon
    },
    product.specs.drain && {
      title: "Drainage Requirements",
      description: product.specs.drain,
      icon: CircleStackIcon
    },
    product.specs.solutionsRequired && {
      title: "Required Hand Hygiene Solution",
      description: product.specs.solutionsRequired,
      icon: CheckCircleIcon
    },
    product.specs.optionalSolutions && {
      title: "Optional SelfClean Solution",
      description: product.specs.optionalSolutions,
      icon: SparklesIcon
    }
  ].filter(Boolean) : [
    product.specs.size && {
      title: "Packaging Size",
      description: product.specs.size,
      icon: CubeIcon
    },
    product.specs.properties && {
      title: "Chemical Properties",
      description: (
        <div className="space-y-1.5 mt-1 text-inherit">
          <div><strong>Appearance:</strong> {product.specs.properties.appearance}</div>
          <div><strong>Specific Gravity:</strong> {product.specs.properties.specificGravity}</div>
          <div><strong>pH:</strong> {product.specs.properties.pH}</div>
          <div><strong>Odor:</strong> {product.specs.properties.odor}</div>
          <div><strong>Stability:</strong> {product.specs.properties.stability}</div>
        </div>
      ),
      icon: BeakerIcon
    },
    product.specs.shippingWeight && {
      title: "Shipping Logistics",
      description: (
        <ul className="list-disc pl-4 space-y-1 mt-1 text-inherit">
          {product.specs.shippingWeight.map((w, index) => (
            <li key={index}>{w}</li>
          ))}
        </ul>
      ),
      icon: ScaleIcon
    },
    product.specs.shelfLife && {
      title: "Shelf Stability",
      description: product.specs.shelfLife,
      icon: CalendarIcon
    }
  ].filter(Boolean);

  return (
    <main className="grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center pt-28 pb-20 bg-linear-to-b from-indigo-900 via-[#0047AB] to-blue-800 text-white border-b border-indigo-950/35">
        {/* Overlay circle pattern */}
        <div
          className="absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        />

        {/* Soft background accents (moving aura) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-48 -right-24 w-120 h-120 bg-indigo-400 rounded-full blur-3xl pointer-events-none"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-md text-xs font-medium mb-6 backdrop-blur-md shadow-sm"
              >
                <SparklesIcon className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
                <span>{product.subtitle}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white drop-shadow-sm"
              >
                {product.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base text-justify sm:text-lg text-white leading-relaxed max-w-2xl"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-md group"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#specifications"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3.5 rounded-lg font-semibold transition-all shadow-xs"
                >
                  <span>Technical Specs</span>
                </a>
              </motion.div>
            </div>

            {/* Right Product Image & Gallery */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative group w-full max-w-md sm:max-w-lg">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl group-hover:bg-white/30 transition-all duration-500 pointer-events-none" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative"
                >
                  {/* Main Image View */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                    <ImageZoom src={activeImage} alt={product.title}>
                      <img
                        src={activeImage}
                        alt={product.title}
                        className="w-full h-full object-contain p-2 hover:scale-[1.02] transition-transform duration-500"
                      />
                    </ImageZoom>
                  </div>

                  {/* Thumbnails */}
                  {product.gallery && product.gallery.length > 1 && (
                    <div className="flex gap-3 justify-center overflow-x-auto py-1">
                      {product.gallery.map((imgUrl, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(imgUrl)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border-2 transition-all cursor-pointer ${activeImage === imgUrl ? "border-primary scale-105" : "border-slate-200 opacity-60 hover:opacity-100"
                            }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${product.title} Thumbnail ${i + 1}`}
                            className="w-full h-full object-cover p-1"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Overlay circle pattern */}
        <div
          className="absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.02] pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-6">
              <DocumentTextIcon className="w-3.5 h-3.5" />
              {product.isEquipment ? "Engineering Details" : "Chemical Properties"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">Technical Specifications</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4">
              Fully compliant, heavy-duty industrial specifications designed for sterile and high-capacity facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {specCards.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white hover:bg-accent shadow-md border border-gray-200 rounded-xl p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-dark flex-1 transition-colors duration-300 group-hover:text-white">
                        {spec.title}
                      </h3>
                      {/* Spacer to maintain layout when icon moves */}
                      <div className="w-10 h-10 shrink-0" />
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed mb-6 grow transition-colors duration-300 group-hover:text-white/80">
                      {spec.description}
                    </div>
                  </div>

                  {/* Animated Icon Container (Top Right) */}
                  <div className="absolute right-8 top-8 w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-white group-hover:scale-150 group-hover:rounded-bl-3xl group-hover:rounded-br-none group-hover:rounded-tl-none group-hover:h-14 group-hover:right-0 group-hover:top-0 z-0">
                    <div className="text-white transition-transform duration-500 group-hover:text-primary group-hover:scale-75 group-hover:translate-y-1 group-hover:-translate-x-1">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Decorative Animated Element (Bottom Left) */}
                  <div className="w-8 h-8 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0">
                  </div>
                  <div className="w-14 h-14 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0">
                  </div>
                  <div className="w-20 h-20 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:h-8 bg-white/30 z-0">
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Key Features & Benefits Grid */}
      <section className="relative overflow-hidden py-20 bg-linear-to-b from-indigo-900 via-[#0047AB] to-blue-800 text-white border-y border-indigo-950/35">
        {/* Overlay circle pattern */}
        <div
          className="absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        />

        {/* Soft background accents (moving aura) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-48 -right-24 w-120 h-120 bg-indigo-400 rounded-full blur-3xl pointer-events-none"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Features Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded text-xs font-medium mb-6 backdrop-blur-md shadow-sm">
                  <Cog6ToothIcon className="w-3.5 h-3.5 text-indigo-200" />
                  System Features
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Functional Advantages</h2>
              </div>

              <div className="space-y-4">
                {product.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-1 border border-white/20 shadow-sm">
                      <svg className="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white text-base leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Static visual representation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 bg-white border border-slate-200/50 rounded-3xl p-6 relative overflow-hidden aspect-[4/3] flex items-center justify-center shadow-xl"
            >
              <img
                src={product.gallery && product.gallery.length > 1 ? product.gallery[1] : product.image}
                alt={product.title}
                className="max-h-[90%] max-w-[90%] object-contain rounded-xl drop-shadow-lg"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-neutral-dark px-3 py-1.5 rounded text-xs font-medium mb-4">
                <SparklesIcon className="w-3.5 h-3.5" />
                Value Delivered
              </span>
              <h2 className="text-3xl font-bold text-slate-900">Key Benefits</h2>
            </div>

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
                    <div className="flex-1 min-w-0 pr-4 group-hover:z-50">
                      <h3 className="text-base sm:text-lg font-semibold transition-colors group-hover:text-white text-neutral-900 mb-1.5">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-sm transition-colors group-hover:text-white/80 text-neutral-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                    <div className="relative shrink-0">
                      <div className="absolute group-hover:-left-1/2 group-hover:z-0 group-hover:-top-1/2 group-hover:scale-500 group-hover:-translate-x-1/2 transition-all group-hover:bg-linear-to-br to-primary from-indigo-500 duration-600 group-hover:-translate-y-3 inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl group-hover:bg-white group-hover:text-indigo-700 bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-dark font-medium">
                  ORDER NOW
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-neutral-dark leading-tight">
                Get a Custom Quote for Your Facility
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-xs flex items-center gap-3 bg-linear-to-bl from-accent/60 via-accent/75 to-accent rounded-md px-5 py-1 w-fit sm:text-sm text-white leading-relaxed">
                <span className="w-3 h-3 inline-block rounded-full bg-white" />
                If you need custom installation or layout guidance, contact us today.
              </p>
              <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                Get a free, no-obligation quote tailored to your specific contamination control and hygiene requirements. Our experts will help you determine the optimal configuration and solutions for your facility.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-primary/90 transition-all duration-300 group"
                >
                  <span>Request a Quote</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
