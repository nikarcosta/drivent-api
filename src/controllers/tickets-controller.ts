import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsType = await ticketsService.getTicketsType();

    return res.status(httpStatus.OK).send(ticketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    const ticket = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (err) {
    next(err);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const tickets = await ticketsService.getTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    next(err);
  }
}
