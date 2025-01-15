import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';
import { format, parseISO, isValid } from 'date-fns';
import { rateLimit } from '@/lib/rate-limit';

// Environment variable validation schema
const envSchema = z.object({
  VITE_BREVO_API_KEY: z.string().min(1, 'API key is required'),
  VITE_CONTACT_EMAIL: z.string().email('Contact email must be a valid email'),
});

// Validate environment variables at startup
function validateEnvVars(): { isValid: boolean; error?: string } {
  try {
    const env = {
      VITE_BREVO_API_KEY: import.meta.env.VITE_BREVO_API_KEY,
      VITE_CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL,
    };
    
    const result = envSchema.safeParse(env);
    if (!result.success) {
      const errors = result.error.format();
      console.error('Environment validation failed:', errors);
      return {
        isValid: false,
        error: 'Invalid environment configuration. Check server logs for details.',
      };
    }
    return { isValid: true };
  } catch (error) {
    console.error('Failed to validate environment:', error);
    return {
      isValid: false,
      error: 'Failed to validate environment configuration',
    };
  }
}

// Validate environment variables immediately
const ENV_VALIDATION = validateEnvVars();
if (!ENV_VALIDATION.isValid) {
  console.error('Email service initialization failed:', ENV_VALIDATION.error);
}

// Constants
const EMAIL_API_URL = 'https://api.brevo.com/v3/smtp/email';
const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

// Rate limiting constants
const MAX_REQUESTS_PER_MINUTE = 10;
const MAX_REQUESTS_PER_HOUR = 100;
const MAX_REQUESTS_PER_IP = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

// Rate limiters
const minuteRateLimiter = rateLimit({
  interval: RATE_LIMIT_WINDOW,
  maxRequests: MAX_REQUESTS_PER_MINUTE,
});

const hourRateLimiter = rateLimit({
  interval: RATE_LIMIT_WINDOW * 60,
  maxRequests: MAX_REQUESTS_PER_HOUR,
});

// IP-based rate limiting
const ipRateLimiters = new Map<string, ReturnType<typeof rateLimit>>();

function getIpRateLimiter(ip: string): ReturnType<typeof rateLimit> {
  if (!ipRateLimiters.has(ip)) {
    ipRateLimiters.set(ip, rateLimit({
      interval: RATE_LIMIT_WINDOW,
      maxRequests: MAX_REQUESTS_PER_IP,
    }));
  }
  return ipRateLimiters.get(ip)!;
}

// Rate limit check with detailed error response
interface RateLimitCheck {
  allowed: boolean;
  error?: string;
  resetTime?: Date;
}

function checkRateLimits(ip: string): RateLimitCheck {
  const now = new Date();
  const resetTime = new Date(now.getTime() + RATE_LIMIT_WINDOW);

  if (!minuteRateLimiter.tryRequest()) {
    return {
      allowed: false,
      error: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_MINUTE} requests per minute allowed.`,
      resetTime,
    };
  }

  if (!hourRateLimiter.tryRequest()) {
    return {
      allowed: false,
      error: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_HOUR} requests per hour allowed.`,
      resetTime: new Date(now.getTime() + RATE_LIMIT_WINDOW * 60),
    };
  }

  const ipLimiter = getIpRateLimiter(ip);
  if (!ipLimiter.tryRequest()) {
    return {
      allowed: false,
      error: `Too many requests from your IP. Maximum ${MAX_REQUESTS_PER_IP} requests per minute allowed.`,
      resetTime,
    };
  }

  return { allowed: true };
}

// Validation constants
const MAX_MESSAGE_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 1000;
const MAX_BUDGET = 1000000;
const MIN_EVENT_NOTICE_HOURS = 24;

// Error response interface
export interface EmailResponse {
  success: boolean;
  error?: string;
  details?: {
    code?: string;
    message?: string;
    validationErrors?: Record<string, unknown>;
    apiError?: unknown;
    resetTime?: Date;
  };
}

