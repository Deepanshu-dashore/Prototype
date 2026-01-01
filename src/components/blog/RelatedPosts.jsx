'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BlogCard from './BlogCard'

export default function RelatedPosts({ posts }) {
    if (!posts || posts.length === 0) return null

    return (
        <section className="bg-gray-50 py-20 sm:py-28 sm:pt-0 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl sm:text-4xl flex items-center gap-3 font-bold text-neutral-dark mb-4">
                            Related <span className="text-primary">Articles</span>
                            <span className="bg-primary text-white rounded-sm p-1 px-2 text-xs font-semibold flex items-center gap-2 w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M341.79 95.5L65.54 166.379l127.84 58.11l276.025-72.64L341.789 95.5zm-1.577 18.984l74.858 33.059l-72.551 19.09l-77.258-32.916zm142.813 52.395L194.864 242.71l-3.057.805h-.002l-.041.01l-2.857-1.3L44.73 178.15l-.184-.092c-5.585-2.793-8.012-1.992-10.77.11c-2.757 2.1-5.515 6.88-6.275 12.956c-1.519 12.153 3.616 27.58 23.916 34.346l.412.139L193.338 288.5l173.235-45.588V212.45l76-18.345v28.806l42.173-11.097c-4.36-14.037-5.33-29.146-1.72-44.934zm-58.453 50.086l-40 9.656v103.186l21.947-21.948l18.053 12.498zm58.453 13.914l-40.453 10.646v45.385l42.173-11.098c-4.36-14.036-5.33-29.145-1.72-44.933M38.42 240.268c-1.803.036-3.177.782-4.642 1.898c-2.758 2.101-5.516 6.88-6.276 12.957c-1.519 12.153 3.616 27.579 23.916 34.346l.412.138L193.338 352.5l173.235-45.588v-45.387l-174.766 45.99l-146.62-65.161a62 62 0 0 1-4.802-1.874a8.3 8.3 0 0 0-1.965-.212m6.768 2.086l.021.008l-.279-.125zm437.838 52.525l-40.453 10.646v45.385l42.173-11.097c-4.36-14.037-5.33-29.146-1.72-44.934M38.42 304.268c-1.803.036-3.177.782-4.642 1.898c-2.758 2.101-5.516 6.88-6.276 12.957c-1.519 12.153 3.616 27.579 23.916 34.346l.412.138L193.338 416.5l173.235-45.588v-45.387l-174.766 45.99l-146.62-65.161a62 62 0 0 1-4.802-1.874a8.3 8.3 0 0 0-1.965-.212m6.768 2.086l.021.008l-.279-.125zm363.437 24.855l-38.863 38.863l68.834-18.115z"></path>
                                </svg>
                                Keep Reading
                            </span>
                        </h2>
                        <p className="text-neutral-dark/50 text-base leading-relaxed">
                            More insights and expert guides on contamination control.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <Link
                            href="/blog"
                            className="group flex items-center gap-2 text-primary font-bold text-sm tracking-wide hover:gap-3 transition-all duration-300"
                        >
                            View All Articles
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <BlogCard key={post._id || post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
