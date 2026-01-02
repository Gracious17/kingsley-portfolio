/**
 * Property-Based Tests for EmailJS Service
 * Feature: emailjs-migration, Property 4: Configuration Validation
 * Validates: Requirements 2.3, 2.4
 */

import {
  validateEmailJSConfig,
  initializeEmailJS,
  mapFormDataToTemplateParams,
  sendEmail,
  getErrorMessage,
  emailjsConfig
} from '../lib/emailjs-service';

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn(),
}));

import emailjs from '@emailjs/browser';

describe('EmailJS Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('Property 4: Configuration Validation', () => {
    test('should validate complete EmailJS configuration', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      // Re-import to get updated config
      jest.resetModules();
      const { validateEmailJSConfig } = require('../lib/emailjs-service');
      
      const validation = validateEmailJSConfig();
      
      expect(validation.isValid).toBe(true);
      expect(validation.missing).toHaveLength(0);
      expect(validation.config.serviceId).toBe('service_acvtu5p');
      expect(validation.config.templateId).toBe('template_6pve3nf');
      expect(validation.config.publicKey).toBe('iNsxXLdF4w74sIEzg');
    });

    test('should detect missing configuration fields', () => {
      // Test with missing service ID
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      jest.resetModules();
      const { validateEmailJSConfig } = require('../lib/emailjs-service');
      
      const validation = validateEmailJSConfig();
      
      expect(validation.isValid).toBe(false);
      expect(validation.missing).toContain('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    });

    test('should detect empty configuration fields', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = '';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      jest.resetModules();
      const { validateEmailJSConfig } = require('../lib/emailjs-service');
      
      const validation = validateEmailJSConfig();
      
      expect(validation.isValid).toBe(false);
      expect(validation.missing).toContain('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    });

    test('should initialize EmailJS with valid configuration', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      jest.resetModules();
      const emailjsMock = require('@emailjs/browser');
      const { initializeEmailJS } = require('../lib/emailjs-service');
      
      const config = initializeEmailJS();
      
      expect(emailjsMock.init).toHaveBeenCalledWith('iNsxXLdF4w74sIEzg');
      expect(config.serviceId).toBe('service_acvtu5p');
      expect(config.templateId).toBe('template_6pve3nf');
      expect(config.publicKey).toBe('iNsxXLdF4w74sIEzg');
    });

    test('should throw error when initializing with invalid configuration', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      jest.resetModules();
      const emailjsMock = require('@emailjs/browser');
      const { initializeEmailJS } = require('../lib/emailjs-service');
      
      expect(() => initializeEmailJS()).toThrow('EmailJS configuration is invalid');
      expect(emailjsMock.init).not.toHaveBeenCalled();
    });
  });

  describe('Template Parameter Mapping', () => {
    test('should map form data to template parameters correctly', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        subject: 'Test Subject',
        message: 'Test message content'
      };

      const templateParams = mapFormDataToTemplateParams(formData);

      expect(templateParams).toEqual({
        from_name: 'John Doe',
        from_email: 'john@example.com',
        phone: '+1234567890',
        subject: 'Test Subject',
        message: 'Test message content',
        to_email: 'kingsleygracious16@gmail.com'
      });
    });

    test('should handle missing form fields with defaults', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com'
        // Missing phone, subject, message
      };

      const templateParams = mapFormDataToTemplateParams(formData);

      expect(templateParams.from_name).toBe('John Doe');
      expect(templateParams.from_email).toBe('john@example.com');
      expect(templateParams.phone).toBe('');
      expect(templateParams.subject).toBe('No subject provided');
      expect(templateParams.message).toBe('');
      expect(templateParams.to_email).toBe('kingsleygracious16@gmail.com');
    });

    test('should handle empty form data', () => {
      const formData = {};

      const templateParams = mapFormDataToTemplateParams(formData);

      expect(templateParams.from_name).toBe('');
      expect(templateParams.from_email).toBe('');
      expect(templateParams.phone).toBe('');
      expect(templateParams.subject).toBe('No subject provided');
      expect(templateParams.message).toBe('');
      expect(templateParams.to_email).toBe('kingsleygracious16@gmail.com');
    });
  });

  describe('Email Sending', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';
    });

    test('should send email successfully with valid configuration', async () => {
      const mockResponse = { status: 200, text: 'OK' };
      
      jest.resetModules();
      const emailjsMock = require('@emailjs/browser');
      emailjsMock.send.mockResolvedValue(mockResponse);
      
      const { sendEmail } = require('../lib/emailjs-service');

      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        subject: 'Test Subject',
        message: 'Test message'
      };

      const result = await sendEmail(formData);

      expect(result.success).toBe(true);
      expect(result.status).toBe(200);
      expect(result.text).toBe('OK');
      expect(emailjsMock.send).toHaveBeenCalledWith(
        'service_acvtu5p',
        'template_6pve3nf',
        expect.objectContaining({
          from_name: 'John Doe',
          from_email: 'john@example.com',
          phone: '+1234567890',
          subject: 'Test Subject',
          message: 'Test message',
          to_email: 'kingsleygracious16@gmail.com'
        }),
        'iNsxXLdF4w74sIEzg'
      );
    });

    test('should throw error when sending with invalid configuration', async () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

      jest.resetModules();
      const emailjsMock = require('@emailjs/browser');
      const { sendEmail } = require('../lib/emailjs-service');

      const formData = { name: 'John', email: 'john@example.com' };

      await expect(sendEmail(formData)).rejects.toThrow('EmailJS configuration is invalid');
      expect(emailjsMock.send).not.toHaveBeenCalled();
    });

    test('should handle EmailJS send errors', async () => {
      const mockError = { text: 'Service unavailable', message: 'Service unavailable' };
      
      jest.resetModules();
      const emailjsMock = require('@emailjs/browser');
      emailjsMock.send.mockRejectedValue(mockError);
      
      const { sendEmail } = require('../lib/emailjs-service');

      const formData = { name: 'John', email: 'john@example.com' };

      await expect(sendEmail(formData)).rejects.toThrow('Failed to send email: Service unavailable');
    });
  });

  describe('Error Message Handling', () => {
    test('should return appropriate error messages for different error types', () => {
      // Configuration error
      const configError = new Error('EmailJS configuration is invalid');
      expect(getErrorMessage(configError)).toBe('Email service configuration error. Please contact support.');

      // Send error
      const sendError = new Error('Failed to send email: Network error');
      expect(getErrorMessage(sendError)).toBe('Something went wrong while sending your message. Please try again.');

      // Status code errors
      const status400Error = { status: 400 };
      expect(getErrorMessage(status400Error)).toBe('Please check your form data and try again.');

      const status401Error = { status: 401 };
      expect(getErrorMessage(status401Error)).toBe('Email service configuration error. Please contact support.');

      const status429Error = { status: 429 };
      expect(getErrorMessage(status429Error)).toBe('Too many requests. Please wait a moment and try again.');

      // Generic error
      const genericError = new Error('Unknown error');
      expect(getErrorMessage(genericError)).toBe('Something went wrong. Please try again.');
    });
  });
});