// Time validation helper
function validateEventTime(date: string, startTime: string, endTime: string): { isValid: boolean; error?: string } {
  try {
    const eventDate = parseISO(date);
    if (!isValid(eventDate)) {
      return { isValid: false, error: 'Invalid date format' };
    }

    const now = new Date();
    const minEventTime = new Date(now.getTime() + MIN_EVENT_NOTICE_HOURS * 60 * 60 * 1000);

    if (eventDate < minEventTime) {
      return { 
        isValid: false, 
        error: `Event must be scheduled at least ${MIN_EVENT_NOTICE_HOURS} hours in advance` 
      };
    }

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
      return { isValid: false, error: 'Invalid time format' };
    }

    const startDateTime = new Date(eventDate);
    startDateTime.setHours(startHour, startMinute);

    const endDateTime = new Date(eventDate);
    endDateTime.setHours(endHour, endMinute);

    if (endDateTime <= startDateTime) {
      return { isValid: false, error: 'End time must be after start time' };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Time validation error:', error);
    return { isValid: false, error: 'Invalid date or time format' };
  }
}

// Email validation schemas with improved validation
export const emailSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(MAX_NAME_LENGTH, `Name must be less than ${MAX_NAME_LENGTH} characters`)
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters')
    .transform(name => name.trim()),
  email: z.string()
    .email('Invalid email format')
    .max(MAX_EMAIL_LENGTH, `Email must be less than ${MAX_EMAIL_LENGTH} characters`)
    .toLowerCase()
    .transform(email => email.trim()),
  message: z.string()
    .min(1, 'Message is required')
    .max(MAX_MESSAGE_LENGTH, `Message must be less than ${MAX_MESSAGE_LENGTH} characters`)
    .transform(msg => msg.trim()),
  subject: z.string()
    .max(200, 'Subject is too long')
    .optional()
    .transform(subject => subject?.trim()),
});

export const eventBookingSchema = z.object({
  contact: z.object({
    name: z.string()
      .min(1, 'Name is required')
      .max(MAX_NAME_LENGTH, `Name must be less than ${MAX_NAME_LENGTH} characters`)
      .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters')
      .transform(name => name.trim()),
    email: z.string()
      .email('Invalid email format')
      .max(MAX_EMAIL_LENGTH, `Email must be less than ${MAX_EMAIL_LENGTH} characters`)
      .toLowerCase()
      .transform(email => email.trim()),
    phone: z.string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number format. Use (XXX) XXX-XXXX'),
    companyName: z.string()
      .max(100, 'Company name is too long')
      .optional()
      .transform(name => name?.trim()),
  }),
  event: z.object({
    date: z.string()
      .min(1, 'Date is required')
      .refine(date => {
        const eventDate = parseISO(date);
        return isValid(eventDate);
      }, 'Invalid date format')
      .refine(date => {
        const eventDate = parseISO(date);
        const now = new Date();
        const minEventTime = new Date(now.getTime() + MIN_EVENT_NOTICE_HOURS * 60 * 60 * 1000);
        return eventDate >= minEventTime;
      }, `Event must be scheduled at least ${MIN_EVENT_NOTICE_HOURS} hours in advance`),
    startTime: z.string()
      .min(1, 'Start time is required')
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'),
    endTime: z.string()
      .min(1, 'End time is required')
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'),
    type: z.string()
      .min(1, 'Event type is required')
      .max(50, 'Event type is too long')
      .transform(type => type.trim()),
    guestCount: z.number()
      .int('Guest count must be a whole number')
      .min(MIN_GUEST_COUNT, `Guest count must be at least ${MIN_GUEST_COUNT}`)
      .max(MAX_GUEST_COUNT, `Guest count cannot exceed ${MAX_GUEST_COUNT}`),
    theme: z.string()
      .max(200, 'Theme description is too long')
      .optional()
      .transform(theme => theme?.trim()),
    budget: z.number()
      .min(0, 'Budget cannot be negative')
      .max(MAX_BUDGET, 'Budget exceeds maximum limit'),
    notes: z.string()
      .max(1000, 'Notes are too long')
      .optional()
      .transform(notes => notes?.trim()),
  }).refine(
    (data) => {
      const timeCheck = validateEventTime(data.date, data.startTime, data.endTime);
      return timeCheck.isValid;
    },
    {
      message: 'Invalid event time',
      path: ['time'],
    }
  ),
  venue: z.object({
    address: z.string()
      .min(1, 'Address is required')
      .max(200, 'Address is too long')
      .transform(addr => addr.trim()),
    city: z.string()
      .min(1, 'City is required')
      .max(100, 'City name is too long')
      .regex(/^[a-zA-Z\s'-]+$/, 'City contains invalid characters')
      .transform(city => city.trim()),
    state: z.string()
      .length(2, 'State must be a 2-letter code')
      .regex(/^[A-Z]+$/, 'State must be uppercase letters')
      .transform(state => state.toUpperCase()),
    zipCode: z.string()
      .regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  }),
});

export type EmailData = z.infer<typeof emailSchema>;
export type EventBookingData = z.infer<typeof eventBookingSchema>;

// Utility function to handle API errors
async function handleApiError(response: Response): Promise<EmailResponse> {
  const errorData = await response.json().catch(() => null);
  console.error('Email API error:', {
    status: response.status,
    statusText: response.statusText,
    error: errorData,
  });
  return {
    success: false,
    error: errorData?.message || `Failed to send email: ${response.statusText}`,
    details: {
      apiError: errorData,
    },
  };
}

// Utility function to sanitize content
function sanitizeContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'br', 'div'],
    allowedAttributes: {
      'div': ['style'],
      'p': ['style'],
      'h1': ['style'],
      'h2': ['style'],
      'h3': ['style'],
    },
  });
}

