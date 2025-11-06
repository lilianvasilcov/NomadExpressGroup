/**
 * Validation utilities for form inputs
 * Provides sanitization and validation functions
 */

/**
 * Sanitizes a string input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates phone number format (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return true; // Phone is optional
  
  // Remove common phone formatting characters
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Check if it contains only digits and is 10-15 digits long
  return /^\d{10,15}$/.test(cleaned);
};

/**
 * Validates required fields in form data
 * @param {Object} data - Form data object
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {Object} - { isValid: boolean, missingFields: Array<string> }
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => {
    const value = data[field];
    return !value || (typeof value === 'string' && value.trim().length === 0);
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Validates and sanitizes contact form data
 * @param {Object} formData - Raw form data
 * @returns {Object} - { isValid: boolean, errors: Array<string>, sanitizedData: Object }
 */
export const validateContactForm = (formData) => {
  const errors = [];
  const sanitizedData = {};
  
  // Required fields
  const requiredFields = ['name', 'email', 'subject', 'message'];
  const requiredValidation = validateRequiredFields(formData, requiredFields);
  
  if (!requiredValidation.isValid) {
    errors.push(`Missing required fields: ${requiredValidation.missingFields.join(', ')}`);
  }
  
  // Sanitize and validate each field
  if (formData.name) {
    sanitizedData.name = sanitizeInput(formData.name);
    if (sanitizedData.name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (sanitizedData.name.length > 100) {
      errors.push('Name must be less than 100 characters');
    }
  }
  
  if (formData.email) {
    sanitizedData.email = sanitizeInput(formData.email).toLowerCase();
    if (!isValidEmail(sanitizedData.email)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  if (formData.phone) {
    sanitizedData.phone = sanitizeInput(formData.phone);
    if (!isValidPhone(sanitizedData.phone)) {
      errors.push('Please enter a valid phone number');
    }
  }
  
  if (formData.subject) {
    sanitizedData.subject = sanitizeInput(formData.subject);
    if (sanitizedData.subject.length < 3) {
      errors.push('Subject must be at least 3 characters long');
    }
    if (sanitizedData.subject.length > 200) {
      errors.push('Subject must be less than 200 characters');
    }
  }
  
  if (formData.message) {
    sanitizedData.message = sanitizeInput(formData.message);
    if (sanitizedData.message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
    if (sanitizedData.message.length > 5000) {
      errors.push('Message must be less than 5000 characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};

/**
 * Validates and sanitizes quote form data
 * @param {Object} formData - Raw form data
 * @returns {Object} - { isValid: boolean, errors: Array<string>, sanitizedData: Object }
 */
export const validateQuoteForm = (formData) => {
  const errors = [];
  const sanitizedData = {};
  
  // Required fields
  const requiredFields = ['name', 'email', 'phone', 'freightType', 'pickupLocation', 'deliveryLocation'];
  const requiredValidation = validateRequiredFields(formData, requiredFields);
  
  if (!requiredValidation.isValid) {
    errors.push(`Missing required fields: ${requiredValidation.missingFields.join(', ')}`);
  }
  
  // Sanitize and validate each field
  if (formData.name) {
    sanitizedData.name = sanitizeInput(formData.name);
    if (sanitizedData.name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (sanitizedData.name.length > 100) {
      errors.push('Name must be less than 100 characters');
    }
  }
  
  if (formData.email) {
    sanitizedData.email = sanitizeInput(formData.email).toLowerCase();
    if (!isValidEmail(sanitizedData.email)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  if (formData.phone) {
    sanitizedData.phone = sanitizeInput(formData.phone);
    if (!isValidPhone(sanitizedData.phone)) {
      errors.push('Please enter a valid phone number');
    }
  }
  
  if (formData.companyName) {
    sanitizedData.companyName = sanitizeInput(formData.companyName);
    if (sanitizedData.companyName.length > 200) {
      errors.push('Company name must be less than 200 characters');
    }
  }
  
  if (formData.freightType) {
    sanitizedData.freightType = sanitizeInput(formData.freightType);
  }
  
  if (formData.pickupLocation) {
    sanitizedData.pickupLocation = sanitizeInput(formData.pickupLocation);
    if (sanitizedData.pickupLocation.length < 3) {
      errors.push('Pickup location must be at least 3 characters long');
    }
  }
  
  if (formData.deliveryLocation) {
    sanitizedData.deliveryLocation = sanitizeInput(formData.deliveryLocation);
    if (sanitizedData.deliveryLocation.length < 3) {
      errors.push('Delivery location must be at least 3 characters long');
    }
  }
  
  if (formData.weight) {
    sanitizedData.weight = sanitizeInput(formData.weight);
  }
  
  if (formData.dimensions) {
    sanitizedData.dimensions = sanitizeInput(formData.dimensions);
  }
  
  if (formData.pickupDate) {
    sanitizedData.pickupDate = sanitizeInput(formData.pickupDate);
  }
  
  if (formData.notes) {
    sanitizedData.notes = sanitizeInput(formData.notes);
    if (sanitizedData.notes.length > 2000) {
      errors.push('Notes must be less than 2000 characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};

/**
 * Validates and sanitizes driver application form data
 * @param {Object} formData - Raw form data
 * @returns {Object} - { isValid: boolean, errors: Array<string>, sanitizedData: Object }
 */
export const validateApplicationForm = (formData) => {
  const errors = [];
  const sanitizedData = {};
  
  // Required fields
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'state', 'cdlClass', 'yearsExperience'];
  const requiredValidation = validateRequiredFields(formData, requiredFields);
  
  if (!requiredValidation.isValid) {
    errors.push(`Missing required fields: ${requiredValidation.missingFields.join(', ')}`);
  }
  
  // Sanitize and validate each field
  if (formData.firstName) {
    sanitizedData.firstName = sanitizeInput(formData.firstName);
    if (sanitizedData.firstName.length < 2) {
      errors.push('First name must be at least 2 characters long');
    }
    if (sanitizedData.firstName.length > 50) {
      errors.push('First name must be less than 50 characters');
    }
  }
  
  if (formData.lastName) {
    sanitizedData.lastName = sanitizeInput(formData.lastName);
    if (sanitizedData.lastName.length < 2) {
      errors.push('Last name must be at least 2 characters long');
    }
    if (sanitizedData.lastName.length > 50) {
      errors.push('Last name must be less than 50 characters');
    }
  }
  
  if (formData.email) {
    sanitizedData.email = sanitizeInput(formData.email).toLowerCase();
    if (!isValidEmail(sanitizedData.email)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  if (formData.phone) {
    sanitizedData.phone = sanitizeInput(formData.phone);
    if (!isValidPhone(sanitizedData.phone)) {
      errors.push('Please enter a valid phone number');
    }
  }
  
  if (formData.city) {
    sanitizedData.city = sanitizeInput(formData.city);
    if (sanitizedData.city.length < 2) {
      errors.push('City must be at least 2 characters long');
    }
    if (sanitizedData.city.length > 100) {
      errors.push('City must be less than 100 characters');
    }
  }
  
  if (formData.state) {
    sanitizedData.state = sanitizeInput(formData.state);
    if (sanitizedData.state.length < 2) {
      errors.push('State must be at least 2 characters long');
    }
    if (sanitizedData.state.length > 50) {
      errors.push('State must be less than 50 characters');
    }
  }
  
  if (formData.cdlClass) {
    sanitizedData.cdlClass = sanitizeInput(formData.cdlClass);
    const validCdlClasses = ['Class A', 'Class B', 'Class C'];
    if (!validCdlClasses.includes(sanitizedData.cdlClass)) {
      errors.push('Please select a valid CDL class');
    }
  }
  
  if (formData.yearsExperience) {
    sanitizedData.yearsExperience = sanitizeInput(formData.yearsExperience);
    const years = parseInt(sanitizedData.yearsExperience, 10);
    if (isNaN(years) || years < 0 || years > 50) {
      errors.push('Years of experience must be a valid number between 0 and 50');
    }
  }
  
  // Endorsements (optional array)
  if (formData.endorsements && Array.isArray(formData.endorsements)) {
    sanitizedData.endorsements = formData.endorsements.map(endorsement => sanitizeInput(endorsement));
  } else {
    sanitizedData.endorsements = [];
  }
  
  // TWIC card (optional boolean)
  sanitizedData.hasTWIC = formData.hasTWIC === true || formData.hasTWIC === 'true';
  
  // Message (optional)
  if (formData.message) {
    sanitizedData.message = sanitizeInput(formData.message);
    if (sanitizedData.message.length > 2000) {
      errors.push('Message must be less than 2000 characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};

