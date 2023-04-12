import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  getTicketsType,
};

export default ticketRepository;
