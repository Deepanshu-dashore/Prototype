'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DotGrid from "@/src/components/share/DotGrid";
import {
  ServerIcon,
  ServerStackIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  BoltIcon,
  ArrowRightIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  ArrowsRightLeftIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  BuildingOffice2Icon,
  ChevronRightIcon,
  ChartBarIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  FunnelIcon,
  QueueListIcon,
  DocumentCheckIcon,
  AdjustmentsHorizontalIcon,
  ScaleIcon,
  RectangleGroupIcon,
  CloudIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";

export default function DataCenterContent() {
  const stats = [
    {
      value: "99%",
      title: "PARTICULATE TRAP RATE",
      subtitle: "Removes footfall and caster micro-contaminants at entrances.",
      icon: FunnelIcon,
      accent: "text-blue-600"
    },
    {
      value: "ISO 5",
      title: "CLEANLINESS SUPPORT",
      subtitle: "Helps maintain compliance for GPU & high-density compute halls.",
      icon: CheckBadgeIcon,
      accent: "text-indigo-600"
    },
    {
      value: (
        <>
          10<sup>10</sup> Ω
        </>
      ),
      title: "ESD DISSIPATIVE",
      subtitle: "Safely dissipates static build-up on foot traffic & equipment.",
      icon: BoltIcon,
      accent: "text-purple-600"
    }
  ];

  const multiZones = [
    {
      step: "1",
      title: "Airlocks & Mantraps",
      description: "Intercepts 99% of raw environmental particulate from footwear before reaching internal corridors.",
      focus: "Primary Footfall Interception",
      icon: QueueListIcon
    },
    {
      step: "2",
      title: "Staging Areas",
      description: "Strips rubber dust and debris from trolley casters, server carts, and unboxing tools.",
      focus: "Wheeled Equipment Stripping",
      icon: WrenchScrewdriverIcon
    },
    {
      step: "3",
      title: "Raised Access Floor",
      description: "Seals transition tiles to prevent dust migration into lower plenum air channels.",
      focus: "Plenum Protection Tile",
      icon: ServerStackIcon
    },
    {
      step: "4",
      title: "Data Hall Core",
      description: "Sustains ISO Class 5 conditions, protecting server chips, GPUs, and optical links.",
      focus: "Hardware Uptime Core",
      icon: CpuChipIcon
    }
  ];

  const benefitsEcosystem = [
    {
      title: "Reduced Airborne Particles",
      desc: "Minimizes contamination and creates a cleaner, healthier compute environment.",
      icon: CloudIcon
    },
    {
      title: "Lower Maintenance Costs",
      desc: "Fewer breakdowns and less wear translate into reduced operational and maintenance expenses.",
      icon: ChartBarIcon
    },
    {
      title: "Improved Cooling Efficiency",
      desc: "Optimized airflow and reduced heat load lead to better cooling performance and energy efficiency.",
      icon: FireIcon
    },
    {
      title: "Longer Server Lifespan",
      desc: "Cleaner systems run cooler and last longer, protecting your hardware investment.",
      icon: ServerIcon
    },
    {
      title: "Energy Savings",
      desc: "Efficient cooling and reliable systems consume less energy, helping you save more.",
      icon: BanknotesIcon
    },
    {
      title: "Maximum Uptime",
      desc: "Reliable infrastructure and minimal downtime ensure your business runs without interruption.",
      icon: ClockIcon
    }
  ];

  const installationPoints = [
    {
      title: "Server Air Locks",
      desc: "Primary decontamination threshold before entering active server suites.",
      icon: ShieldCheckIcon,
      bg: "bg-blue-50",
      color: "text-blue-600"
    },
    {
      title: "Rack Entry & Exit Zones",
      desc: "High-density compute halls requiring zero particle resuspension.",
      icon: CpuChipIcon,
      bg: "bg-indigo-50",
      color: "text-indigo-600"
    },
    {
      title: "Corridor & Cleanroom Entries",
      desc: "Transition points between admin spaces and controlled white space.",
      icon: BuildingOffice2Icon,
      bg: "bg-purple-50",
      color: "text-purple-600"
    },
    {
      title: "Equipment Staging Bays",
      desc: "Server unboxing and rack staging areas subject to heavy cart traffic.",
      icon: ServerStackIcon,
      bg: "bg-emerald-50",
      color: "text-emerald-600"
    },
    {
      title: "Raised Access Floor Entry Points",
      desc: "Sealing sub-floor plenum air inlets against falling dust and debris.",
      icon: ServerIcon,
      bg: "bg-orange-50",
      color: "text-orange-600"
    }
  ];

  return (
    <main className="grow bg-white text-slate-900 font-sans">
      {/* ─── SECTION 1: HERO (Dark Premium Design) ───────────────────────────── */}
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
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
                <ShieldCheckIcon className="w-4 h-4" />
                Critical Environment Protection
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Data Centre <span className="text-indigo-200">Contamination Control Matting</span>
              </h1>
              <p className="text-lg sm:text-xl text-indigo-100/90 leading-relaxed max-w-3xl mb-8">
                Safeguarding high-density compute, ISO Class 5 air quality, and operational uptime at the floor level with engineered entrance protection systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-indigo-50 transition-all duration-300 shadow-xl"
                >
                  Request Technical Survey
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <a
                  href="#preventative-architecture"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg font-bold transition-all duration-300"
                >
                  Explore Architecture
                  <ChevronRightIcon className="w-5 h-5 text-indigo-200" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: INTRO & STATS (Advantage Grid) ───────────────────────── */}
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
          <div className="max-w-5xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8"
            >
              The CC Matting Floor-Level Barrier Advantage
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border-l-4 border-primary rounded-r-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80 mb-12 text-left"
            >
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
                Modern data centers are the foundation of cloud computing, artificial intelligence, and enterprise operations, where uninterrupted uptime and environmental integrity are critical. Significant investment is made in advanced HVAC systems, precision cooling, and airflow management. However, one of the most overlooked contamination pathways exists at floor level, where particulate matter introduced by personnel and wheeled equipment can compromise hardware reliability and reduce equipment lifespan.
              </p>
            </motion.div>
          </div>

          {/* Stats Cards - Biomaster Styled */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
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
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-white flex-1">
                      <span className="text-primary group-hover:text-indigo-200 transition-colors duration-300 block text-3xl font-extrabold mb-1">
                        {stat.value}
                      </span>
                      {stat.title}
                    </h3>
                    <div className="w-12 h-12 shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed grow transition-colors duration-300 group-hover:text-white/80">
                    {stat.subtitle}
                  </p>
                </div>

                {/* Animated Icon Container (Top Right) */}
                <div className="absolute right-8 top-8 w-12 h-12 rounded-lg bg-primary flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-white group-hover:scale-150 group-hover:rounded-bl-3xl group-hover:rounded-br-none group-hover:rounded-tl-none group-hover:h-16 group-hover:right-0 group-hover:top-0 z-0">
                  <div className="text-white transition-transform duration-500 group-hover:text-primary group-hover:scale-75 group-hover:translate-y-1 group-hover:-translate-x-1">
                    <stat.icon className="w-6 h-6" />
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

      {/* ─── SECTION 3: THREAT ANALYSIS ─────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Risk Analysis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Biggest Threat Starts at Floor Level
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Dust particles tracked in on footwear and cart casters are drawn into server rack intakes by high-velocity cooling fans, causing overheating and component degradation.
            </p>
          </div>

          {/* Client Diagram Image 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white rounded-3xl p-4 border border-slate-200 shadow-xl max-w-5xl mx-auto overflow-hidden"
          >
            <Image
              src="/assets/industries/datacenter_floor_threat.jpg"
              alt="The Biggest Threat Starts at Floor Level"
              width={800}
              height={500}
              layout="responsive"
              className="rounded-2xl object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200/60 shadow-xs hover:border-primary/30 transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                Financial &amp; Service Level Impact
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The financial consequences of unmanaged contamination in a modern data facility are severe. Unplanned downtime directly threatens service level agreements, customer confidence, and operational revenue.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200/60 shadow-xs hover:border-primary/30 transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0047AB]" />
                ISO 14644-1 Class 5 Warranties
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hardware manufacturers and cloud infrastructure providers are increasingly establishing stringent ambient environmental standards, such as ISO 14644-1 Class 5 cleanliness standards, as mandatory prerequisites for equipment warranties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: MULTI-ZONE ARCHITECTURE ─────────────────────────────── */}
      <section id="preventative-architecture" className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
              <BuildingOffice2Icon className="w-4 h-4" />
              Proactive Barrier Strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Preventative Multi-Zone Contamination Barrier Architecture
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Sustaining ISO Class 5 conditions inside active data halls requires limiting airborne particulate counts through a robust, proactive floor-level barrier strategy.
            </p>
          </div>

          {/* 4 Multi-Zone Cards - Biomaster Styled */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {multiZones.map((zone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative bg-white hover:bg-accent shadow-md border border-gray-200 rounded-xl p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <span className="w-9 h-9 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center shadow-xs transition-colors duration-300 group-hover:bg-white group-hover:text-primary mb-3">
                        {zone.step}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-white mb-1.5">
                        {zone.title}
                      </h3>
                      <p className="text-[11px] font-bold text-[#0047AB] uppercase tracking-wider transition-colors duration-300 group-hover:text-indigo-200">
                        {zone.focus}
                      </p>
                    </div>
                    <div className="w-12 h-12 shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed grow transition-colors duration-300 group-hover:text-white/80">
                    {zone.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-200/80 group-hover:border-white/25 flex items-center justify-between text-xs text-slate-500 font-medium transition-colors duration-300 group-hover:text-white/60">
                    <span>Zone {zone.step} Protection</span>
                    <ChevronRightIcon className="w-4 h-4 text-[#0047AB] group-hover:text-white" />
                  </div>
                </div>

                {/* Animated Icon Container (Top Right) */}
                <div className="absolute right-8 top-8 w-12 h-12 rounded-lg bg-primary flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-white group-hover:scale-150 group-hover:rounded-bl-3xl group-hover:rounded-br-none group-hover:rounded-tl-none group-hover:h-16 group-hover:right-0 group-hover:top-0 z-0">
                  <div className="text-white transition-transform duration-500 group-hover:text-primary group-hover:scale-75 group-hover:translate-y-1 group-hover:-translate-x-1">
                    <zone.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Decorative Animated Elements */}
                <div className="w-8 h-8 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none bg-white/30 z-0"></div>
                <div className="w-14 h-14 opacity-0 group-hover:opacity-100 rounded-md absolute left-0 bottom-0 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rounded-tr-3xl group-hover:rounded-tl-none group-hover:rounded-br-none bg-white/20 z-0"></div>
              </motion.div>
            ))}
          </div>

          {/* Client Diagram Image 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xl max-w-5xl mx-auto overflow-hidden mb-12"
          >
            <Image
              src="/assets/industries/datacenter_contamination_pathway.jpg"
              alt="Contamination Pathway - How external particulates enter controlled environments"
              width={800}
              height={500}
              layout="responsive"
              className="rounded-2xl object-cover"
            />
          </motion.div>

          {/* Technical Directive Callout Banner - Biomaster Styled */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto rounded-3xl bg-primary/5 p-8 lg:p-12 border border-primary/10 flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="lg:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/60 text-[#0047AB] text-xs font-bold uppercase tracking-wider mb-4">
                <DocumentCheckIcon className="w-3.5 h-3.5 text-[#0047AB]" />
                <span>CC MATTING TECHNICAL DIRECTIVE</span>
              </div>
              <blockquote className="text-lg lg:text-xl text-neutral-800 leading-relaxed italic">
                “Modern high-density data centers cannot rely on reactive sweeping or single-use adhesive sheets. Sustained facility protection requires a scientifically engineered, floor-level contamination barrier that captures <strong className="text-primary font-semibold">99% of incoming particulates</strong> at every critical access transition.”
              </blockquote>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping [animation-duration:3s]" />
                <div className="relative bg-white p-6 rounded-full shadow-xl border border-primary/10">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 5: ENGINEERED PROTECTION ───────────────────────────────── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              Engineered Protection
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Footwear &amp; Caster Retention vs. Airflow &amp; Thermal Protection
            </h2>
          </div>

          {/* Client Diagram Image 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xl max-w-5xl mx-auto overflow-hidden mb-12"
          >
            <Image
              src="/assets/industries/datacenter_particle_airflow_protection.png"
              alt="Footwear & Caster Particle Retention and Airflow & Thermal Protection"
              width={800}
              height={400}
              layout="responsive"
              className="rounded-2xl object-cover"
            />
          </motion.div>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed text-center bg-slate-50/80 rounded-2xl p-8 border border-slate-200/60 shadow-xs max-w-5xl mx-auto">
            To eliminate this threat, forward-thinking facility operators are implementing advanced data center entrance matting and comprehensive floor-level contamination control solutions. CC Matting specializes in delivering high-performance, engineered contamination control matting tailored specifically for demanding technical environments, cleanrooms, and data center flooring systems. Positioned strategically at key transition zones—including main hall entrances, mantraps, airlocks, raised access floor entry points, and equipment staging bays—CC Matting systems form an impenetrable preventative barrier against particle ingress.
          </p>
        </div>
      </section>

      {/* ─── SECTION 6: METHOD COMPARISON ────────────────────────────────────── */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
              <ArrowsRightLeftIcon className="w-4 h-4" />
              Direct Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Traditional Cleaning vs. Matting Prevention
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Unlike disposable adhesive mats or standard textile mats, CC Matting uses an advanced high-tack polymer surface to capture and retain up to 99% of fine particulates from footwear and equipment wheels.
            </p>
          </div>

          {/* Client Diagram Image 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xl max-w-5xl mx-auto overflow-hidden mb-12"
          >
            <Image
              src="/assets/industries/datacenter_cleaning_vs_matting.jpg"
              alt="Traditional Cleaning vs Matting Prevention Comparison"
              width={800}
              height={500}
              layout="responsive"
              className="rounded-2xl object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-primary/30 transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-indigo-600" />
                Electrostatic Discharge (ESD) Risks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Beyond particulate control, CC Matting also addresses electrostatic discharge (ESD) risks in data center environments. Its static-dissipative polymer formulation (10<sup>10</sup> &Omega;) safely dissipates static build-up from personnel and wheeled equipment.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-primary/30 transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ScaleIcon className="w-5 h-5 text-primary" />
                Operational Safety &amp; Durability
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operational safety and durability are essential in high-density facilities. Unlike adhesive peeling mats, CC Matting features an ultra-low-profile design with precision bevelled edges for smooth movement of heavy server racks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: BENEFITS ECOSYSTEM ──────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
              <RectangleGroupIcon className="w-4 h-4 text-primary" />
              Ecosystem Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Operational Benefits Ecosystem
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Comprehensive advantages across airflow, cooling efficiency, server lifespan, energy savings, maintenance costs, and facility uptime.
            </p>
          </div>

          {/* Client Diagram Image 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xl max-w-5xl mx-auto overflow-hidden mb-16"
          >
            <Image
              src="/assets/industries/datacenter_benefits_ecosystem.jpg"
              alt="Operational Benefits Ecosystem"
              width={800}
              height={500}
              layout="responsive"
              className="rounded-2xl object-cover"
            />
          </motion.div>

          {/* Benefits Grid - Biomaster Features Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitsEcosystem.map((feature, idx) => (
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

      {/* ─── SECTION 8: INSTALLATION POINTS ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-medium mb-4">
              <ShieldCheckIcon className="w-3.5 h-3.5" />
              Strategic Placement
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Recommended Installation Points for CC Data Centre Systems
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              By safeguarding critical entrances, mantraps, and server hall access points with CC Matting, data center managers ensure optimum cleanliness and satisfy stringent ISO criteria.
            </p>
          </div>

          {/* Installation Points Cards - Biomaster "How it Works" style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installationPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group p-8 bg-neutral-50 rounded-2xl border border-neutral-200/60 hover:border-primary/40 hover:bg-white hover:shadow-2xl transition-all duration-500"
                >
                  <span className="absolute top-4 right-6 text-5xl font-bold text-neutral-200/40 group-hover:text-primary/10 transition-colors">
                    {`0${idx + 1}`}
                  </span>
                  <div
                    className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: CTA SECTION (Biomaster Layout Align) ───────────────── */}
      <section className="bg-white border-t border-slate-100 py-16 sm:py-20">
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
                Protect Your Critical Infrastructure with CC Matting
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm flex items-center gap-3 bg-linear-to-bl from-accent/60 via-accent/75 to-accent rounded-md px-5 py-1 w-fit sm:text-base text-white leading-relaxed">
                <span className="w-3 h-3 inline-block rounded-full bg-white"></span>
                Contact our technical specialists today to arrange a site survey.
              </p>
              <p className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed">
                Get a free, no-obligation technical assessment tailored to your data center's specific contamination control and ESD requirements. Our experts will evaluate your layouts and identify the best configuration.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-primary/90 transition-all duration-300 group"
                >
                  <span>Request Technical Site Survey</span>
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

