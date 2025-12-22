'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function LogoLoop({
  logos = [],
  speed = 100,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo carousel',
  cardWidth = 200,
  cardHeight = 120,
  showCard = true
}) {
  const containerRef = useRef(null)
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || logos.length === 0) return

    let animationId
    let position = 0
    let lastTime = performance.now()
    let singleSetWidth = 0

    // Calculate single set width (one-third of total since we render 3 copies)
    const calculateWidth = () => {
      if (!container) return 0
      const totalWidth = container.scrollWidth
      if (totalWidth === 0) return 0
      return totalWidth / 3
    }

    // Initialize width calculation - wait for images to load
    const initWidth = () => {
      // Wait for images to load and container to have proper width
      const checkWidth = () => {
        singleSetWidth = calculateWidth()
        if (singleSetWidth === 0 || singleSetWidth === Infinity || isNaN(singleSetWidth)) {
          // Retry if width is not ready (wait a bit longer for images)
          setTimeout(() => {
            requestAnimationFrame(checkWidth)
          }, 50)
        }
      }
      // Start checking after a small delay to allow DOM to render
      setTimeout(() => {
        checkWidth()
      }, 100)
    }

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      // Cap delta time to prevent large jumps when tab is inactive
      const deltaSeconds = Math.min(deltaTime / 1000, 0.1)

      // Recalculate width if needed (in case container resized or images loaded)
      if (singleSetWidth === 0 || singleSetWidth === Infinity || isNaN(singleSetWidth)) {
        singleSetWidth = calculateWidth()
      }

      // Always continue animation, but only update position if we have valid width
      if (singleSetWidth > 0 && !isNaN(singleSetWidth) && singleSetWidth !== Infinity) {
        const currentSpeed = isHoveredRef.current && hoverSpeed > 0 ? hoverSpeed : speed

        if (direction === 'left') {
          // Left direction: move container left (negative translateX)
          position -= currentSpeed * deltaSeconds
          // Reset position when we've moved one full set width (seamless loop)
          while (Math.abs(position) >= singleSetWidth) {
            if (position < 0) {
              position += singleSetWidth
            } else {
              position -= singleSetWidth
            }
          }
          container.style.transform = `translateX(${position}px)`
        } else {
          // Right direction: content scrolls right, so container moves left (negative translateX)
          // Use positive position internally, but apply negative for translateX
          position += currentSpeed * deltaSeconds
          // Reset position when we've moved one full set width (seamless loop)
          while (position >= singleSetWidth) {
            position -= singleSetWidth
          }
          // Apply negative translateX so content appears to scroll right
          container.style.transform = `translateX(${-position}px)`
        }
      } else {
        // If width not ready, keep trying to calculate it
        singleSetWidth = calculateWidth()
      }

      // Always continue the animation loop
      animationId = requestAnimationFrame(animate)
    }

    // Initialize width and start animation
    initWidth()
    lastTime = performance.now()
    animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => {
      isHoveredRef.current = true
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Handle window resize to recalculate width
    const handleResize = () => {
      singleSetWidth = calculateWidth()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [speed, direction, hoverSpeed, logos.length])

  const logoStyle = {
    height: `${logoHeight}px`,
    width: 'auto',
    objectFit: 'contain',
    transition: scaleOnHover ? 'transform 0.3s ease' : 'none',
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        rotate: `${direction === 'right' ? '180deg' : '0deg'}`,
        maskImage: fadeOut
          ? `linear-gradient(to ${direction === 'left' ? 'right' : 'left'}, transparent, ${fadeOutColor}, ${fadeOutColor}, transparent)`
          : 'none',
        WebkitMaskImage: fadeOut
          ? `linear-gradient(to ${direction === 'left' ? 'right' : 'left'}, transparent, ${fadeOutColor}, ${fadeOutColor}, transparent)`
          : 'none',
      }}
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        className="flex items-center"
        style={{
          gap: `${gap}px`,
          willChange: 'transform',
        }}
      >
        {/* Render logos multiple times for seamless infinite loop */}
        {[...logos, ...logos, ...logos].map((logo, index) => {
          const logoIndex = index % logos.length
          return (
            <div
              key={`${logoIndex}-${index}`}
              className="shrink-0"
              style={{
                rotate: `${direction === 'right' ? '180deg' : '0deg'}`,
                marginRight: `${gap}px`,
                width: showCard ? `${cardWidth}px` : 'auto',
                height: showCard ? `${cardHeight}px` : 'auto',
              }}
            >
              <div
                className={`flex items-center justify-center transition-all duration-300 ${
                  showCard
                    ? `bg-white rounded-md shadow-sm hover:shadow-md p-4 h-full border border-neutral-100`
                    : ''
                } ${scaleOnHover ? 'hover:scale-105' : ''}`}
                style={{
                  width: showCard ? '100%' : 'auto',
                  height: showCard ? '100%' : 'auto',
                }}
                onMouseEnter={(e) => {
                  if (scaleOnHover && !showCard) {
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (scaleOnHover && !showCard) {
                    e.currentTarget.style.transform = 'scale(1)'
                  }
                }}
              >
                {logo.src ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt || `Logo ${logoIndex + 1}`}
                    width={cardWidth}
                    height={cardHeight}
                    className={logo.zoom ? 'scale-180 object-cover' : 'object-cover'}
                    style={{
                      ...logoStyle,
                      height: showCard ? 'auto' : logoStyle.height, // Allow height to adjust in card
                      width: showCard ? 'auto' : logoStyle.width,
                      maxWidth: showCard ? '90%' : '100%',
                      maxHeight: showCard ? '90%' : '100%',
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div style={logoStyle} className="flex items-center justify-center">
                    {logo.node}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}



