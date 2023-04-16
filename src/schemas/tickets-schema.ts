import Joi from 'joi';
import { TicketTypeIdNumber } from '@/protocols';

export const ticketTypeIdSchema = Joi.object<TicketTypeIdNumber>({
  ticketTypeId: Joi.number().required(),
});
