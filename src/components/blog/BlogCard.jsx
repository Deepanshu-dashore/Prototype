'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function BlogCard({ post, index }) {
    const [imageError, setImageError] = useState(false)

    // Generate gradient colors based on post title
    const getGradientColors = (title) => {
        const gradients = [
            'from-primary/70 via-primary/60 to-primary/50',
            'from-blue-400 via-blue-300 to-blue-200',
            'from-purple-400 via-purple-300 to-purple-200',
            'from-indigo-400 via-indigo-300 to-indigo-200',
            'from-teal-400 via-teal-300 to-teal-200',
            'from-rose-400 via-rose-300 to-rose-200',
        ]
        const hash = title.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
        return gradients[Math.abs(hash) % gradients.length]
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
        >
            <Link href={`/blog/${post._id}`} className="relative h-56 w-full overflow-hidden block">
                {post.featuredImage && !imageError ? (
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className={`w-full h-full bg-linear-to-br ${getGradientColors(post.title)} flex items-center justify-center p-6`}>
                        <h3 className="text-neutral-dark text-xl sm:text-2xl font-bold text-center leading-tight line-clamp-3">
                            {post.title}
                        </h3>
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="bg-primary px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                        {post.category}
                    </span>
                </div>
            </Link>

            <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-4 mb-4 text-xs text-neutral-dark/60 font-medium">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : post.publishedDate
                                ? new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                : ''
                        }
                    </span>
                    {post.readingTime && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readingTime} min read
                        </span>
                    )}
                </div>

                <Link href={`/blog/${post._id}`} className="block">
                    <h3 className="text-xl font-bold text-neutral-dark mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                {post.excerpt && (
                    <p className="text-neutral-dark/70 text-sm line-clamp-3 mb-6 grow">
                        {post.excerpt}
                    </p>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        {post.author?.avatar ? (
                            <img
                                src={post.author.avatar}
                                alt={post.author.name || 'Author'}
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                        <span className="text-sm font-semibold text-neutral-dark">
                            {post.author || 'Author'}
                        </span>
                    </div>
                    <Link
                        href={`/blog/${post._id}`}
                        className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300"
                    >
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
