'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import {
    BeakerIcon,
    CpuChipIcon,
    ServerIcon,
    BuildingOffice2Icon,
} from '@heroicons/react/24/outline'

function UseCaseItem({ useCase, index }) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const isEven = index % 2 === 0
    const Icon = useCase.icon

    // Transform values for scroll sync - keeping user logic from previous task
    const xLeft = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-100, 0, 0, -100])
    const xRight = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, 100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <div
            ref={containerRef}
            className="overflow-hidden"
        >
            <div className={`flex flex-col gap-10 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Image Section - Card Styled (Preserving Design) */}
                <motion.div
                    style={{
                        x: isEven ? xLeft : xRight,
                        opacity: opacity
                    }}
                    className="md:w-1/2 relative h-72 overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm"
                >
                    <Image
                        src={useCase.image}
                        alt={useCase.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Content Section - Left Border (Preserving Design) */}
                <motion.div
                    style={{
                        x: isEven ? xRight : xLeft,
                        opacity: opacity
                    }}
                    className={`md:w-1/2 p-8 lg:p-12 flex flex-col justify-center ${!isEven ? 'border-l md:border-l-0 md:border-r' : 'border-r md:border-l md:border-r-0'} border-primary/20`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
                        <h3 className="text-base font-bold text-neutral-dark">
                            {useCase.title}
                        </h3>
                    </div>
                    <p className="text-sm text-neutral-dark/70 leading-relaxed">
                        {useCase.description}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default function UseCases() {
    // Using select industries as use cases
    const useCases = [
        {
            icon: BeakerIcon,
            title: 'Pharmaceutical Manufacturing',
            description: 'Minimise particulate ingress and maintain GMP compliance with our contamination control solutions. Perfect for cleanroom environments requiring strict adherence to regulatory standards.',
            image: '/assets/industries/pharmaceutical.png',
        },
        {
            icon: CpuChipIcon,
            title: 'Semiconductor Production',
            description: 'Keeping your precious products safe from contamination with advanced matting systems. Ideal for environments where even microscopic particles can impact product quality and yield.',
            image: '/assets/industries/semiconductor.png',
        },
        {
            icon: ServerIcon,
            title: 'Data Centre Operations',
            description: 'Prevent dust and particulate from affecting sensitive equipment with specialized floor protection. Essential for maintaining optimal performance and extending equipment lifespan.',
            image: '/assets/industries/data-centres.png',
        },
        {
            icon: BuildingOffice2Icon,
            title: 'Healthcare Facilities',
            description: 'Protecting staff & patients with infection control solutions designed for high-traffic medical environments. Critical for maintaining sterile conditions and preventing cross-contamination.',
            image: '/assets/industries/hospitals.png',
        },
    ]

    return (
        <section className="bg-white py-16 lg:py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-dark mb-4">
                        Perfect For <span className="text-primary">Your Operations</span>
                    </h2>
                    <p className="text-lg text-neutral-dark/70 max-w-3xl mx-auto leading-relaxed">
                        Our contamination control solutions are designed for environments where precision and cleanliness are critical.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {useCases.map((useCase, index) => (
                        <UseCaseItem key={useCase.title} useCase={useCase} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
