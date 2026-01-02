# Design Document: EmailJS Migration

## Overview

This design outlines the migration from the current server-side Nodemailer implementation to a client-side EmailJS solution for the contact form. The migration will eliminate the need for server-side email handling while maintaining the same user experience and functionality.

## Architecture

### Current Architecture
```
Contact Form → API Route (/api/contact) → Nodemailer → Gmail SMTP → Email Delivery
```

### New Architecture
```
Contact Form → EmailJS Client Library → EmailJS Service → Email Provider → Email Delivery
```

### Key Changes
- Remove server-side API route dependency
- Integrate EmailJS client library in the React component
- Move email sending logic to the frontend
- Maintain existing form validation and user experience

## Components and Interfaces

### EmailJS Service Integration

**EmailJS Configuration:**
```typescript
interface EmailJSConfig {
  serviceId: string;    // service_acvtu5p
  templateId: string;   // template_6pve3nf
  publicKey: string;    // iNsxXLdF4w74sIEzg
}
```

**Form Data Interface:**
```typescript
interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}
```

### Modified Contact Component

**EmailJS Integration Points:**
1. **Library Import:** Add EmailJS client library
2. **Configuration:** Initialize EmailJS with credentials
3. **Form Handler:** Replace fetch call with EmailJS send method
4. **Error Handling:** Adapt error handling for EmailJS responses

### Environment Variables

**Required Environment Variables:**
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_acvtu5p
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_6pve3nf
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=iNsxXLdF4w74sIEzg
```

Note: Using `NEXT_PUBLIC_` prefix to make variables accessible in client-side code.

## Data Models

### EmailJS Template Variables

The EmailJS template should be configured to receive these variables:
```typescript
interface EmailTemplateParams {
  from_name: string;      // Maps to formData.name
  from_email: string;     // Maps to formData.email
  phone: string;          // Maps to formData.phone
  subject: string;        // Maps to formData.subject
  message: string;        // Maps to formData.message
  to_email: string;       // Recipient email (your email)
}
```

### Response Handling

**EmailJS Response Types:**
```typescript
interface EmailJSResponse {
  status: number;
  text: string;
}

interface EmailJSError {
  status: number;
  text: string;
  message?: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: EmailJS Service Usage
*For any* form submission, the system should use EmailJS send method instead of making fetch requests to the API route
**Validates: Requirements 1.1, 1.2**

### Property 2: Form Field Preservation
*For any* form interaction, all existing form fields (name, phone, email, subject, message) should remain functional and accessible
**Validates: Requirements 1.3**

### Property 3: Template Parameter Mapping
*For any* form submission with valid data, the EmailJS template should receive correctly mapped parameters for all form fields
**Validates: Requirements 1.4**

### Property 4: Configuration Validation
*For any* application startup, the system should validate that all required EmailJS environment variables are present before enabling form submission
**Validates: Requirements 2.1, 2.3, 2.4**

### Property 5: Error State Handling
*For any* EmailJS send failure, the form should display appropriate error messages and maintain error state
**Validates: Requirements 3.1, 3.4**

### Property 6: Success State Handling
*For any* successful EmailJS send operation, the form should display success message and reset form fields
**Validates: Requirements 3.2, 3.5**

### Property 7: Loading State Consistency
*For any* form submission, the loading state should be active during EmailJS operations and cleared when complete
**Validates: Requirements 3.3**

### Property 8: Email Content Completeness
*For any* email sent via EmailJS, the template parameters should include sender name, subject, message, and contact details
**Validates: Requirements 4.1, 4.2, 4.3, 4.5**

### Property 9: Default Subject Handling
*For any* form submission with empty subject, the system should provide a default subject value to EmailJS
**Validates: Requirements 4.4**

## Error Handling

### EmailJS Error Types
1. **Network Errors:** Connection failures, timeout issues
2. **Configuration Errors:** Missing or invalid credentials
3. **Service Errors:** EmailJS service unavailable or rate limiting
4. **Template Errors:** Invalid template parameters or template not found

### Error Handling Strategy
- **Graceful Degradation:** Show user-friendly error messages
- **Retry Logic:** Not implemented initially (can be added later)
- **Fallback:** No fallback to API route (clean migration)
- **Logging:** Console errors for debugging

### Error Message Mapping
```typescript
const getErrorMessage = (error: EmailJSError): string => {
  switch (error.status) {
    case 400: return "Please check your form data and try again.";
    case 401: return "Email service configuration error. Please contact support.";
    case 429: return "Too many requests. Please wait a moment and try again.";
    default: return "Something went wrong. Please try again.";
  }
};
```

## Testing Strategy

### Unit Testing
- Test EmailJS configuration initialization
- Test form submission with valid/invalid data
- Test error handling for different EmailJS error types
- Test form reset functionality
- Test environment variable validation

### Property-Based Testing
- Use a property-based testing library (e.g., fast-check for JavaScript)
- Generate random form data and verify EmailJS receives correct parameters
- Test error scenarios with various EmailJS failure modes
- Verify form state management across different interaction patterns
- Each property test should run minimum 100 iterations
- Tag format: **Feature: emailjs-migration, Property {number}: {property_text}**

### Integration Testing
- Test complete form submission flow with EmailJS
- Test email delivery (if possible with test EmailJS account)
- Test environment variable configuration
- Verify API route removal doesn't break other functionality

### Manual Testing
- Test actual email delivery with real EmailJS account
- Verify email formatting and content
- Test form UX across different devices and browsers
- Validate error messages are user-friendly