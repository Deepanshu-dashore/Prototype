'use client'

import { motion } from 'framer-motion'
import LogoLoop from './LogoLoop'

export default function CustomersLogos() {
  // Combine all logos into one array for a single horizontal banner
  const allLogos = [
    { src: '/assets/Our Valuable Customers/asset 2.png', alt: 'Customer Logo 1',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 3.png', alt: 'Customer Logo 2',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 4.png', alt: 'Customer Logo 3',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 5.png', alt: 'Customer Logo 4',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 6.png', alt: 'Customer Logo 5',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 7.png', alt: 'Customer Logo 6',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 8.png', alt: 'Customer Logo 7',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 9.png', alt: 'Customer Logo 8',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 10.png', alt: 'Customer Logo 9',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 11.png', alt: 'Customer Logo 10',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 12.png', alt: 'Customer Logo 11',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 13.jpeg', alt: 'Customer Logo 12',zoom:false },
     ]

  const secondRowLogos = [
    { src: '/assets/Our Valuable Customers/asset 13.jpeg', alt: 'Customer Logo 12',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 14.jpeg', alt: 'Customer Logo 13',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 15.gif', alt: 'Customer Logo 14',zoom:true },
    { src: '/assets/Our Valuable Customers/asset 16.png', alt: 'Customer Logo 15',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 17.png', alt: 'Customer Logo 16',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 18.png', alt: 'Customer Logo 17',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 19.jpeg', alt: 'Customer Logo 18',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 20.png', alt: 'Customer Logo 19',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 21.png', alt: 'Customer Logo 20',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 22.png', alt: 'Customer Logo 21',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 23.png', alt: 'Customer Logo 22',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 24.png', alt: 'Customer Logo 23',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 25.png', alt: 'Customer Logo 24',zoom:false },
    { src: '/assets/Our Valuable Customers/asset 26.png', alt: 'Customer Logo 25',zoom:false },
  ];

  return (
    <section className="bg-[#041bc6] py-12 sm:py-14 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Our <span className="text-white/90">Valuable Customers</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-3xl mx-auto">
            Trusted by leading companies for superior contamination control solutions worldwide.
          </p>
        </motion.div>

        {/* Two rows of logo loops */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* First row - slides right to left */}
          <div className="h-32 sm:h-36 md:h-40 lg:h-[160px]" style={{ position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={allLogos}
              speed={50}
              direction="right"
              logoHeight={98}
              gap={10}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#fafafa"
              ariaLabel="Customer logos row 2"
              cardWidth={160}
              cardHeight={120}
              showCard={true}
            />
          </div>
          <div className="h-32 sm:h-36 md:h-40 lg:h-[160px]" style={{ position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={secondRowLogos}
              speed={50}
              direction="left"
              logoHeight={98}
              gap={10}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#fafafa"
              ariaLabel="Customer logos row 1"
              cardWidth={160}
              cardHeight={120}
              showCard={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

