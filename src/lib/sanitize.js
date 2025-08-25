import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - The potentially unsafe HTML string
 * @returns {string} - The sanitized HTML string
 */
export const sanitizeHtml = (dirty) => {
  if (typeof dirty !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
};

/**
 * Sanitize plain text input by removing HTML tags and trimming whitespace
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized string
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove HTML tags and decode HTML entities
  const withoutHtml = DOMPurify.sanitize(input, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
  
  // Trim whitespace and normalize line breaks
  return withoutHtml.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitize subject line with additional length and character restrictions
 * @param {string} subject - The subject string to sanitize
 * @returns {string} - The sanitized subject string
 */
export const sanitizeSubject = (subject) => {
  if (typeof subject !== 'string') {
    return '';
  }
  
  // Remove HTML tags and decode entities
  let sanitized = DOMPurify.sanitize(subject, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
  
  // Remove control characters and normalize whitespace
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '').trim().replace(/\s+/g, ' ');
  
  // Limit length
  return sanitized.substring(0, 200);
};

/**
 * Sanitize message content while preserving basic formatting
 * @param {string} content - The message content to sanitize
 * @returns {string} - The sanitized content
 */
export const sanitizeMessageContent = (content) => {
  if (typeof content !== 'string') {
    return '';
  }
  
  // Allow basic formatting tags but sanitize everything else
  let sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['br', 'p'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Normalize excessive whitespace but preserve line breaks
  sanitized = sanitized.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Trim and limit length
  return sanitized.trim().substring(0, 5000);
};

/**
 * Validate and sanitize email addresses
 * @param {string} email - The email to validate and sanitize
 * @returns {string} - The sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') {
    return '';
  }
  
  // Basic email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = email.trim().toLowerCase();
  
  return emailRegex.test(sanitized) ? sanitized : '';
};

/**
 * Sanitize username input
 * @param {string} username - The username to sanitize
 * @returns {string} - The sanitized username
 */
export const sanitizeUsername = (username) => {
  if (typeof username !== 'string') {
    return '';
  }
  
  // Remove HTML tags and special characters, keep only alphanumeric, underscore, and hyphen
  let sanitized = DOMPurify.sanitize(username, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
  sanitized = sanitized.replace(/[^a-zA-Z0-9_-]/g, '').trim();
  
  return sanitized.substring(0, 50);
};

