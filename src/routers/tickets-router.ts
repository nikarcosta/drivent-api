import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsType, createTicket, getTickets } from '@/controllers';
import { ticketTypeIdSchema } from '@/schemas/tickets-schema';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsType)
  .post('/', validateBody(ticketTypeIdSchema), createTicket)
  .get('/', getTickets);

export { ticketsRouter };
