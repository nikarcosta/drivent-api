import { forbiddenError, notFoundError } from '@/errors';
import bookingsRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';

async function verifyData(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID') throw forbiddenError();
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw forbiddenError();
}

async function verifyRoom(roomId: number) {
  const room = await bookingsRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  const roomBookings = await bookingsRepository.findBookingsByRoomId(roomId);
  if (roomBookings.length === room.capacity) throw forbiddenError();
}

async function getBooking(userId: number) {
  const booking = await bookingsRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await verifyData(userId);

  await verifyRoom(roomId);

  const booking = await bookingsRepository.createBooking(userId, roomId);

  return booking;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const booking = await bookingsRepository.findBookingByUserId(userId);
  if (!booking) throw forbiddenError();

  await verifyRoom(roomId);

  const updatedBooking = await bookingsRepository.updateBooking(userId, bookingId, roomId);

  return updatedBooking;
}

const bookingsService = {
  getBooking,
  createBooking,
  updateBooking,
};

export default bookingsService;
