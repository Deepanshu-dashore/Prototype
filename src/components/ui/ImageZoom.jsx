'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

/**
 * ImageZoom Component
 * 
 * Uses a "True-Focal" Mirroring technique.
 * 1. Bypasses motion transform conflicts by calculating exact absolute coordinates.
 * 2. Synchronizes mirror offset with lens position for perfect focal lock.
 * 3. Uses rounded Math coordinates to prevent sub-pixel jitter.
 */
export default function ImageZoom({ children, src, alt, zoomLevel = 2.5 }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const containerRef = useRef(null)

    // Prevent scroll when zoomed
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleMouseMove = (e) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.round(e.clientX - rect.left)
        const y = Math.round(e.clientY - rect.top)

        // Lens radius (half of w-60 / 240px)
        const radius = 120

        // Direct CSS updates for zero-lag hardware accelerated movement.
        // We set the lens's top-left so its center is at (x, y).
        // Then we shift the mirror content inside the lens to align with container (0, 0).
        containerRef.current.style.setProperty('--mouse-x', `${x - radius}px`)
        containerRef.current.style.setProperty('--mouse-y', `${y - radius}px`)
        containerRef.current.style.setProperty('--mirror-x', `${-(x - radius)}px`)
        containerRef.current.style.setProperty('--mirror-y', `${-(y - radius)}px`)
        containerRef.current.style.setProperty('--focal-x', `${x}px`)
        containerRef.current.style.setProperty('--focal-y', `${y}px`)
        containerRef.current.style.setProperty('--card-w', `${rect.width}px`)
        containerRef.current.style.setProperty('--card-h', `${rect.height}px`)
    }

    const lensSize = 240 // w-60

    return (
        <>
            <div
                ref={containerRef}
                className="relative group cursor-none w-full h-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsOpen(true)}
                style={{
                    '--mouse-x': '0px',
                    '--mouse-y': '0px',
                    '--mirror-x': '0px',
                    '--mirror-y': '0px',
                    '--focal-x': '50%',
                    '--focal-y': '50%',
                    '--card-w': '100%',
                    '--card-h': '100%',
                }}
            >
                {/* Image Container */}
                <div className="w-full h-full overflow-hidden rounded-xl bg-neutral-50 relative">
                    {children}
                    {/* Absolute visual border that doesn't affect pixel coordinates */}
                    <div className="absolute inset-0 border border-neutral-200 rounded-xl pointer-events-none z-10" />
                </div>

                {/* Magnifying Lens */}
                <AnimatePresence>
                    {isHovering && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="pointer-events-none absolute z-50 rounded-full border-4 border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden bg-white"
                            style={{
                                width: lensSize,
                                height: lensSize,
                                left: 'var(--mouse-x)',
                                top: 'var(--mouse-y)',
                                // NO translate(-50%, -50%) here to avoid conflict with motion animations
                            }}
                        >
                            {/* The Mirror: Aligned to container (0,0) and scaled around mouse (x,y) */}
                            <div
                                className="absolute pointer-events-none"
                                style={{
                                    width: 'var(--card-w)',
                                    height: 'var(--card-h)',
                                    left: 'var(--mirror-x)',
                                    top: 'var(--mirror-y)',
                                    transform: `scale(${zoomLevel})`,
                                    transformOrigin: 'var(--focal-x) var(--focal-y)',
                                    willChange: 'left, top, transform'
                                }}
                            >
                                {children}
                            </div>

                            {/* Lens Visuals */}
                            <div className="absolute inset-0 border border-primary/20 rounded-full z-20 pointer-events-none" />
                            <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20 z-20" />
                            <div className="absolute left-1/2 top-0 w-px h-full bg-primary/20 z-20" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-10 rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status Hint */}
                <div className="absolute bottom-4 right-4 z-40 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <MagnifyingGlassPlusIcon className="w-4 h-4 text-primary" />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-neutral-900/96 backdrop-blur-md cursor-zoom-out"
                        />

                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 z-110 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shadow-xl"
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative max-w-full max-h-full p-4 flex items-center justify-center pointer-events-none"
                        >
                            <img
                                src={src}
                                alt={alt}
                                className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl pointer-events-auto border border-white/10"
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
