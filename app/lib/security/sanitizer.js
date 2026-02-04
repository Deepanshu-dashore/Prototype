import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes dangerous tags and attributes while preserving safe formatting
 * @param {string} dirtyHTML - The HTML content to sanitize
 * @returns {string} - The cleaned HTML content
 */
export function sanitizeHTML(dirtyHTML) {
  if (!dirtyHTML || typeof dirtyHTML !== 'string') {
    return '';
  }

  const config = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'img', 'hr'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  };

  const cleaned = DOMPurify.sanitize(dirtyHTML, config);
  return cleaned;
}

/**
 * Sanitize plain text input to prevent injection attacks
 * @param {string} text - The text to sanitize
 * @returns {string} - The sanitized text
 */
export function sanitizeText(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove potentially dangerous characters but keep alphanumeric, spaces, and common punctuation
  return text
    .trim()
    .replace(/[<>\"'`]/g, '') // Remove HTML/script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .slice(0, 1000); // Limit length
}

/**
 * Sanitize email address
 * @param {string} email - The email to sanitize
 * @returns {string} - The sanitized email
 */
export function sanitizeEmail(email) {
  if (!email || typeof email !== 'string') {
    return '';
  }

  return email
    .trim()
    .toLowerCase()
    .replace(/[<>\"'`]/g, '')
    .slice(0, 254); // RFC 5321 max email length
}
