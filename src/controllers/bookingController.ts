import { Request, Response } from 'express';
import prisma from '../db';
import { z } from 'zod';

const bookingSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  reason: z.string().optional(),
});

export const createBooking = async (req: Request, res: Response) => {
  try {
    const data = bookingSchema.parse(req.body);

    // Check if slot is already taken
    const existing = await prisma.booking.findUnique({
      where: {
        date_time: {
          date: data.date,
          time: data.time,
        }
      }
    });

    if (existing) {
      return res.status(409).json({ success: false, message: 'Time slot is already booked.' });
    }

    const booking = await prisma.booking.create({
      data,
    });

    // In a real app, trigger notification service here

    res.status(201).json({
      success: true,
      bookingId: booking.id,
      message: 'Appointment confirmed.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ success: false, message: 'Failed to create booking.' });
  }
};