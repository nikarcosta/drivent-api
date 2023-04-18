import { Ticket, TicketType, TicketStatus } from '@prisma/client';
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

async function getTickets(enrollmentId: number): Promise<
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

async function getTicketAndEnrollment(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function getUserTicket(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function updateTicketStatus(id: number) {
  await prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  getTicketsType,
  createTicket,
  findTicketByEnrollmentId,
  getTickets,
  getTicketAndEnrollment,
  getUserTicket,
  updateTicketStatus,
};

export default ticketRepository;
