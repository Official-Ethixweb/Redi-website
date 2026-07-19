import { z } from 'zod';

/** Shared client/server schema for the contact form. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(120, 'Name must be 120 characters or fewer'),
  email: z.email('Please enter a valid email address').trim(),
  phone: z
    .string()
    .trim()
    .max(30, 'Phone must be 30 characters or fewer')
    .regex(/^[\d\s()+.-]*$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a bit more (at least 10 characters)')
    .max(4000, 'Message must be 4000 characters or fewer'),
  turnstileToken: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
