import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketsType(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function createTicket(ticket: CreateTicketParams): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function findTicketByEnrollmentId(enrollmentId: number): Promise<
  Ticket & {
    TicketType: TicketType;
  }
> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTickets(enrollmentId: number) {
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
  getTickets,
};

export default ticketRepository;
