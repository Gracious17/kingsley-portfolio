/**
 * Property-Based Tests for Contact Component Loading State Management
 * Feature: emailjs-migration, Property 7: Loading State Consistency
 * Validates: Requirements 3.3
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

describe('Contact Component Loading State Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables for tests
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'service_acvtu5p';
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'template_6pve3nf';
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'iNsxXLdF4w74sIEzg';
  });

  describe('Property 7: Loading State Consistency', () => {
    test('should show loading state during EmailJS operation', async () => {
      // Create a promise that we can control
      let resolveEmailSend;
      const emailSendPromise = new Promise((resolve) => {
        resolveEmailSend = resolve;
      });
      
      sendEmail.mockReturnValue(emailSendPromise);
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Loading User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+1111111111' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'loading@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Loading Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Loading message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify loading state is shown
      await waitFor(() => {
        expect(screen.getByText('Sending Message...')).toBeInTheDocument();
      });

      // Verify button is disabled during loading
      const submitButton = screen.getByRole('button', { name: /sending message/i });
      expect(submitButton).toBeDisabled();

      // Resolve the promise to complete the operation
      resolveEmailSend({ success: true, status: 200, text: 'OK' });

      // Verify loading state is cleared
      await waitFor(() => {
        expect(screen.queryByText('Sending Message...')).not.toBeInTheDocument();
      });
    });

    test('should disable form submission during loading', async () => {
      // Create a promise that we can control
      let resolveEmailSend;
      const emailSendPromise = new Promise((resolve) => {
        resolveEmailSend = resolve;
      });
      
      sendEmail.mockReturnValue(emailSendPromise);
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Disable User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+2222222222' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'disable@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Disable Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Disable message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify button is disabled and shows loading text
      await waitFor(() => {
        const loadingButton = screen.getByRole('button', { name: /sending message/i });
        expect(loadingButton).toBeDisabled();
      });

      // Try to click the button again (should not trigger another call)
      const loadingButton = screen.getByRole('button', { name: /sending message/i });
      fireEvent.click(loadingButton);

      // Verify sendEmail was only called once
      expect(sendEmail).toHaveBeenCalledTimes(1);

      // Resolve the promise
      resolveEmailSend({ success: true, status: 200, text: 'OK' });

      // Wait for completion
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
      });
    });

    test('should clear loading state on error', async () => {
      sendEmail.mockRejectedValue(new Error('Network error'));
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Error User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+3333333333' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'error@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Error Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Error message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify loading state appears briefly
      await waitFor(() => {
        expect(screen.getByText('Sending Message...')).toBeInTheDocument();
      });

      // Verify loading state is cleared and button is re-enabled after error
      await waitFor(() => {
        expect(screen.queryByText('Sending Message...')).not.toBeInTheDocument();
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).not.toBeDisabled();
      });
    });

    test('should maintain loading state consistency across multiple submissions', async () => {
      let resolveCount = 0;
      const createControlledPromise = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolveCount++;
            resolve({ success: true, status: 200, text: 'OK' });
          }, 100);
        });
      };

      sendEmail.mockImplementation(() => createControlledPromise());
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Consistent User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+4444444444' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'consistent@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Consistent Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Consistent message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify loading state
      await waitFor(() => {
        expect(screen.getByText('Sending Message...')).toBeInTheDocument();
      });

      // Wait for completion
      await waitFor(() => {
        expect(screen.getByTestId('success-message')).toBeInTheDocument();
      }, { timeout: 3000 });

      // Close success message to reset form
      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      // Verify form is reset and ready for another submission
      await waitFor(() => {
        const resetInputs = screen.getAllByDisplayValue('');
        expect(resetInputs).toHaveLength(5);
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).not.toBeDisabled();
      });
    });

    test('should show loading spinner in button during submission', async () => {
      // Create a promise that we can control
      let resolveEmailSend;
      const emailSendPromise = new Promise((resolve) => {
        resolveEmailSend = resolve;
      });
      
      sendEmail.mockReturnValue(emailSendPromise);
      initializeEmailJS.mockReturnValue({
        serviceId: 'service_acvtu5p',
        templateId: 'template_6pve3nf',
        publicKey: 'iNsxXLdF4w74sIEzg'
      });

      render(<Contact />);

      // Fill out the form
      const inputs = screen.getAllByDisplayValue('');
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Spinner User' } });
      fireEvent.change(inputs[1], { target: { name: 'phone', value: '+5555555555' } });
      fireEvent.change(inputs[2], { target: { name: 'email', value: 'spinner@example.com' } });
      fireEvent.change(inputs[3], { target: { name: 'subject', value: 'Spinner Test' } });
      fireEvent.change(inputs[4], { target: { name: 'message', value: 'Spinner message' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /send message/i }));

      // Verify loading spinner is shown (SVG element)
      await waitFor(() => {
        const spinner = document.querySelector('svg.animate-spin');
        expect(spinner).toBeInTheDocument();
      });

      // Resolve the promise
      resolveEmailSend({ success: true, status: 200, text: 'OK' });

      // Verify spinner is removed
      await waitFor(() => {
        const spinner = document.querySelector('svg.animate-spin');
        expect(spinner).not.toBeInTheDocument();
      });
    });
  });
});