# Implementation Plan: EmailJS Migration

## Overview

This implementation plan converts the contact form from server-side Nodemailer to client-side EmailJS, eliminating the API route dependency while maintaining the same user experience.

## Tasks

- [x] 1. Install EmailJS and configure environment variables
  - Install @emailjs/browser package
  - Add EmailJS credentials to environment variables
  - _Requirements: 2.1, 2.2_

- [x] 1.1 Write property test for environment configuration
  - **Property 4: Configuration Validation**
  - **Validates: Requirements 2.1, 2.3, 2.4**

- [x] 2. Create EmailJS service utility
  - [x] 2.1 Create EmailJS configuration and initialization utility
    - Write utility functions for EmailJS setup and validation
    - _Requirements: 2.3, 2.4_

  - [x] 2.2 Write property test for EmailJS service initialization
    - **Property 4: Configuration Validation**
    - **Validates: Requirements 2.3, 2.4**

- [x] 3. Update Contact component to use EmailJS
  - [x] 3.1 Replace fetch call with EmailJS send method
    - Modify handleSubmit function to use EmailJS instead of API route
    - Map form data to EmailJS template parameters
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 3.2 Write property test for EmailJS service usage
    - **Property 1: EmailJS Service Usage**
    - **Validates: Requirements 1.1, 1.2**

  - [x] 3.3 Write property test for template parameter mapping
    - **Property 3: Template Parameter Mapping**
    - **Validates: Requirements 1.4**

- [x] 4. Update error and success handling
  - [x] 4.1 Adapt error handling for EmailJS responses
    - Update error handling to work with EmailJS error format
    - Maintain existing error message display
    - _Requirements: 3.1, 3.4_

  - [x] 4.2 Ensure success handling works with EmailJS
    - Verify success state and form reset functionality
    - _Requirements: 3.2, 3.5_

  - [x] 4.3 Write property tests for error and success handling
    - **Property 5: Error State Handling**
    - **Property 6: Success State Handling**
    - **Validates: Requirements 3.1, 3.2, 3.4, 3.5**

- [x] 5. Implement loading state management
  - [x] 5.1 Update loading state for EmailJS operations
    - Ensure loading state works correctly with EmailJS async operations
    - _Requirements: 3.3_

  - [x] 5.2 Write property test for loading state consistency
    - **Property 7: Loading State Consistency**
    - **Validates: Requirements 3.3**

- [ ] 6. Handle edge cases and validation
  - [ ] 6.1 Implement default subject handling
    - Add logic to handle empty subject field
    - _Requirements: 4.4_

  - [ ] 6.2 Verify all form fields are preserved
    - Ensure no form functionality is lost during migration
    - _Requirements: 1.3_

  - [ ] 6.3 Write property tests for edge cases
    - **Property 9: Default Subject Handling**
    - **Property 2: Form Field Preservation**
    - **Validates: Requirements 1.3, 4.4**

- [ ] 7. Checkpoint - Test EmailJS integration
  - Ensure all tests pass, verify EmailJS sends emails correctly, ask the user if questions arise.

- [ ] 8. Clean up server-side code
  - [ ] 8.1 Remove the /api/contact route
    - Delete the API route file
    - _Requirements: 1.5_

  - [ ] 8.2 Remove Nodemailer dependencies
    - Remove nodemailer from package.json if not used elsewhere
    - Clean up any unused environment variables
    - _Requirements: 1.5_

- [ ] 8.3 Write test to verify API route removal
  - **Validates: Requirements 1.5**

- [ ] 9. Final integration testing
  - [ ] 9.1 Test complete form submission flow
    - Verify end-to-end functionality with real EmailJS account
    - Test email delivery and formatting
    - _Requirements: 4.1, 4.2, 4.3, 4.5_

  - [ ] 9.2 Write property test for email content completeness
    - **Property 8: Email Content Completeness**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.5**

- [ ] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, verify complete migration, ask the user if questions arise.

## Notes

- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The migration maintains backward compatibility in terms of user experience
- EmailJS credentials are already provided: service_acvtu5p, template_6pve3nf, iNsxXLdF4w74sIEzg