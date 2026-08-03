"use client";

import PublicLayout from "@/src/components/share/PublicLayout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DotGrid from "@/src/components/share/DotGrid";
import {
  ShieldCheckIcon,
  BeakerIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function BiomasterPage() {
  return (
    <PublicLayout>
      <main className="grow">
        {/* Hero Section */}
        <section className="relative text-white py-20 lg:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #0047AB 50%, #1e40af 100%)" }}>
          <div
            className="absolute inset-0 bg-repeat opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "url('/circle-pattern.svg')" }}
            aria-hidden="true"
          />

          {/* Animated background elements */}
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
                  <ShieldCheckIcon className="w-4 h-4" />
                  Antimicrobial Protection
                </span>
                <h1 className="text-4xl sm:text-4xl text-nowrap lg:text-5xl font-bold mb-6 leading-tight">
                  Biomaster™ <br />
                  <span className="text-indigo-200">
                    Antimicrobial Technology
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-indigo-100/90 leading-relaxed max-w-xl mb-8">
                  CCMatting products incorporate Addmaster's world-leading
                  antimicrobial solution directly into the polymer composition
                  for permanent protection.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-indigo-50 transition-all duration-300 shadow-xl"
                  >
                    Request Details
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl group-hover:bg-white/30 transition-all duration-500" />
                  <div className="relative bg-white/90 p-12 sm:p-16 rounded-3xl shadow-2xl border-6 border-black/15 flex items-center justify-center aspect-4/3 w-64 sm:w-80 lg:w-lg">
                    <Image
                      src="/biomasterLogo.png"
                      alt="Biomaster Logo"
                      width={400}
                      height={400}
                      className="object-cover scale-120"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* DotGrid Background */}
          <div className="absolute inset-0 pointer-events-none">
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8"
              >
                The Biomaster™ Advantage
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-lg text-neutral-600 leading-relaxed"
              >
                <p>
                  CCMatting products incorporate{" "}
                  <strong className="text-primary font-semibold">
                    "Biomaster™ Antimicrobial Technology"
                  </strong>{" "}
                  from Addmaster as an integral part of their polymer
                  composition.
                </p>
                <p>
                  This advanced antimicrobial solution inhibits the growth of
                  bacteria, fungi, mould, and other microorganisms, supporting
                  cleaner products, safer processes, and more controlled
                  environments.
                </p>
              </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "24/7 Protection",
                  desc: "Active antimicrobial protection that works around the clock to inhibit microbial growth.",
                  icon: ClockIcon,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "Permanent Integration",
                  desc: "Integrated as an integral part of the polymer composition, it won't wash off or wear away.",
                  icon: CheckBadgeIcon,
                  color: "bg-indigo-100 text-indigo-600",
                },
                {
                  title: "Proven Efficacy",
                  desc: "Inhibits the growth of bacteria, fungi, and mould including common pathogens.",
                  icon: BeakerIcon,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  title: "Cleaner Environment",
                  desc: "Supports cleaner products and more controlled environments for sensitive processes.",
                  icon: SparklesIcon,
                  color: "bg-emerald-100 text-emerald-600",
                },
                {
                  title: "Safer Processes",
                  desc: "Reduces the risk of cross-contamination in critical production areas.",
                  icon: ShieldCheckIcon,
                  color: "bg-orange-100 text-orange-600",
                },
                {
                  title: "Global Expertise",
                  desc: "Leveraging world-leading technology from Addmaster, a leader in antimicrobial solutions.",
                  icon: GlobeAltIcon,
                  color: "bg-cyan-100 text-cyan-600",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white hover:bg-accent shadow-md border border-gray-200 rounded-xl p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-dark flex-1 transition-colors duration-300 group-hover:text-white">
                        {feature.title}
                      </h3>
                      <div className="w-12 h-12 shrink-0" />
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed grow transition-colors duration-300 group-hover:text-white/80">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Animated Icon Container (Top Right) */}
                  <div className="absolute right-8 top-8 w-12 h-12 rounded-lg bg-primary flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-white group-hover:scale-150 group-hover:rounded-bl-3xl group-hover:rounded-br-none group-hover:rounded-tl-none group-hover:h-16 group-hover:right-0 group-hover:top-0 z-0">
                    <div className="text-white transition-transform duration-500 group-hover:text-primary group-hover:scale-75 group-hover:translate-y-1 group-hover:-translate-x-1">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Decorative Animated Elements */}
                  <div className="w-8 h-8 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none bg-white/30 z-0"></div>
                  <div className="w-14 h-14 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none bg-white/20 z-0"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section: How It Works */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                How It Works
              </h2>
              <p className="text-lg text-neutral-600">
                Biomaster is based on silver ion technology, which has three
                distinct modes of action that target microbial contaminants
                simultaneously.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  step: "01",
                  title: "Disrupt Cell Wall",
                  desc: "When microbes come into contact with a Biomaster protected surface, silver ions disrupt the bacteria cell wall, preventing growth.",
                  icon: ShieldCheckIcon,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  step: "02",
                  title: "Interrupt Energy",
                  desc: "The silver ions interrupt enzyme production, stopping the cell from producing energy and surviving.",
                  icon: SparklesIcon,
                  color: "text-indigo-600",
                  bg: "bg-indigo-50",
                },
                {
                  step: "03",
                  title: "Interfere DNA",
                  desc: "Finally, the ions interfere with the cell's DNA, preventing replication and eliminating the threat entirely.",
                  icon: BeakerIcon,
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group p-8 bg-neutral-50 rounded-2xl border border-neutral-200/60 hover:border-primary/40 hover:bg-white hover:shadow-2xl transition-all duration-500"
                >
                  <span className="absolute top-4 right-6 text-5xl font-bold text-neutral-200/40 group-hover:text-primary/10 transition-colors">
                    {item.step}
                  </span>
                  <div
                    className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10 flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                <p className="text-lg lg:text-xl text-neutral-800 leading-relaxed italic">
                  "This triple-action approach makes Biomaster highly effective
                  against most types of harmful bacteria and fungi, providing a
                  permanent and resilient shield for your facility."
                </p>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping [animation-duration:3s]" />
                  <div className="relative bg-white p-6 rounded-full shadow-xl border border-primary/10">
                    <ShieldCheckIcon className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-16 sm:py-20">
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
                <p className="text-sm flex items-center gap-3 bg-linear-to-bl from-accent/60 via-accent/75 to-accent rounded-md px-5 py-1 w-fit sm:text-base text-white leading-relaxed">
                  <span className="w-3 h-3 inline-block rounded-full bg-white"></span>
                  If you want an alternative size, call us directly for custom
                  sizing.
                </p>
                <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                  Get a free, no-obligation quote tailored to your specific
                  contamination control requirements. Our experts will help you
                  determine the optimal mat configuration and sizing for your
                  facility.
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
    </PublicLayout>
  );
}
