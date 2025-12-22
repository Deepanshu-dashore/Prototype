'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BlogContent({ content }) {
    useEffect(() => {
        // Add IDs to h2 tags for TOC navigation
        const h2s = document.querySelectorAll('.blog-content h2')
        h2s.forEach(h2 => {
            const id = h2.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            h2.id = id
            h2.className = "text-xl sm:text-2xl font-semibold text-neutral-dark mt-12 mb-5 first:mt-0 scroll-mt-32 tracking-tight"
        })

        const h3s = document.querySelectorAll('.blog-content h3')
        h3s.forEach(h3 => {
            h3.className = "text-lg sm:text-xl font-semibold text-neutral-dark mt-8 mb-4 tracking-tight"
        })

        const ps = document.querySelectorAll('.blog-content p')
        ps.forEach(p => {
            p.className = "text-sm sm:text-base text-neutral-dark/70 leading-relaxed mb-5"
        })

        const uls = document.querySelectorAll('.blog-content ul')
        uls.forEach(ul => {
            ul.className = "list-disc list-outside space-y-2 mb-6 ml-5 text-neutral-dark/70 marker:text-primary/60"
        })

        const lis = document.querySelectorAll('.blog-content ul li, .blog-content ol li')
        lis.forEach(li => {
            li.className = "mb-1.5 leading-relaxed text-sm sm:text-base"
        })

        const ols = document.querySelectorAll('.blog-content ol')
        ols.forEach(ol => {
            ol.className = "list-decimal list-outside space-y-2 mb-6 ml-5 text-neutral-dark/70"
        })

        const quotes = document.querySelectorAll('.blog-content blockquote')
        quotes.forEach(quote => {
            quote.className = "bg-gray-50 border-l-3 border-primary/40 pl-5 pr-5 py-5 rounded-r my-8 italic text-sm sm:text-base text-neutral-dark/80 font-normal"
        })

        const strongs = document.querySelectorAll('.blog-content strong')
        strongs.forEach(strong => {
            strong.className = "font-semibold text-neutral-dark"
        })
    }, [content])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="blog-content max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
