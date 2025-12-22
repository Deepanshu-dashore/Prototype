'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import BlogCard from './BlogCard'
import BlogListCard from './BlogListCard'
import { blogPosts, getAllCategories } from '../../utils/blogData'

export default function BlogGrid() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const categories = ['All', ...getAllCategories()]

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [selectedCategory, searchQuery])

    const featuredPost = filteredPosts[0]
    const remainingPosts = filteredPosts.slice(1)

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-base"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-dark/40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Post */}
                        {featuredPost && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-12"
                            >
                                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                                    <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-6 bg-white">
                                        {featuredPost.featuredImage ? (
                                            <Image
                                                src={featuredPost.featuredImage||"/BlogIso.png"}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-linear-to-br from-primary/70 via-primary/60 to-primary/50 flex items-center justify-center">
                                                <h2 className="text-white text-3xl sm:text-4xl font-bold text-center px-8">
                                                    {featuredPost.title}
                                                </h2>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-linear-to-t from-neutral-dark/50 via-neutral-dark/20 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <span className="inline-block bg-primary px-4 py-1.5 rounded-full text-xs font-bold text-white mb-3">
                                                {featuredPost.category}
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 line-clamp-2">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-white/90 text-sm sm:text-base line-clamp-2">
                                                {featuredPost.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* Blog Posts List */}
                        {remainingPosts.length > 0 ? (
                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {remainingPosts.map((post, index) => (
                                        <BlogListCard key={post.id} post={post} index={index} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="bg-gray-50 rounded-2xl p-12 shadow-sm inline-block max-w-md mx-auto">
                                    <svg className="w-16 h-16 text-neutral-dark/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-neutral-dark mb-2">No results found</h3>
                                    <p className="text-neutral-dark/60 mb-6">We couldn't find any articles matching your search criteria.</p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('All')
                                            setSearchQuery('')
                                        }}
                                        className="text-primary font-bold hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            </motion.div>
                        ) : null}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8 space-y-8">
                            {/* Categories */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-neutral-dark mb-4">All Categories</h3>
                                <div className="space-y-2">
                                    {categories.slice(1).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                selectedCategory === category
                                                    ? 'bg-primary text-white'
                                                    : 'text-neutral-dark/70 hover:bg-white hover:text-neutral-dark'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white">
                                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                                <p className="text-sm text-white/90 mb-4">
                                    Get the latest articles delivered to your inbox.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full px-4 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                                    />
                                    <button className="w-full bg-white text-primary font-bold py-2.5 rounded-lg hover:bg-white/90 transition-colors duration-200 text-sm">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