export async function sendContactEmail(data: EmailData, ip: string): Promise<EmailResponse> {
  try {
    // Rate limit check
    const rateLimitCheck = checkRateLimits(ip);
    if (!rateLimitCheck.allowed) {
      return { 
        success: false, 
        error: rateLimitCheck.error, 
        details: { resetTime: rateLimitCheck.resetTime } 
      };
    }

    // Environment validation
    if (!ENV_VALIDATION.isValid) {
      return { success: false, error: ENV_VALIDATION.error };
    }

    // Data validation
    const validationResult = emailSchema.safeParse(data);
    if (!validationResult.success) {
      return { 
        success: false, 
        error: 'Validation failed',
        details: { validationErrors: validationResult.error.format() },
      };
    }

    const validatedData = validationResult.data;
    const sanitizedMessage = sanitizeContent(validatedData.message);
    const sanitizedName = sanitizeContent(validatedData.name);

    const response = await fetch(EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: sanitizedName,
          email: validatedData.email,
        },
        to: [{
          email: CONTACT_EMAIL,
          name: 'Sweet & Comfy Boston Events',
        }],
        subject: validatedData.subject || 'New Contact Form Submission',
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage}</p>
        `,
      }),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email',
      details: { error },
    };
  }
}

export async function sendEventBookingEmail(data: EventBookingData, ip: string): Promise<EmailResponse> {
  try {
    // Rate limit check
    const rateLimitCheck = checkRateLimits(ip);
    if (!rateLimitCheck.allowed) {
      return { 
        success: false, 
        error: rateLimitCheck.error, 
        details: { resetTime: rateLimitCheck.resetTime } 
      };
    }

    // Environment validation
    if (!ENV_VALIDATION.isValid) {
      return { success: false, error: ENV_VALIDATION.error };
    }

    // Data validation
    const validationResult = eventBookingSchema.safeParse(data);
    if (!validationResult.success) {
      return { 
        success: false, 
        error: 'Validation failed',
        details: { validationErrors: validationResult.error.format() },
      };
    }

    const validatedData = validationResult.data;

    // Sanitize all content
    const sanitizedContent = {
      contact: {
        name: sanitizeContent(validatedData.contact.name),
        email: validatedData.contact.email.toLowerCase(),
        phone: validatedData.contact.phone,
        companyName: validatedData.contact.companyName ? 
          sanitizeContent(validatedData.contact.companyName) : undefined,
      },
      event: {
        ...validatedData.event,
        type: sanitizeContent(validatedData.event.type),
        theme: validatedData.event.theme ? 
          sanitizeContent(validatedData.event.theme) : undefined,
        notes: validatedData.event.notes ? 
          sanitizeContent(validatedData.event.notes) : undefined,
      },
      venue: {
        address: sanitizeContent(validatedData.venue.address),
        city: sanitizeContent(validatedData.venue.city),
        state: validatedData.venue.state.toUpperCase(),
        zipCode: validatedData.venue.zipCode,
      },
    };

    const response = await fetch(EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Sweet & Comfy Boston Events",
          email: CONTACT_EMAIL,
        },
        replyTo: {
          email: sanitizedContent.contact.email,
          name: sanitizedContent.contact.name,
        },
        to: [{
          email: CONTACT_EMAIL,
          name: 'Sweet & Comfy Boston Events',
        }],
        subject: `New Event Booking Request - ${sanitizedContent.event.type}`,
        htmlContent: `
          <h2>New Event Booking Request</h2>
          
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${sanitizedContent.contact.name}</p>
          <p><strong>Email:</strong> ${sanitizedContent.contact.email}</p>
          <p><strong>Phone:</strong> ${sanitizedContent.contact.phone}</p>
          ${sanitizedContent.contact.companyName ? 
            `<p><strong>Company:</strong> ${sanitizedContent.contact.companyName}</p>` : ''}
          
          <h3>Event Details</h3>
          <p><strong>Event Type:</strong> ${sanitizedContent.event.type}</p>
          <p><strong>Date:</strong> ${format(new Date(validatedData.event.date), 'MMMM d, yyyy')}</p>
          <p><strong>Time:</strong> ${validatedData.event.startTime} - ${validatedData.event.endTime}</p>
          <p><strong>Guest Count:</strong> ${validatedData.event.guestCount}</p>
          ${sanitizedContent.event.theme ? 
            `<p><strong>Theme/Colors:</strong> ${sanitizedContent.event.theme}</p>` : ''}
          ${validatedData.event.budget > 0 ? 
            `<p><strong>Budget:</strong> $${validatedData.event.budget.toLocaleString()}</p>` : ''}
          
          <h3>Venue Information</h3>
          <p><strong>Address:</strong> ${sanitizedContent.venue.address}</p>
          <p><strong>City:</strong> ${sanitizedContent.venue.city}</p>
          <p><strong>State:</strong> ${sanitizedContent.venue.state}</p>
          <p><strong>ZIP:</strong> ${sanitizedContent.venue.zipCode}</p>
          
          ${sanitizedContent.event.notes ? `
            <h3>Additional Notes</h3>
            <p>${sanitizedContent.event.notes}</p>
          ` : ''}
        `,
      }),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    // Send confirmation email to the customer
    await sendConfirmationEmail({
      name: sanitizedContent.contact.name,
      email: sanitizedContent.contact.email,
      subject: "Event Booking Request Received",
      message: `
        Thank you for your event booking request! We've received your details and will get back to you shortly to discuss your ${sanitizedContent.event.type.toLowerCase()} event.
        
        Event Details:
        - Date: ${format(new Date(validatedData.event.date), 'MMMM d, yyyy')}
        - Time: ${validatedData.event.startTime} - ${validatedData.event.endTime}
        - Location: ${sanitizedContent.venue.city}, ${sanitizedContent.venue.state}
        
        If you have any immediate questions, please don't hesitate to reach out to us.
        
        Best regards,
        Sweet & Comfy Boston Events Team
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send event booking email:', error);
    return {
      success: false,
      error: 'Failed to send event booking email',
      details: { apiError: error },
    };
  }
}

