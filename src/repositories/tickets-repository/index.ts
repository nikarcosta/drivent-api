import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  getTicketsType,
  createTicket,
  findTicketByEnrollmentId,
};

export default ticketRepository;
