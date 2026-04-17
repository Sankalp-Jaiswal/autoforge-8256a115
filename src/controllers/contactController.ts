import { Request, Response } from 'express';
import prisma from '../db';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const submitContact = async (req: Request, res: Response) => {
  try {
    const data = contactSchema.parse(req.body);

    await prisma.contact.create({
      data,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ success: false, message: 'Failed to submit contact form.' });
  }
};