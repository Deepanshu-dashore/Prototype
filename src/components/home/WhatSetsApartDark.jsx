"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckBadgeIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import DotGrid from "../share/DotGrid";

export default function WhatSetsApartDark() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Global section transforms for perfect sync
  const opacityGrid = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );
  const yGrid = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

  const certifications = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          className="group-hover:bg-white group-hover:text-indigo-700"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M22 42c-9.941 0-18-8.059-18-18S12.059 6 22 6m22 36c-9.941 0-18-8.059-18-18S34.059 6 44 6M26 24h11"
          ></path>
        </svg>
      ),
      iconify: true,
      title: "CE Marked",
      description:
        "European Conformity certification ensuring our products meet EU safety, health, and environmental protection standards.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          className="group-hover:bg-white group-hover:text-indigo-700"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M161.563 19.28c10.093 10.734 16.743 23.678 20.562 37.657c6.202 22.707 5.806 48.148 3.72 74.094c-4.176 51.894-14.58 106.512-2.44 140.407c11.396 31.814 29.668 50.71 49.94 60c8.72 3.998 17.9 6.21 27.186 6.782c22.195-65.084 17.46-148.144-19.06-204.283c48.352 48.234 71.19 121.068 56.436 197.407l-8.78 3.53a90 90 0 0 0 8.093-2.843c41.783-16.87 75.975-66.253 61.75-138.655c-6.536-33.265-28.966-80.165-66.5-116.5c-32.472-31.432-75.827-55.212-130.908-57.594zM445.53 202.813c-.84 12.1-4.638 23.528-10.56 33.907c-10.353 18.14-26.448 33.757-43.876 48.593c-34.856 29.67-75.057 57.156-88.313 85.218c-12.555 26.583-12.884 49.252-6.186 67.283a65.9 65.9 0 0 0 12.625 20.968c53.708-26.787 101.73-80.91 113.81-138.03c.076 59.646-30.63 118.687-86.624 156.906c35.802 14.545 86.282 5.034 121.72-47.75c16.418-24.456 31.558-67.3 30.812-112.875c-.634-38.688-12.264-79.23-43.407-114.217zm-424.874 73.47c-9.483 45.878.708 86.832 19.5 120.656c22.136 39.84 56.682 69.376 83.125 82.343c57.07 27.988 105.514 10.968 129.25-19.53c-67.59-5.1-123.692-40.873-153.436-92.563c39.02 43.428 107.658 66.29 167.562 62.625a65.8 65.8 0 0 0 .47-24.468c-3.214-18.965-14.87-38.447-39.032-55.188c-25.505-17.67-74.045-21.36-119.063-29.625c-22.508-4.13-44.247-9.59-62.28-20.124c-10.323-6.03-19.314-14.06-26.094-24.125z"
          ></path>
        </svg>
      ),
      iconify: true,
      title: "VOC tested",
      description:
        "Free from Volatile Organic Compounds, ensuring safe indoor air quality and environmental responsibility.",
    },
    {
      icon: SparklesIcon,
      title: "REACH compliance",
      description:
        "Fully compliant with Biocidal Products Regulation and Environmental Protection Agency standards for safety and efficacy.",
    },
    {
      icon: ChartBarIcon,
      title: "Particulate Study Results",
      description:
        "Scientifically validated through rigorous particulate contamination studies, proving Up to 99% effectiveness.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          className="group-hover:bg-white group-hover:text-indigo-700"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M24 21h-3a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2m-3-8v6h3v-6Zm-6 8h-5v-2h5v-2h-3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h5v2h-5v2h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2M6 11h2v10H6z"
          ></path>
          <path
            fill="#fff"
            d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2M4 24V8h24v16Z"
          ></path>
        </svg>
      ),
      title: "ISO Certified",
      iconify: true,
      description:
        "ISO 9001:2015 (Quality Management) and ISO 45001:2018 (Occupational Health & Safety) certified operations.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          className="group-hover:bg-white group-hover:text-indigo-700"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M34.62 45.412c4.51.163 8.794-2.466 10.096-7.038c1.116-3.92 2.33-9.713 2.771-17.29c.26-4.449-3.39-8.06-7.805-7.852c-3.559.168-6.796.44-8.805.628l-.21-4.18c-.134-2.702-1.547-5.928-4.979-6.703a26 26 0 0 0-2.843-.463c-3.1-.346-5.748 1.65-6.715 4.358l-2.82 7.893a4.8 4.8 0 0 0-1.052-.355a18.4 18.4 0 0 0-3.873-.4c-1.534 0-2.84.178-3.873.4c-2.5.538-3.805 2.783-3.867 4.91A362 362 0 0 0 .5 29.743c0 4.549.08 8.206.145 10.421c.062 2.128 1.366 4.373 3.867 4.911c1.032.222 2.34.4 3.873.4s2.841-.178 3.873-.4a4.66 4.66 0 0 0 2.487-1.416q.341.051.819.117c1.028.143 2.517.338 4.368.545c3.7.415 8.857.882 14.688 1.092m-18.484-5.596c.996.139 2.442.327 4.242.53c3.625.406 8.679.863 14.386 1.069c2.915.105 5.372-1.56 6.105-4.136c1.04-3.656 2.202-9.16 2.625-16.427c.119-2.04-1.544-3.722-3.624-3.624c-4.985.235-9.336.678-10.412.793a2.25 2.25 0 0 1-2.485-2.126l-.3-6.015c-.09-1.785-.914-2.786-1.866-3.001a22 22 0 0 0-2.406-.39c-1.02-.114-2.078.533-2.505 1.729l-3.742 10.477l-.06.17q.024.23.032.456c.064 2.215.145 5.872.145 10.421c0 4.319-.073 7.834-.135 10.074m-5.75-4.19a2 2 0 0 0-4 0v1.962a2 2 0 1 0 4 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      iconify: true,
      title: "Quality Assurance",
      description:
        "Comprehensive quality control processes ensuring consistent performance and reliability across all products.",
    },
    // {
    //   icon: RocketLaunchIcon,
    //   title: 'Industry Leading',
    //   description: 'Recognized as industry leaders in contamination control technology with proven track record.',
    // },
    // {
    //   icon: StarIcon,
    //   title: 'Premium Materials',
    //   description: 'Advanced high-tech polymer construction delivering superior durability and contamination control performance.',
    // },
    {
      icon: CheckBadgeIcon,
      title: "2 Year Warranty",
      description:
        "All products backed by comprehensive 2-year replacement warranty for complete peace of mind.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          className="group-hover:bg-white group-hover:text-indigo-700"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path
              d="M7 10c0-1.414 0-2.121.44-2.56C7.878 7 8.585 7 10 7h4c1.414 0 2.121 0 2.56.44c.44.439.44 1.146.44 2.56v4c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44h-4c-1.414 0-2.121 0-2.56-.44C7 16.122 7 15.415 7 14z"
              opacity={0.5}
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.429 10L11 12h2l-1.429 2"
            ></path>
            <path d="M4 12c0-3.771 0-5.657 1.172-6.828S8.229 4 12 4s5.657 0 6.828 1.172S20 8.229 20 12s0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12Z"></path>
            <path
              strokeLinecap="round"
              d="M4 12H2m20 0h-2M4 9H2m20 0h-2M4 15H2m20 0h-2m-8 5v2m0-20v2M9 20v2M9 2v2m6 16v2m0-20v2"
              opacity={0.5}
            ></path>
          </g>
        </svg>
      ),
      iconify: true,
      title: "Static Dissipative",
      description:
        "ESD-safe materials that safely dissipate static electricity, protecting sensitive electronics and preventing electrostatic discharge.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gray-50"
    >
      {/* Geometric floating shapes */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#5360ff20"
            activeColor="#a4aef8"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        {/* Large circle - top left */}
        <motion.div
          className="absolute hidden md:block -top-32 left-10 w-80 h-80 rounded-full bg-blue-200/25"
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium circle - top right */}
        <motion.div
          className="absolute hidden md:block -top-32 right-20 w-64 h-64 rounded-full bg-blue-200/20"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Small circle - bottom */}
        <motion.div
          className="absolute -bottom-20 left-1/3 w-48 h-48 rounded-full bg-indigo-200/20"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional accent circle */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-primary/15"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Decorative dots pattern */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-40">
          <div className="grid grid-cols-6 gap-3">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <motion.div
          style={{ opacity: opacityGrid, y: yGrid }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark mb-3">
            What sets <span className="text-primary">CCMatting</span> apart
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-3xl mx-auto">
            Technically superior designs that redefine contamination control
            standards.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: opacityGrid, y: yGrid }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon;

            return (
              <div
                key={cert.title}
                className="relative group overflow-hidden flex items-center justify-between p-5 sm:p-6 border group border-gray-200 rounded-2xl bg-white shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                {/* Content - Preserving Design */}
                <div className="flex-1 min-w-0 pr-4 group-hover:z-50">
                  <h3 className="text-lg sm:text-xl font-semibold transition-colors group-hover:text-white text-neutral-900 mb-1.5 capitalize">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm transition-colors group-hover:text-white/80 text-neutral-700 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Icon area - Preserving Design */}
                <div className="relative shrink-0">
                  <div className="absolute group-hover:-left-1/2 group-hover:z-0 group-hover:-top-1/2 group-hover:scale-500 group-hover:-translate-x-1/2  transition-all group-hover:bg-linear-to-br to-primary from-indigo-500 duration-600 group-hover:-translate-y-3 inset-0 translate-x-6 translate-y-2 w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl group-hover:bg-white group-hover:text-indigo-700 bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                    {cert.iconify ? (
                      cert.icon
                    ) : (
                      <Icon
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
