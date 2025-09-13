/**
 * HTML Sanitization Utilities
 * Provides safe HTML sanitization to prevent XSS attacks
 */

/**
 * Sanitizes HTML content by removing potentially dangerous tags and attributes
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Create a temporary div to parse HTML
  const temp = document.createElement('div');
  temp.textContent = html; // This automatically escapes HTML
  
  // Get the escaped content
  return temp.innerHTML;
}

/**
 * Sanitizes text content for safe display
 * @param text - The text to sanitize
 * @returns Sanitized text
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Parses markdown-like formatting safely
 * @param text - The text to parse
 * @returns Safe HTML string
 */
export function parseMessageText(text: string): string {
  if (!text) return '';
  
  // First sanitize the input
  const sanitized = sanitizeText(text);
  
  // Convert **text** to bold (safely)
  let parsed = sanitized.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *text* to italic (safely)
  parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert `text` to code (safely)
  parsed = parsed.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Convert line breaks to <br>
  parsed = parsed.replace(/\n/g, '<br />');
  
  // Convert URLs to links (with additional validation)
  parsed = parsed.replace(/(https?:\/\/[^\s]+)/g, (url) => {
    // Basic URL validation
    try {
      new URL(url);
      return `<a href="${sanitizeText(url)}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${sanitizeText(url)}</a>`;
    } catch {
      return sanitizeText(url); // Return as plain text if invalid URL
    }
  });
  
  return parsed;
}
