import { Router } from 'express';
import { getAvailability } from '../controllers/availabilityController';
import { createBooking } from '../controllers/bookingController';
import { submitContact } from '../controllers/contactController';

const router = Router();

router.get('/availability', getAvailability);
router.post('/bookings', createBooking);
router.post('/contact', submitContact);

export default router;