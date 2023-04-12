import { TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/tickets-repository';

async function getTicketsType(): Promise<TicketType[]> {
  const result = await ticketRepository.getTicketsType();

  return result;
}

const ticketsService = {
  getTicketsType,
};

export default ticketsService;
