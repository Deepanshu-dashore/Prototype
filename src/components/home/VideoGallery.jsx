'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const videos = [
    {
      id: 1,
      title: 'CC Matting Informative Video 1',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/TiVEu0V3Lq8/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/TiVEu0V3Lq8',
    },
    {
      id: 2,
      title: 'CC Matting Informative Video 2',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/abzEtfgnLrw/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/abzEtfgnLrw',
    },
    {
      id: 3,
      title: 'CC Matting Informative Video 3',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/JQH4wPAGTU0/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/JQH4wPAGTU0',
    },
    {
      id: 4,
      title: 'CC Matting Informative Video 4',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/dc_AdFCxizY/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/dc_AdFCxizY',
    },
    {
      id: 5,
      title: 'CC Matting Informative Video 5',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/Kysx_WHLrFQ/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/Kysx_WHLrFQ',
    },
    {
      id: 6,
      title: 'Eliminate Ingress Of Contamination From ForkTruck Traffic.',
      duration: '',
      thumbnail: 'https://img.youtube.com/vi/TiVEu0V3Lq8/hqdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/TiVEu0V3Lq8',
    },
  ]

  return (
    <section id="videos" className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-neutral-dark mb-3 sm:mb-4">
            Informative <span className="text-primary">Videos</span>
          </h2>
          <p className="text-neutral-dark/70 text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0">
            Learn more about how our products work and their impact on your cleanroom environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={`${video.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video bg-neutral-light rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                {video.thumbnail && (
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title} 
                    width={640}
                    height={360}
                    className="w-full h-full object-cover absolute inset-0" 
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary ml-0.5 sm:ml-1" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                  <h3 className="text-white font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-2">{video.title}</h3>
                  {video.duration && (
                    <p className="text-white/80 text-[10px] sm:text-xs">{video.duration}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedVideo(null)}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl"
                >
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-accent transition-colors z-10"
                    aria-label="Close video"
                  >
                    <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                  </button>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={selectedVideo.embedUrl}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}



