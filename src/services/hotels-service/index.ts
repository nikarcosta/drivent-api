import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotel-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.getUserEnrollmentById(userId);

  if (!enrollment) throw notFoundError;

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID') throw paymentRequiredError();

  if (ticket.TicketType.includesHotel === false) throw paymentRequiredError();

  if (ticket.TicketType.isRemote === true) throw paymentRequiredError();

  const hotels = await hotelsRepository.getHotels();

  return hotels;
}

async function getHotelRooms(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.getUserEnrollmentById(userId);

  if (!enrollment) throw notFoundError;

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID') throw paymentRequiredError();

  if (ticket.TicketType.includesHotel === false) throw paymentRequiredError();

  if (ticket.TicketType.isRemote === true) throw paymentRequiredError();

  const hotelRooms = hotelsRepository.getHotelRooms(hotelId);

  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

const hotelsService = {
  getHotels,
  getHotelRooms,
};

export default hotelsService;
