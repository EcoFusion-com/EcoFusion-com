/**
 * Input Validation Utilities
 * Provides server-side input validation and sanitization
 */

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates and sanitizes text input
 */
export function sanitizeTextInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove potential HTML tags
}

/**
 * Validates contact form data
 */
export function validateContactForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length < 2) {
    errors.push('First name is required and must be at least 2 characters');
  }
  
  if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length < 2) {
    errors.push('Last name is required and must be at least 2 characters');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.projectType || typeof data.projectType !== 'string' || data.projectType.trim().length < 3) {
    errors.push('Project type is required and must be at least 3 characters');
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }
  
  // Validate company field if provided
  if (data.company && typeof data.company !== 'string') {
    errors.push('Company must be a valid string');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates newsletter subscription data
 */
export function validateNewsletterForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
