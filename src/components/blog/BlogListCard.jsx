'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function BlogListCard({ post, index }) {
    const [imageError, setImageError] = useState(false)

    // Generate gradient colors based on post title
    const getGradientColors = (title) => {
        const gradients = [
            'from-gray-200/30 via-gray-100/20 to-white/10',       // Neutral corporate tone
            'from-blue-500/30 via-blue-400/20 to-blue-200/10',    // Trustworthy business blue
            'from-indigo-500/30 via-indigo-400/20 to-indigo-200/10', // Modern tech indigo
            'from-teal-500/20 via-teal-400/10 to-teal-200/0',    // Clean healthcare/finance teal
            'from-slate-500/30 via-slate-400/20 to-slate-200/10', // Minimalist gray slate
            'from-emerald-500/0 via-emerald-400/0 to-emerald-200/0', // Growth-oriented green
            'from-cyan-500/30 via-cyan-400/20 to-cyan-200/10',    // Fresh innovation cyan
          ];          
        const hash = title.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
        return gradients[Math.abs(hash) % gradients.length]
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group flex gap-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0 hover:border-gray-200 transition-colors duration-300"
        >
            {/* Image */}
            <Link href={`/blog/${post.slug}`} className="relative w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                {post.featuredImage && !imageError ? (
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getGradientColors(post.title)} flex items-center justify-center border border-gray-200/50`}>
                        <div className="text-neutral-dark/40 text-xl font-bold">
                            {post.title.charAt(0)}
                        </div>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Date */}
                <div className="mb-2">
                    <span className="text-xs font-semibold text-neutral-dark/50 uppercase tracking-wider">
                        {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`} className="block mb-2 group-hover:text-primary transition-colors duration-300">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-dark line-clamp-2 leading-tight">
                        {post.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-neutral-dark/70 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-auto">
                    <span className="text-xs font-medium text-neutral-dark/60">
                        {post.author?.name || 'Author'}
                    </span>
                    <span className="text-xs text-neutral-dark/40">•</span>
                    <span className="text-xs text-neutral-dark/50 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readingTime || 5} min read
                    </span>
                    <span className="ml-auto">
                        <span className="text-xs font-semibold text-white bg-primary/60 px-2.5 py-1 rounded-sm">
                            {post.category}
                        </span>
                    </span>
                </div>
            </div>
        </motion.article>
    )
}