export async function sendConfirmationEmail(data: EmailData): Promise<EmailResponse> {
  try {
    // Rate limit check
    const rateLimitCheck = checkRateLimits('127.0.0.1'); // Use a default IP for confirmation emails
    if (!rateLimitCheck.allowed) {
      return { 
        success: false, 
        error: rateLimitCheck.error, 
        details: { resetTime: rateLimitCheck.resetTime } 
      };
    }

    // Environment validation
    if (!ENV_VALIDATION.isValid) {
      return { success: false, error: ENV_VALIDATION.error };
    }

    // Data validation
    const validationResult = emailSchema.safeParse(data);
    if (!validationResult.success) {
      return { 
        success: false, 
        error: 'Validation failed',
        details: { validationErrors: validationResult.error.format() },
      };
    }

    const validatedData = validationResult.data;
    const sanitizedName = sanitizeContent(validatedData.name);
    const sanitizedMessage = sanitizeContent(validatedData.message);
    
    const response = await fetch(EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'Sweet & Comfy Boston Events',
          email: CONTACT_EMAIL,
        },
        to: [{
          email: validatedData.email,
          name: sanitizedName,
        }],
        subject: validatedData.subject || 'Thank You for Contacting Sweet & Comfy Boston Events',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            ${sanitizedMessage}
          </div>
        `,
      }),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send confirmation email',
      details: { error },
    };
  }
}
