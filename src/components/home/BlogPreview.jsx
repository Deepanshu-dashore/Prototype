'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { getFeaturedPosts } from '../../utils/blogData'

export default function BlogPreview() {
  const featuredPosts = getFeaturedPosts()

  return (
    <section className="bg-gray-50 py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
              Knowledge Hub
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-dark mb-6 leading-tight">
              Latest from our <span className="text-primary italic">Insights</span>
            </h2>
            <p className="text-neutral-dark/60 text-lg leading-relaxed">
              Explore the latest trends, regulatory updates, and expert guides in contamination control and cleanroom technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog"
              className="group flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-primary/20"
            >
              View All Insights
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-4 mb-6 text-xs text-neutral-dark/40 font-bold uppercase tracking-widest">
                  <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  <span>{post.readingTime} min read</span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block mb-4">
                  <h3 className="text-2xl font-bold text-neutral-dark group-hover:text-primary transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-neutral-dark/60 text-base line-clamp-2 mb-8 grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-50 shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-neutral-dark block">{post.author.name}</span>
                      <span className="text-[10px] text-neutral-dark/40 font-bold uppercase tracking-wider">{post.author.role}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-45"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
