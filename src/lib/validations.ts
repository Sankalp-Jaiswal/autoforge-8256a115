import { z } from 'zod';

export const bookingSchema = z.object({
  patientName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  reason: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;