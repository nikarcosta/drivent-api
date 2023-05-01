import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getBooking, createBooking } from '@/controllers';
import { roomIdSchema } from '@/schemas/bookings-schema';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken).get('/', getBooking).post('/', validateBody(roomIdSchema), createBooking);

export { bookingsRouter };
