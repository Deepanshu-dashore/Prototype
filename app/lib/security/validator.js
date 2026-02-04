/**
 * Escape special characters in regex to prevent ReDoS attacks
 * @param {string} str - The string to escape for use in regex
 * @returns {string} - The escaped string safe for regex use
 */
export function escapeRegExp(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Validate if string is a valid MongoDB ObjectId
 * @param {string} id - The ID to validate
 * @returns {boolean} - True if valid ObjectId format
 */
export function isValidMongoObjectId(id) {
  if (!id || typeof id !== 'string') {
    return false;
  }
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email format
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate file MIME type for uploads
 * @param {string} mimeType - The MIME type to validate
 * @returns {boolean} - True if MIME type is allowed
 */
export function isAllowedMimeType(mimeType) {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ];
  return allowedMimeTypes.includes(mimeType);
}

/**
 * Validate file extension for uploads
 * @param {string} filename - The filename to validate
 * @returns {boolean} - True if extension is allowed
 */
export function isAllowedFileExtension(filename) {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return allowedExtensions.includes(extension);
}

/**
 * Validate file size (in bytes)
 * @param {number} fileSize - The file size in bytes
 * @param {number} maxSizeInMB - Maximum allowed size in MB (default: 5MB)
 * @returns {boolean} - True if file size is within limit
 */
export function isFileSizeValid(fileSize, maxSizeInMB = 5) {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize > 0 && fileSize <= maxSizeInBytes;
}
