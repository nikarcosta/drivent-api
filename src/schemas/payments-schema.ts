import Joi from 'joi';
import { PaymentBody } from '@/protocols';

export const PaymentSchema = Joi.object<PaymentBody>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  }).required(),
});
