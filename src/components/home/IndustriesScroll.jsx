'use client'

import { motion, useAnimationFrame, useMotionValue, useTransform, wrap, animate } from 'framer-motion'
import { useRef, useState } from 'react'
import {
    BeakerIcon,
    HeartIcon,
    BuildingOfficeIcon,
    BuildingOffice2Icon,
    CpuChipIcon,
    WrenchScrewdriverIcon,
    ServerIcon,
    GlobeAmericasIcon,
    AcademicCapIcon // Added AcademicCapIcon as it was in original imports but not used in the hardcoded list
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'


// Use shared data source
const industries = [
    {
        icon: BeakerIcon,
        title: 'PHARMACEUTICAL',
        description: 'Minimise particulate ingress and maintain GMP compliance.',
        image: '/assets/industries/pharmaceutical.png',
        href: '/industries/pharmaceutical-industry'
    },
    {
        icon: HeartIcon, // Or a medical kit icon if available, Heart is okay for medical
        title: 'MEDICAL DEVICES',
        description: 'Protect sensitive manufacturing environments from contamination.',
        image: '/assets/industries/medical-devices.png',
        href: '/industries/medical-devices'
    },
    {
        icon: CpuChipIcon,
        title: 'SEMICONDUCTOR',
        description: 'Keeping your precious products safe from contamination.',
        image: '/assets/industries/semiconductor.png',
        href: '/industries/semi-conductor'
    },
    {
        icon: ServerIcon,
        title: 'DATA CENTRES',
        description: 'Prevent dust and particulate from affecting sensitive equipment.',
        image: '/assets/industries/data-centres.png',
        href: '/industries/data-centres'
    },
    {
        icon: BuildingOffice2Icon,
        title: 'HOSPITALS',
        description: 'Protecting staff & patients with infection control solutions.',
        image: '/assets/industries/hospitals.png',
        href: '/industries/hospitals'
    },
    {
        icon: BeakerIcon, // Using Beaker for Lab as well, matches context
        title: 'LABORATORY SETTINGS',
        description: 'Maintain sterile conditions in research and development labs.',
        image: '/assets/industries/life_science_lab_1763625546556.png',
        href: '/industries/life-science'
    },
    {
        icon: WrenchScrewdriverIcon,
        title: 'AUTOMOTIVE',
        description: 'Ensure pristine paint finishes and dust-free assembly lines.',
        image: '/assets/industries/automotive.png',
        href: '/industries/automotive'
    },
    {
        icon: GlobeAmericasIcon, // Represents global travel/aerospace
        title: 'AVIATION',
        description: 'Critical contamination control for aerospace assembly and maintenance.',
        image: '/assets/industries/aviation.png',
        href: '/industries/aviation'
    },
]

const SplitCard = ({ industry, isEven }) => {
    const Icon = industry.icon || BuildingOfficeIcon

    // Components for the two halves
    const ImageSection = () => (
        <div className="relative h-[260px] w-full rounded-2xl overflow-hidden group/image shadow-sm border border-neutral-100">
            <Image
                src={industry.image}
                alt={industry.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                sizes="(max-width: 768px) 100vw, 300px"
            />
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-black/10 group-hover/image:bg-black/0 transition-colors duration-300" />
        </div>
    )

    const DetailSection = () => {
        // Condition: When Detail is on Top (!isEven), use Blue Bg + White Text.
        // When Detail is on Bottom (isEven), use White Bg + Dark Text (Default).
        const isBlueCard = isEven

        return (
            <div className={`h-[160px] relative w-full rounded-2xl p-5 flex flex-col justify-between group/detail hover:shadow-md transition-all duration-300 border 
                ${isBlueCard ? 'bg-linear-to-tr from-primary to-blue-600 border-primary text-white' : 'bg-white border-neutral-100 shadow-sm'}`}
            >
                <div className="pointer-events-none absolute inset-0 bg-[url('/circle-pattern.svg')] bg-repeat opacity-[0.02]" aria-hidden />
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm shrink-0 transition-all duration-300
                            ${isBlueCard ? 'bg-white/60 text-primary' : 'bg-primary text-white'}`}
                        >
                            <Icon className="w-5 h-5" />
                        </div>
                        <h3 className={`text-sm font-bold uppercase tracking-tight leading-tight 
                            ${isBlueCard ? 'text-white' : 'text-neutral-dark'}`}
                        >
                            {industry.title}
                        </h3>
                    </div>
                    <p className={`text-xs font-light leading-relaxed line-clamp-4 
                        ${isBlueCard ? 'text-white/80' : 'text-neutral-dark/70'}`}
                    >
                        {industry.description}
                    </p>
                </div>

                <div className={`flex items-center text-xs font-semibold transition-colors mt-2 
                    ${isBlueCard ? 'text-white/80 group-hover/detail:text-white' : 'text-primary/80 group-hover/detail:text-primary'}`}
                >
                    Learn More
                    <svg className="w-3 h-3 ml-1 transform group-hover/detail:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <Link href={industry.href} className="block w-[280px] shrink-0 mx-3 group select-none">
            <div className="flex flex-col gap-3 h-[460px]">
                {isEven ? (
                    <>
                        <ImageSection />
                        <DetailSection />
                    </>
                ) : (
                    <>
                        <DetailSection />
                        <ImageSection />
                    </>
                )}
            </div>
        </Link>
    )
}

const Marquee = ({ items, baseVelocity = 1 }) => {
    // We duplicate items to ensure we have enough content to scroll smoothly
    // 4 copies should be plenty for standard screens
    const activeItems = [...items, ...items, ...items, ...items]

    const baseX = useMotionValue(0)
    const [isHovered, setIsHovered] = useState(false)

    // Ref for speed logic
    const directionFactor = useRef(1) // 1 for right to left, -1 for left to right

    useAnimationFrame((t, delta) => {
        let moveBy = baseVelocity * (delta / 1000) * 80 // Speed factor

        if (isHovered) {
            moveBy = 0 // Pause on hover
        }

        // Update x
        // We move LEFT, so subtract
        baseX.set(baseX.get() - moveBy * directionFactor.current)
    })

    // To properly wrap, we need to know the width of 1 set of items.
    // 8 items * (280px + 24px (mx-3 * 2)) = ~2432px.
    // This calculation assumes all items are the same width and margin.
    const ITEM_WIDTH_WITH_MARGIN = 280 + (3 * 2 * 4) // 280px width + 2*mx-3 (2*12px) = 304px.
    const WRAP_WIDTH = items.length * ITEM_WIDTH_WITH_MARGIN

    const x = useTransform(baseX, (v) => {
        // Wrap value between -WRAP_WIDTH and 0
        return `${wrap(-WRAP_WIDTH, 0, v)}px`
    })

    const scroll = (direction) => {
        // Manually adjust baseX
        const shift = direction === 'left' ? ITEM_WIDTH_WITH_MARGIN : -ITEM_WIDTH_WITH_MARGIN
        // Animate movement smoothly
        animate(baseX, baseX.get() + shift, {
            type: "tween",
            ease: "easeInOut",
            duration: 0.5
        })
    }

    return (
        <div
            className="relative w-full overflow-hidden group/marquee"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

            {/* Navigation Arrows (Visible on Hover/Mobile) */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/marquee:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => scroll('left')}
                    className="w-12 h-12 rounded-full bg-white/90 shadow-lg text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-neutral-100"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/marquee:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => scroll('right')}
                    className="w-12 h-12 rounded-full bg-white/90 shadow-lg text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-neutral-100"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <motion.div
                className="flex items-center"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Free drag but we don't want constraints acting weird
                onDragStart={() => setIsHovered(true)}
                onDragEnd={() => setIsHovered(false)}
                onDrag={(_, info) => {
                    // Update baseX with drag delta so it persists
                    baseX.set(baseX.get() + info.delta.x)
                }}
            >
                {activeItems.map((item, idx) => (
                    <SplitCard
                        key={`${item.title}-${idx}`}
                        industry={item}
                        isEven={idx % 2 === 0}
                    />
                ))}
            </motion.div>
        </div>
    )
}

export default function IndustriesScroll() {
    return (
        <section className="bg-neutral-50 py-16 sm:py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 px-4">
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-dark mb-4">
                        Who Are They <span className="text-primary">Suitable For?</span>
                    </h2>
                    <p className="text-lg text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                        Our range of contamination control mats are suitable for any organisation or business looking to reduce/eliminate the risk of floor level contaminants entering their critical area.
                    </p>
                </div>

                {/* Horizontal Marquee */}
                <div className="py-8">
                    {/* Increased base speed from default */}
                    <Marquee items={industries} baseVelocity={0.8} />
                </div>
            </div>
        </section>
    )
}
