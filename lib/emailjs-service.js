import emailjs from '@emailjs/browser';

/**
 * EmailJS Service Configuration and Utilities
 * Handles EmailJS initialization, validation, and email sending
 */

// EmailJS Configuration
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

/**
 * Validates that all required EmailJS environment variables are present
 * @returns {Object} Validation result with isValid boolean and missing fields array
 */
export const validateEmailJSConfig = () => {
  const requiredFields = [
    { key: 'serviceId', env: 'NEXT_PUBLIC_EMAILJS_SERVICE_ID' },
    { key: 'templateId', env: 'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID' },
    { key: 'publicKey', env: 'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY' },
  ];

  const missing = requiredFields.filter(field => 
    !emailjsConfig[field.key] || emailjsConfig[field.key].trim() === ''
  );

  return {
    isValid: missing.length === 0,
    missing: missing.map(field => field.env),
    config: emailjsConfig,
  };
};

/**
 * Initializes EmailJS with the configured public key
 * @throws {Error} If configuration is invalid
 */
export const initializeEmailJS = () => {
  const validation = validateEmailJSConfig();
  
  if (!validation.isValid) {
    throw new Error(
      `EmailJS configuration is invalid. Missing environment variables: ${validation.missing.join(', ')}`
    );
  }

  // Initialize EmailJS with public key
  emailjs.init(emailjsConfig.publicKey);
  
  return validation.config;
};

/**
 * Maps form data to EmailJS template parameters
 * @param {Object} formData - Form data object
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.phone - Sender's phone
 * @param {string} formData.subject - Email subject
 * @param {string} formData.message - Email message
 * @returns {Object} Template parameters for EmailJS
 */
export const mapFormDataToTemplateParams = (formData) => {
  return {
    // Match the exact field names from your EmailJS template
    name: formData.name || '',
    email: formData.email || '',
    message: formData.message || '',
    time: formData.phone || '', // Map phone to 'time' field in template
    title: formData.subject || 'No subject provided', // Map subject to 'title' field in template
  };
};

/**
 * Sends email using EmailJS
 * @param {Object} formData - Form data to send
 * @returns {Promise<Object>} EmailJS response
 * @throws {Error} If configuration is invalid or sending fails
 */
export const sendEmail = async (formData) => {
  const validation = validateEmailJSConfig();
  
  if (!validation.isValid) {
    throw new Error(
      `EmailJS configuration is invalid. Missing: ${validation.missing.join(', ')}`
    );
  }

  const templateParams = mapFormDataToTemplateParams(formData);
  
  // Debug: Log the template parameters being sent
  console.log('EmailJS Template Parameters:', templateParams);

  try {
    const response = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    );

    return {
      success: true,
      status: response.status,
      text: response.text,
    };
  } catch (error) {
    throw new Error(`Failed to send email: ${error.text || error.message || 'Unknown error'}`);
  }
};

/**
 * Gets user-friendly error message based on EmailJS error
 * @param {Error} error - EmailJS error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (error && error.message && error.message.includes('configuration is invalid')) {
    return 'Email service configuration error. Please contact support.';
  }
  
  if (error && error.message && error.message.includes('Failed to send email')) {
    return 'Something went wrong while sending your message. Please try again.';
  }

  // Handle specific EmailJS status codes if available
  if (error && error.status) {
    switch (error.status) {
      case 400:
        return 'Please check your form data and try again.';
      case 401:
        return 'Email service configuration error. Please contact support.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  return 'Something went wrong. Please try again.';
};

// Export for manual initialization if needed
export { emailjs };