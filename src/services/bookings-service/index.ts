import { notFoundError } from '@/errors';
import bookingsRepository from '@/repositories/booking-repository';

async function getBooking(userId: number) {
  const booking = await bookingsRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

const bookingsService = {
  getBooking,
};

export default bookingsService;
