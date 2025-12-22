/**
 * Analytics utility for tracking user interactions
 * Supports Google Analytics, Plausible, or custom analytics
 */

// Initialize analytics (can be extended for different providers)
export const initAnalytics = () => {
  // Check if Google Analytics is available
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('Google Analytics initialized')
  }
  
  // Check if Plausible is available
  if (typeof window !== 'undefined' && window.plausible) {
    console.log('Plausible Analytics initialized')
  }
}

/**
 * Track an event
 * @param {string} eventName - Name of the event
 * @param {object} eventData - Additional event data
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window === 'undefined') return

  const eventPayload = {
    event: eventName,
    ...eventData,
    timestamp: new Date().toISOString(),
  }

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
    })
  }

  // Plausible Analytics
  if (window.plausible) {
    window.plausible(eventName, {
      props: eventData,
    })
  }

  // Custom analytics endpoint (if needed)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    }).catch((err) => {
      console.error('Analytics tracking error:', err)
    })
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, eventData)
  }
}

/**
 * Track phone CTA click
 */
export const trackPhoneClick = (source = 'unknown') => {
  trackEvent('phone_cta_click', {
    source, // 'header', 'hero', 'sticky', 'contact_page', etc.
    phone_number: '+353214701669',
  })
}

/**
 * Track form open
 */
export const trackFormOpen = (source = 'unknown') => {
  trackEvent('form_open', {
    source, // 'header', 'hero', 'cta_section', etc.
  })
}

/**
 * Track form submit
 */
export const trackFormSubmit = (formType = 'contact', data = {}) => {
  trackEvent('form_submit', {
    form_type: formType,
    has_phone: !!data.phone,
    has_company: !!data.company,
    industry: data.industry || 'not_specified',
  })
}

/**
 * Track datasheet download
 */
export const trackDatasheetDownload = (documentName) => {
  trackEvent('datasheet_download', {
    document_name: documentName,
  })
}

/**
 * Track CTA button click
 */
export const trackCTAClick = (ctaText, location) => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    location, // 'hero', 'header', 'cta_section', etc.
  })
}

/**
 * Track page view
 */
export const trackPageView = (pageName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: pageName,
    })
  }

  trackEvent('page_view', {
    page_name: pageName,
  })
}






