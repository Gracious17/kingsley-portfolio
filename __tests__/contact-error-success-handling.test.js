/**
 * Property-Based Tests for Contact Component Error and Success Handling
 * Feature: emailjs-migration, Property 5: Error State Handling, Property 6: Success State Handling
 * Validates: Requirements 3.1, 3.2, 3.4, 3.5
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
        <button onClick={onClose} data-testid="close-success">Close</button>
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

import { sendEmail, getErrorMessage, initializeEmailJS } from '../lib/emailjs-service';

describe('Contact Component Error and Success Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables for tests
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';
  });

  describe('Property 5: Error State Handling', () => {
    test('should display error message when EmailJS fails', async () => {
      const errorMessage = 'Failed to send email: Network error';
      sendEmail.mockRejectedValue(new Error(errorMessage));
      getErrorMessage.mockReturnValue('Something went wrong while sending your message. Please try again.');
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'John Doe' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+1234567890' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'john@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Test Subject' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Test message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify error state is shown
      await waitFor(() => {
        expect(screen.getByText('Something went wrong while sending your message. Please try again.')).toBeInTheDocument();
      });

      // Verify getErrorMessage was called with the error
      expect(getErrorMessage).toHaveBeenCalledWith(expect.any(Error));
    });

    test('should maintain form data when error occurs', async () => {
      sendEmail.mockRejectedValue(new Error('Network error'));
      getErrorMessage.mockReturnValue('Network error occurred');
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Jane Doe' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+9876543210' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'jane@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Important Subject' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Important message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText('Network error occurred')).toBeInTheDocument();
      });

      // Verify form data is preserved
      expect(inputs[0]).toHaveValue('Jane Doe');
      expect(inputs[1]).toHaveValue('+9876543210');
      expect(inputs[2]).toHaveValue('jane@example.com');
      expect(inputs[3]).toHaveValue('Important Subject');
      expect(inputs[4]).toHaveValue('Important message');
    });

    test('should handle different types of EmailJS errors', async () => {
      const testCases = [
        {
          error: { status: 400, message: 'Bad request' },
          expectedMessage: 'Please check your form data and try again.'
        },
        {
          error: { status: 401, message: 'Unauthorized' },
          expectedMessage: 'Email service configuration error. Please contact support.'
        },
        {
          error: { status: 429, message: 'Too many requests' },
          expectedMessage: 'Too many requests. Please wait a moment and try again.'
        }
      ];

      for (const testCase of testCases) {
        jest.clearAllMocks();
        sendEmail.mockRejectedValue(testCase.error);
        getErrorMessage.mockReturnValue(testCase.expectedMessage);
        initializeEmailJS.mockReturnValue({
          serviceId: 'service_acvtu5p',
          templateId: 'template_6pve3nf',
          publicKey: 'iNsxXLdF4w74sIEzg'
        });

        const { unmount } = render(<Contact />);

        // Fill out the form
        const inputs = screen.getAllByDisplayValue('');
        fireEvent.change(inputs[0], { target: { name: 'name', value: 'Test User' } });
        fireEvent.change(inputs[1], { target: { name: 'phone', value: '1234567890' } });
        fireEvent.change(inputs[2], { target: { name: 'email', value: 'test@example.com' } });
        fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Test' } });
        fireEvent.change(inputs[4], { target: { name: 'message', value: 'Test message' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /send message/i }));

        // Verify specific error message is shown
        await waitFor(() => {
          expect(screen.getByText(testCase.expectedMessage)).toBeInTheDocument();
        });

        // Clean up for next iteration
        unmount();
      }
    });
  });

  describe('Property 6: Success State Handling', () => {
    test('should show success message when email is sent successfully', async () => {
      sendEmail.mockResolvedValue({ success: true, status: 200, text: 'OK' });
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Success User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+1111111111' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'success@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Success Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Success message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify success state is shown
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
        expect(screen.getByText('Email sent successfully!')).toBeInTheDocument();
      });
    });

    test('should reset form when success message is closed', async () => {
      sendEmail.mockResolvedValue({ success: true, status: 200, text: 'OK' });
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Reset User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+2222222222' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'reset@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Reset Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Reset message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
      });

      // Close the success message
      fireEvent.click(screen.getByTestId('close-success'));

      // Verify form is reset
      await waitFor(() => {
        const resetInputs = screen.getAllByDisplayValue('');
        expect(resetInputs).toHaveLength(5);
        resetInputs.forEach(input => {
          expect(input).toHaveValue('');
        });
      });
    });

    test('should maintain success state until manually closed', async () => {
      sendEmail.mockResolvedValue({ success: true, status: 200, text: 'OK' });
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Persistent User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+3333333333' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'persistent@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Persistent Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Persistent message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify success state persists
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
      });

      // Wait a bit more to ensure it doesn't auto-close
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
  });
});