# Requirements Document

## Introduction

Migrate the existing contact form from server-side Nodemailer implementation to client-side EmailJS service to simplify email handling and reduce server dependencies.

## Glossary

- **EmailJS**: Third-party service that enables sending emails directly from client-side JavaScript
- **Contact_Form**: The existing React component that handles user contact submissions
- **Email_Service**: The service responsible for sending emails from form submissions
- **Form_Handler**: The function that processes form submission and sends emails

## Requirements

### Requirement 1: EmailJS Integration

**User Story:** As a developer, I want to replace Nodemailer with EmailJS, so that I can send emails without server-side configuration and reduce backend complexity.

#### Acceptance Criteria

1. WHEN the EmailJS service is configured, THE Email_Service SHALL use EmailJS instead of the current API route
2. WHEN a user submits the contact form, THE Form_Handler SHALL send emails directly from the client using EmailJS
3. WHEN EmailJS is integrated, THE system SHALL maintain all existing form fields (name, phone, email, subject, message)
4. WHEN EmailJS sends an email, THE system SHALL preserve the current email template structure and content
5. THE system SHALL remove the existing `/api/contact` route after successful migration

### Requirement 2: Configuration Management

**User Story:** As a developer, I want to securely configure EmailJS credentials, so that the service works properly without exposing sensitive information.

#### Acceptance Criteria

1. WHEN EmailJS is configured, THE system SHALL use environment variables for service configuration
2. THE system SHALL store the following EmailJS credentials in environment variables:
   - Service ID: service_acvtu5p (email service provider configuration)
   - Template ID: template_6pve3nf (email template configuration)
   - Public Key: iNsxXLdF4w74sIEzg (EmailJS account public key)
3. WHEN the application starts, THE Email_Service SHALL initialize with the configured EmailJS parameters
4. THE system SHALL validate that all required EmailJS configuration is present before allowing form submission
5. THE developer SHALL obtain these credentials from the EmailJS dashboard after:
   - Creating an EmailJS account
   - Setting up an email service (Gmail, Outlook, etc.)
   - Creating an email template with form field mappings
   - Getting the public key from account settings

### Requirement 3: Error Handling and User Experience

**User Story:** As a user, I want the same reliable form experience, so that I can successfully send messages regardless of the underlying email service.

#### Acceptance Criteria

1. WHEN EmailJS fails to send an email, THE Form_Handler SHALL display appropriate error messages
2. WHEN EmailJS successfully sends an email, THE system SHALL show the existing success message
3. WHEN the form is submitted, THE system SHALL maintain the current loading state behavior
4. WHEN network errors occur, THE Form_Handler SHALL provide clear feedback to the user
5. THE system SHALL maintain the existing form reset functionality after successful submission

### Requirement 4: Email Template Compatibility

**User Story:** As a recipient, I want to receive emails in the same format, so that the migration doesn't affect the email content or structure.

#### Acceptance Criteria

1. WHEN EmailJS sends an email, THE email SHALL contain the sender's name in the subject line
2. WHEN EmailJS sends an email, THE email body SHALL include the subject, message, and contact details
3. THE EmailJS template SHALL format contact details (phone and email) in a readable format
4. WHEN no subject is provided, THE system SHALL handle it gracefully with a default message
5. THE email recipient SHALL remain the same as the current configuration