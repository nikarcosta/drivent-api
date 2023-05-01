import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getBooking, createBooking, updateBooking } from '@/controllers';
import { roomIdSchema } from '@/schemas/bookings-schema';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(roomIdSchema), createBooking)
  .put('/:bookingId', validateBody(roomIdSchema), updateBooking);

export { bookingsRouter };
