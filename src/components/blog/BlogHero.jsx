'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function BlogHero({ post }) {
    const [imageError, setImageError] = useState(false)
    const [authorImageError, setAuthorImageError] = useState(false)

    return (
        <section className="relative w-full bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    {/* Category Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="inline-block bg-gray-100 text-neutral-dark px-3 py-1.5 rounded text-xs font-medium">
                            {post.category}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-dark max-w-4xl mx-auto mb-6 leading-tight tracking-tight"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Description */}
                    {post.excerpt && (
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-base sm:text-lg lg:text-lg text-neutral-dark/70 mb-8 max-w-4xl mx-auto leading-relaxed"
                        >
                            {post.excerpt}
                        </motion.p>
                    )}

                    {/* Author Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-center gap-3 mb-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                {post.author?.avatar && !authorImageError ? (
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                        onError={() => setAuthorImageError(true)}
                                    />
                                ) : (
                                    <svg
                                        className="w-6 h-6 text-neutral-dark/50"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-sm font-semibold text-neutral-dark">
                                    {post.author || 'Author'}
                                </span>
                                <p className="text-xs text-neutral-dark/60">
                                    {post.createdAt
                                        ? `Published on ${new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                                        : post.publishedDate
                                            ? `Updated on ${new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                                            : ''
                                    }
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Featured Image */}
                {(post.featuredImage && !imageError) && (<motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-12 sm:mt-16 px-8"
                >
                    <div className="relative w-full border border-gray-100 aspect-video h-[75dvh] rounded-3xl overflow-hidden bg-gray-100">
                        {(post.featuredImage && !imageError) && (
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                onError={() => setImageError(true)}
                            />
                        )}
                    </div>
                </motion.div>)}
            </div>
        </section>
    )
}
