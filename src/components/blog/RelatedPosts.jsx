'use client'

import BlogCard from './BlogCard'
import { getRelatedPosts } from '../../utils/blogData'

export default function RelatedPosts({ currentSlug, category }) {
    const relatedPosts = getRelatedPosts(currentSlug, category)

    if (relatedPosts.length === 0) return null

    return (
        <section className="bg-white py-16 sm:py-24 border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">
                            Keep Reading
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-dark">
                            Related <span className="text-primary italic">Articles</span>
                        </h2>
                    </div>

                    <a
                        href="/blog"
                        className="hidden sm:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300"
                    >
                        All Articles
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
