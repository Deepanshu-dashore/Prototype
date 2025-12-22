'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function ImageCard({ 
  imageSrc, 
  alt = 'Image', 
  title, 
  description,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  onClick,
  horizontal = false
}) {
  const [imageError, setImageError] = useState(false)

  const imageContent = (
    <div className={`relative ${horizontal ? 'w-full sm:w-1/2' : ''} ${aspectRatio} bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden`}>
      {imageSrc && !imageError ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">Image Placeholder</p>
            <p className="text-xs text-gray-400 mt-1">Add your image here</p>
          </div>
        </div>
      )}
    </div>
  )

  const textContent = (title || description) && (
    <div className={`${horizontal ? 'w-full sm:w-1/2 flex flex-col justify-center' : ''} p-4 sm:p-5`}>
      {title && (
        <h3 className="text-base sm:text-lg font-semibold text-neutral-dark mb-2.5 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed">
          {description}
        </p>
      )}
      
      {onClick && (
        <div className="flex items-center text-primary font-medium text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="mr-2">Learn more</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  )

  const content = horizontal ? (
    <div className="flex flex-col sm:flex-row">
      {imageContent}
      {textContent}
    </div>
  ) : (
    <>
      {imageContent}
      {textContent}
    </>
  )

  if (onClick) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={onClick}
        type="button"
        className={`group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 text-left w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 ${className}`}
    >
      {content}
    </motion.div>
  )
}

