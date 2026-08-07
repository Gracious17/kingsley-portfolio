/**
 * Property-Based Tests for Contact Component EmailJS Integration
 * Feature: emailjs-migration, Property 1: EmailJS Service Usage
 * Validates: Requirements 1.1, 1.2
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../app/components/Contact';

// Mock EmailJS service
jest.mock('../lib/emailjs-service', () => ({
  sendEmail: jest.fn(),
  getErrorMessage: jest.fn(),
  initializeEmailJS: jest.fn(),
}));

// Mock SuccessMessage component
jest.mock('../app/components/SuccessMessage', () => {
  return function MockSuccessMessage({ onClose }) {
    return (
      <div data-testid="success-message">
        <p>Email sent successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

import { sendEmail, initializeEmailJS } from '../lib/emailjs-service';

describe('Contact Component EmailJS Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables for tests
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';
  });

  describe('Property 1: EmailJS Service Usage', () => {
    test('should use EmailJS send method instead of fetch API route', async () => {
      sendEmail.mockResolvedValue({ success: true, status: 200, text: 'OK' });
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form using getAllByDisplayValue
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'John Doe' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+1234567890' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'john@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Test Subject' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Test message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify EmailJS methods are called
      await waitFor(() => {
        expect(initializeEmailJS).toHaveBeenCalled();
        expect(sendEmail).toHaveBeenCalledWith({
          name: 'John Doe',
          phone: '+1234567890',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'Test message'
        });
      });

      // Verify success state is shown
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
      });
    });

    test('should preserve all form fields during EmailJS integration', () => {
      render(<Contact />);

      // Verify all form fields are present by checking for inputs
      const inputs = screen.getAllByDisplayValue('');
      expect(inputs).toHaveLength(5); // name, phone, email, subject, message

      // Test that all fields can be filled
      fireEvent.change(inputs[0], { target: { value: 'Test Name' } });
      fireEvent.change(inputs[1], { target: { value: 'Test Phone' } });
      fireEvent.change(inputs[2], { target: { value: 'test@example.com' } });
      fireEvent.change(inputs[3], { target: { value: 'Test Subject' } });
      fireEvent.change(inputs[4], { target: { value: 'Test Message' } });

      // Verify all fields have the expected values
      expect(inputs[0]).toHaveValue('Test Name');
      expect(inputs[1]).toHaveValue('Test Phone');
      expect(inputs[2]).toHaveValue('test@example.com');
      expect(inputs[3]).toHaveValue('Test Subject');
      expect(inputs[4]).toHaveValue('Test Message');
    });

    test('should map form data to EmailJS template parameters correctly', async () => {
      sendEmail.mockResolvedValue({ success: true, status: 200, text: 'OK' });
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form with specific test data
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Jane Smith' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+9876543210' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'jane.smith@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Business Inquiry' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'I would like to discuss a project opportunity.' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify EmailJS is called with correctly mapped form data
      await waitFor(() => {
        expect(sendEmail).toHaveBeenCalledWith({
          name: 'Jane Smith',
          phone: '+9876543210',
          email: 'jane.smith@example.com',
          subject: 'Business Inquiry',
          message: 'I would like to discuss a project opportunity.'
        });
      });
    });

    test('should not submit when the required subject field is empty', async () => {
      sendEmail.mockResolvedValue({ success: true, status: 200, text: 'OK' });
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill everything except subject, which is marked required in Contact.jsx.
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Test User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '1234567890' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'test@example.com' } });
      // inputs[3] (subject) deliberately left blank
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Test message' } });

      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Native required-field validation blocks submit, so nothing is sent.
      // The "no subject provided" default is covered at the service layer in
      // emailjs-service.test.js, which is where that behaviour actually lives.
      await waitFor(() => {
        expect(sendEmail).not.toHaveBeenCalled();
      });
    });
  });
});