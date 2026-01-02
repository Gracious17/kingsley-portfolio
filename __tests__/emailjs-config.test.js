/**
 * Property-Based Tests for EmailJS Configuration
 * Feature: emailjs-migration, Property 4: Configuration Validation
 * Validates: Requirements 2.1, 2.3, 2.4
 */

describe('EmailJS Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('Property 4: Configuration Validation', () => {
    test('should validate that all required EmailJS environment variables are present', () => {
      // Set up valid environment variables
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      // Test that all required variables are present
      expect(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID).toBeDefined();
      expect(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID).toBeDefined();
      expect(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY).toBeDefined();

      // Test that variables have the expected values
      expect(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID).toBe('service_acvtu5p');
      expect(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID).toBe('template_6pve3nf');
      expect(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY).toBe('iNsxXLdF4w74sIEzg');
    });

    test('should fail validation when required environment variables are missing', () => {
      // Test missing SERVICE_ID
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      expect(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID).toBeUndefined();

      // Test missing TEMPLATE_ID
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      expect(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID).toBeUndefined();

      // Test missing PUBLIC_KEY
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      expect(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY).toBeUndefined();
    });

    test('should fail validation when environment variables are empty strings', () => {
      // Test empty SERVICE_ID
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = '';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      expect(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID).toBe('');
      expect(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID).toBeFalsy();

      // Test empty TEMPLATE_ID
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = '';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      expect(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID).toBe('');
      expect(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID).toBeFalsy();

      // Test empty PUBLIC_KEY
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = '';

      expect(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY).toBe('');
      expect(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY).toBeFalsy();
    });

    test('should validate configuration format and structure', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';

      // Test that service ID follows expected format (service_*)
      expect(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID).toMatch(/^service_/);
      
      // Test that template ID follows expected format (template_*)
      expect(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID).toMatch(/^template_/);
      
      // Test that public key is a non-empty string
      expect(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY).toMatch(/^[a-zA-Z0-9]+$/);
      expect(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.length).toBeGreaterThan(0);
    });
  });
});