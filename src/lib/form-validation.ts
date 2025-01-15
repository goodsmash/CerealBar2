import { z } from "zod";

// Common validation schemas
export const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email must be less than 254 characters"),
  phone: z.string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
    .transform((val) => val.replace(/\D/g, '')),
  companyName: z.string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
});

export const dateTimeSchema = z.object({
  date: z.date()
    .min(new Date(), "Date must be in the future")
    .max(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), "Date must be within one year"),
  startTime: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  endTime: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
}).refine(data => {
  const start = new Date(`1970-01-01T${data.startTime}`);
  const end = new Date(`1970-01-01T${data.endTime}`);
  return end > start;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
});

export const venueSchema = z.object({
  address: z.string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  city: z.string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "City can only contain letters, spaces, hyphens and apostrophes"),
  state: z.string()
    .length(2, "State must be 2 characters")
    .regex(/^[A-Z]+$/, "State must be uppercase letters only"),
  zipCode: z.string()
    .regex(/^\d{5}$/, "ZIP code must be 5 digits"),
});

// Catering specific schema
export const cateringSchema = z.object({
  contact: contactSchema,
  event: dateTimeSchema,
  venue: venueSchema,
  packageId: z.string()
    .min(1, "Please select a package"),
  guestCount: z.number()
    .int("Guest count must be a whole number")
    .min(10, "Minimum 10 guests required")
    .max(500, "Maximum 500 guests"),
  dietaryRestrictions: z.string()
    .max(500, "Dietary restrictions must be less than 500 characters")
    .optional(),
  specialRequests: z.string()
    .max(1000, "Special requests must be less than 1000 characters")
    .optional(),
  setupNeeded: z.boolean(),
  servingStyle: z.enum(["buffet", "stationed", "passed"]),
});

// Events specific schema
export const eventSchema = z.object({
  contact: contactSchema,
  event: dateTimeSchema,
  venue: venueSchema,
  eventType: z.enum([
    "corporate", 
    "wedding", 
    "birthday", 
    "graduation",
    "holiday",
    "fundraiser",
    "private",
    "festival"
  ]),
  guestCount: z.number()
    .int("Guest count must be a whole number")
    .min(10, "Minimum 10 guests required")
    .max(1000, "Maximum 1000 guests"),
  theme: z.string()
    .max(200, "Theme must be less than 200 characters")
    .optional(),
  additionalServices: z.array(z.string()),
  budget: z.number()
    .min(500, "Minimum budget of $500 required")
    .max(50000, "Maximum budget of $50,000"),
  notes: z.string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional(),
});

// Types
export type CateringFormData = z.infer<typeof cateringSchema>;
export type EventFormData = z.infer<typeof eventSchema>;

// Helper functions
export function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
}

export function parsePhoneNumber(value: string): string {
  return value.replace(/\D/g, '');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function calculateTotal(basePrice: number, guestCount: number, additionalServices: string[]): number {
  let total = basePrice;

  // Per person cost
  total += guestCount * 25; // $25 per person

  // Additional services
  additionalServices.forEach(service => {
    switch (service) {
      case 'setup':
        total += 250;
        break;
      case 'cleanup':
        total += 250;
        break;
      case 'staffing':
        total += 500;
        break;
      case 'rentals':
        total += 750;
        break;
      case 'decor':
        total += 500;
        break;
    }
  });

  return total;
}
