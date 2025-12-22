'use client'

import { useEffect, useState } from 'react'
import { getVariant, trackConversion } from '../../utils/abTest'
import { trackCTAClick } from '../../utils/analytics'

/**
 * A/B Test CTA Button Component
 * Tests different CTA copy variations
 */
export default function ABTestCTA({ 
  onClick, 
  location = 'hero',
  className = '',
  variant: forcedVariant = null 
}) {
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    if (forcedVariant) {
      setVariant(forcedVariant)
    } else {
      const testVariant = getVariant('cta_copy', ['Request a Quote', 'Talk to a Specialist'])
      setVariant(testVariant)
    }
  }, [forcedVariant])

  const handleClick = () => {
    if (variant) {
      trackConversion('cta_copy', variant, 'click')
      trackCTAClick(variant, location)
    }
    onClick?.()
  }

  if (!variant) {
    // Fallback during initialization
    return (
      <button
        onClick={handleClick}
        className={className}
      >
        Request a Quote
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {variant}
    </button>
  )
}



