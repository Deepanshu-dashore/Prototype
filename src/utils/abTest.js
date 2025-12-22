/**
 * A/B Testing utility
 * Simple client-side A/B testing with localStorage persistence
 */

const STORAGE_KEY = 'cc_matting_ab_tests'

/**
 * Get or assign a variant for a test
 * @param {string} testName - Name of the A/B test
 * @param {string[]} variants - Array of variant names
 * @returns {string} - Selected variant
 */
export const getVariant = (testName, variants = ['A', 'B']) => {
  if (typeof window === 'undefined') return variants[0]

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const tests = stored ? JSON.parse(stored) : {}

    // If variant already assigned, return it
    if (tests[testName]) {
      return tests[testName]
    }

    // Assign variant randomly
    const variant = variants[Math.floor(Math.random() * variants.length)]
    tests[testName] = variant

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tests))

    return variant
  } catch (error) {
    console.error('A/B test error:', error)
    return variants[0]
  }
}

/**
 * Get current variant for a test (without assigning if not exists)
 * @param {string} testName - Name of the A/B test
 * @returns {string|null} - Current variant or null
 */
export const getCurrentVariant = (testName) => {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const tests = stored ? JSON.parse(stored) : {}
    return tests[testName] || null
  } catch (error) {
    console.error('A/B test error:', error)
    return null
  }
}

/**
 * Track A/B test conversion
 * @param {string} testName - Name of the A/B test
 * @param {string} variant - Variant that converted
 * @param {string} conversionType - Type of conversion
 */
export const trackConversion = (testName, variant, conversionType = 'conversion') => {
  if (typeof window === 'undefined') return

  // Track in analytics
  if (window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      test_name: testName,
      variant,
      conversion_type: conversionType,
    })
  }

  // Store conversion locally
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}_conversions`)
    const conversions = stored ? JSON.parse(stored) : {}
    
    if (!conversions[testName]) {
      conversions[testName] = {}
    }
    
    if (!conversions[testName][variant]) {
      conversions[testName][variant] = {}
    }
    
    if (!conversions[testName][variant][conversionType]) {
      conversions[testName][variant][conversionType] = 0
    }
    
    conversions[testName][variant][conversionType]++

    localStorage.setItem(`${STORAGE_KEY}_conversions`, JSON.stringify(conversions))
  } catch (error) {
    console.error('Conversion tracking error:', error)
  }
}

/**
 * Get conversion data for a test
 * @param {string} testName - Name of the A/B test
 * @returns {object} - Conversion data
 */
export const getConversionData = (testName) => {
  if (typeof window === 'undefined') return {}

  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}_conversions`)
    const conversions = stored ? JSON.parse(stored) : {}
    return conversions[testName] || {}
  } catch (error) {
    console.error('Get conversion data error:', error)
    return {}
  }
}

// A/B Test Definitions
export const AB_TESTS = {
  CTA_COPY: {
    name: 'cta_copy',
    variants: ['Request a Quote', 'Talk to a Specialist'],
  },
  MOBILE_CTA: {
    name: 'mobile_cta',
    variants: ['sticky', 'static'],
  },
}






