'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TableOfContents({ content }) {
    const [headings, setHeadings] = useState([])
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        // Extract h2 headings from the content
        const parser = new DOMParser()
        const doc = parser.parseFromString(content, 'text/html')
        const h2Elements = Array.from(doc.querySelectorAll('h2'))

        const extractedHeadings = h2Elements.map((h2, index) => {
            const text = h2.textContent
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            return { id, text }
        })

        setHeadings(extractedHeadings)

        // Set IDs on the actual components post-render handled in BlogContent
    }, [content])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '0px 0px -40% 0px', threshold: 0.5 }
        )

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) return null

    return (
        <div className="sticky top-40 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hidden lg:block">
            <h4 className="text-neutral-dark font-semibold text-sm mb-4 uppercase tracking-wider text-neutral-dark/70">
                Table of Contents
            </h4>
            <nav className="space-y-0.5">
                {headings.map((heading, index) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={`block py-2.5 px-0 text-sm transition-all duration-200 relative ${
                            activeId === heading.id
                                ? 'text-primary font-medium'
                                : 'text-neutral-dark/60 hover:text-neutral-dark'
                        }`}
                    >
                        <span className="flex items-center gap-2 full">
                            {activeId === heading.id && (
                                <span className="w-0.5 h-6 bg-primary rounded-full shrink-0" />
                            )}
                            <span className={activeId === heading.id ? 'pl-0' : 'pl-3'}>
                                {heading.text}
                            </span>
                        </span>
                    </a>
                ))}
            </nav>
        </div>
    )
}
