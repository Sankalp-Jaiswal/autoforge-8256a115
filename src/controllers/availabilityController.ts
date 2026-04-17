import { Request, Response } from 'express';
import prisma from '../db';
import { z } from 'zod';

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
});

const ALL_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
];

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const { date } = querySchema.parse(req.query);

    const bookings = await prisma.booking.findMany({
      where: { date },
      select: { time: true },
    });

    const bookedTimes = bookings.map((b) => b.time);
    const availableSlots = ALL_SLOTS.filter((slot) => !bookedTimes.includes(slot));

    res.json({
      date,
      available_slots: availableSlots,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ success: false, message: 'Server error fetching availability' });
  }
};