'use client';

import { motion } from "framer-motion";
import Link from "next/link";
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
      accent: "text-[#0047AB]"
    },
    {
      value: "ISO 5",
      title: "CLEANLINESS SUPPORT",
      subtitle: "Helps maintain compliance for GPU & high-density compute halls.",
      icon: CheckBadgeIcon,
      accent: "text-sky-600"
    },
    {
      value: "10¹⁰ Ω",
      title: "ESD DISSIPATIVE",
      subtitle: "Safely dissipates static build-up on foot traffic & equipment.",
      icon: BoltIcon,
      accent: "text-indigo-600"
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
    { title: "Server Air Locks", desc: "Primary decontamination threshold before entering active server suites." },
    { title: "Rack Entry & Exit Zones", desc: "High-density compute halls requiring zero particle resuspension." },
    { title: "Corridor & Cleanroom Entries", desc: "Transition points between admin spaces and controlled white space." },
    { title: "Equipment Staging Bays", desc: "Server unboxing and rack staging areas subject to heavy cart traffic." },
    { title: "Raised Access Floor Entry Points", desc: "Sealing sub-floor plenum air inlets against falling dust and debris." }
  ];

  return (
    <main className="grow bg-white text-slate-900 font-sans">
      {/* ─── SECTION 1: HERO (Clean Light Design) ───────────────────────────── */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-white py-16 sm:py-20 lg:py-24 border-b border-slate-100">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0047AB] text-xs font-semibold uppercase tracking-wider mb-6 border border-blue-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0047AB]" />
              <span>CCMATTING.IE — CRITICAL ENVIRONMENT PROTECTION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
              Data Centre Contamination Control &amp; Entrance Protection Systems
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-5xl">
              Safeguarding High-Density Compute, ISO Class 5 Air Quality, and Operational Uptime at the Floor Level
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0047AB] hover:bg-blue-800 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Request Technical Site Survey</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="#preventative-architecture"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-200 transition-all duration-200"
              >
                <span>Explore Architecture</span>
                <ChevronRightIcon className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: INTRO & STATS ───────────────────────────────────────── */}
      <section className="bg-slate-50/70 py-14 sm:py-18 border-b border-slate-200/80">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="bg-white border-l-4 border-[#0047AB] rounded-r-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-slate-200/80 mb-12">
            <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
              Modern data centers are the foundation of cloud computing, artificial intelligence, and enterprise operations, where uninterrupted uptime and environmental integrity are critical to business continuity. Significant investment is made in advanced HVAC systems, precision cooling, and airflow management to protect sensitive IT infrastructure. However, one of the most overlooked contamination pathways exists at floor level, where particulate matter introduced by personnel and wheeled equipment can compromise hardware reliability, reduce equipment lifespan, and impact overall operational performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-blue-300 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0047AB] flex items-center justify-center mb-5 border border-blue-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className={`text-xs font-bold tracking-wider uppercase mb-2.5 ${stat.accent}`}>
                    {stat.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stat.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: THREAT ANALYSIS ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center w-full mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-200/80 text-xs font-semibold uppercase tracking-wider mb-4">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Risk Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Biggest Threat Starts at Floor Level
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Dust particles tracked in on footwear and cart casters are drawn into server rack intakes by high-velocity cooling fans, causing overheating and component degradation.
            </p>
          </div>

          {/* Client Diagram Image 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm overflow-hidden"
          >
            <img
              src="/assets/industries/datacenter_floor_threat.jpg"
              alt="The Biggest Threat Starts at Floor Level"
              className="w-full h-auto rounded-xl object-contain max-h-[640px] mx-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                Financial &amp; Service Level Impact
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The financial consequences of unmanaged contamination in a modern data facility are severe. Unplanned downtime directly threatens service level agreements, customer confidence, and operational revenue.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0047AB]" />
                ISO 14644-1 Class 5 Warranties
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hardware manufacturers and cloud infrastructure providers are increasingly establishing stringent ambient environmental standards, such as ISO 14644-1 Class 5 cleanliness standards, as mandatory prerequisites for equipment warranties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: MULTI-ZONE ARCHITECTURE ─────────────────────────────── */}
      <section id="preventative-architecture" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center w-full mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-50 text-[#0047AB] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200/60">
              <BuildingOffice2Icon className="w-4 h-4" />
              Proactive Barrier Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Preventative Multi-Zone Contamination Barrier Architecture
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Maintaining ISO Class 5 conditions inside active data halls requires limiting airborne particulate counts to precise, quantified thresholds. Achieving and sustaining these demanding benchmarks cannot be accomplished solely through reactive cleaning routines or air filtration systems; it requires a robust, proactive floor-level barrier strategy designed to intercept contamination before it ever crosses the threshold into sensitive data halls.
            </p>
          </div>

          {/* 4 Multi-Zone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {multiZones.map((zone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between hover:border-blue-400 shadow-xs transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-9 h-9 rounded-xl bg-[#0047AB] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {zone.step}
                    </span>
                    <zone.icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                    {zone.title}
                  </h3>
                  <p className="text-[11px] font-bold text-[#0047AB] uppercase tracking-wider mb-2.5">
                    {zone.focus}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {zone.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Zone {zone.step} Protection</span>
                  <ChevronRightIcon className="w-4 h-4 text-[#0047AB]" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Client Diagram Image 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm overflow-hidden mb-12"
          >
            <img
              src="/assets/industries/datacenter_contamination_pathway.jpg"
              alt="Contamination Pathway - How external particulates enter controlled environments"
              className="w-full h-auto rounded-xl object-contain max-h-[580px] mx-auto"
            />
          </motion.div>

          {/* Technical Directive Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white text-slate-900 p-6 sm:p-8 lg:p-10 border-l-4 border-l-[#0047AB] border border-slate-200/90 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0047AB]">
                <ChatBubbleLeftRightIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div className="grow">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/60 text-[#0047AB] text-xs font-bold uppercase tracking-wider mb-2.5">
                  <DocumentCheckIcon className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>CC MATTING TECHNICAL DIRECTIVE</span>
                </div>

                <blockquote className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-slate-800">
                  “Modern high-density data centers cannot rely on reactive sweeping or single-use adhesive sheets. Sustained facility protection requires a scientifically engineered, floor-level contamination barrier that captures{" "}
                  <span className="text-[#0047AB] font-extrabold underline decoration-blue-300 underline-offset-4">
                    99% of incoming particulates
                  </span>{" "}
                  at every critical access transition.”
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 5: ENGINEERED PROTECTION ───────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center w-full mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-50 text-[#0047AB] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200/60">
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              Engineered Protection
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Footwear &amp; Caster Retention vs. Airflow &amp; Thermal Protection
            </h2>
          </div>

          {/* Client Diagram Image 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm overflow-hidden mb-8"
          >
            <img
              src="/assets/industries/datacenter_particle_airflow_protection.png"
              alt="Footwear & Caster Particle Retention and Airflow & Thermal Protection"
              className="w-full h-auto rounded-xl object-contain max-h-[440px] mx-auto"
            />
          </motion.div>

          <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed w-full text-center bg-slate-50/80 rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-5xl mx-auto">
            To eliminate this threat, forward-thinking facility operators are implementing advanced data center entrance matting and comprehensive floor-level contamination control solutions. CC Matting specializes in delivering high-performance, engineered contamination control matting tailored specifically for demanding technical environments, cleanrooms, and data center flooring systems. Positioned strategically at key transition zones—including main hall entrances, mantraps, airlocks, raised access floor entry points, and equipment staging bays—CC Matting systems form an impenetrable preventative barrier against particle ingress.
          </p>
        </div>
      </section>

      {/* ─── SECTION 6: METHOD COMPARISON ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center w-full mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-50 text-[#0047AB] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200/60">
              <ArrowsRightLeftIcon className="w-4 h-4" />
              Direct Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Traditional Cleaning vs. Matting Prevention
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Unlike disposable adhesive mats or standard textile mats, CC Matting uses an advanced high-tack polymer surface to capture and retain up to 99% of fine particulates from footwear and equipment wheels. Its large surface area allows multiple footsteps and wheel rotations, maximizing contamination control without disrupting normal operations.
            </p>
          </div>

          {/* Client Diagram Image 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm overflow-hidden"
          >
            <img
              src="/assets/industries/datacenter_cleaning_vs_matting.jpg"
              alt="Traditional Cleaning vs Matting Prevention Comparison"
              className="w-full h-auto rounded-xl object-contain max-h-[580px] mx-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-indigo-600" />
                Electrostatic Discharge (ESD) Risks
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Beyond particulate control, CC Matting also addresses electrostatic discharge (ESD) risks in data center environments. Its static-dissipative polymer formulation (10¹⁰ Ω) safely dissipates static build-up from personnel and wheeled equipment, reducing the risk of electrostatic discharge that could damage sensitive electronics, disrupt critical systems, or compromise data integrity.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                <ScaleIcon className="w-5 h-5 text-[#0047AB]" />
                Operational Safety &amp; Durability
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Operational safety and durability are essential in high-density facilities. Unlike adhesive peeling mats, which can tear, transfer adhesive, or create trip hazards, CC Matting features an ultra-low-profile design with precision bevelled edges for smooth movement of heavy server racks and equipment carts. Its durable polymer surface withstands continuous heavy traffic while delivering long-term contamination control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: BENEFITS ECOSYSTEM ──────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center w-full mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-50 text-[#0047AB] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200/60">
              <RectangleGroupIcon className="w-4 h-4 text-[#0047AB]" />
              Ecosystem Benefits
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Operational Benefits Ecosystem
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-5xl mx-auto">
              Comprehensive advantages across airflow, cooling efficiency, server lifespan, energy savings, maintenance costs, and facility uptime.
            </p>
          </div>

          {/* Client Diagram Image 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm overflow-hidden mb-12"
          >
            <img
              src="/assets/industries/datacenter_benefits_ecosystem.jpg"
              alt="Operational Benefits Ecosystem"
              className="w-full h-auto rounded-xl object-contain max-h-[580px] mx-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsEcosystem.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-blue-300 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4 border border-blue-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: INSTALLATION POINTS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50/70">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs">
            <div className="w-full mb-10">
              <span className="text-xs font-bold text-[#0047AB] uppercase tracking-widest block mb-2">
                Strategic Placement
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                Recommended Installation Points for CC Data Centre Systems
              </h2>
              <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-5xl">
                Prioritizing proactive particle control reflects a commitment to engineering excellence, operational continuity, and world-class facility protection. By safeguarding critical entrances, mantraps, and server hall access points with CC Matting’s high-efficiency floor solutions, data center managers ensure that their facilities maintain optimum cleanliness standards, satisfy stringent ISO criteria, and deliver uncompromised reliability for modern high-performance computing operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {installationPoints.map((point, index) => (
                <div key={index} className="bg-slate-50/80 border border-slate-200 rounded-xl p-6 shadow-xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[#0047AB] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{point.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: FINAL CTA BANNER ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-[96vw] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="relative rounded-3xl bg-[#0047AB] text-white p-8 sm:p-12 lg:p-14 shadow-lg overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
              {/* Left Side: 70% width */}
              <div className="lg:col-span-7 text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                  Protect Your Critical Infrastructure with CC Matting
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-blue-100 font-normal leading-relaxed">
                  Contact our technical specialists today to arrange a comprehensive facility assessment and discover tailored contamination control solutions for your data center environment.
                </p>
              </div>

              {/* Right Side: 30% width */}
              <div className="lg:col-span-3 flex justify-start lg:justify-end">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#0047AB] font-extrabold text-sm sm:text-base hover:bg-blue-50 transition-all duration-200 shadow-md text-center tracking-wide group"
                >
                  <span>Request Technical Site Survey</span>
                  <ArrowRightIcon className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
