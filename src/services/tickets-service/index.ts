import { TicketStatus, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';

async function getTicketsType(): Promise<TicketType[]> {
  const result = await ticketRepository.getTicketsType();

  if (!result) throw notFoundError();

  return result;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

async function getTickets(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const tickets = await ticketRepository.getTickets(enrollment.id);

  if (!tickets) throw notFoundError();

  return tickets;
}

const ticketsService = {
  getTicketsType,
  createTicket,
  getTickets,
};

export default ticketsService;
