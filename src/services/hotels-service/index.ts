import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotel-repository';

async function verifyData(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID') throw paymentRequiredError();
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw paymentRequiredError();
}

async function getHotels(userId: number) {
  await verifyData(userId);

  const hotels = await hotelsRepository.getHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelRooms(hotelId: number, userId: number) {
  await verifyData(userId);

  const hotelRooms = await hotelsRepository.getHotelRooms(hotelId);
  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

const hotelsService = {
  getHotels,
  getHotelRooms,
};

export default hotelsService;
