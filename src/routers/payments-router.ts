import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentSchema } from '@/schemas';
import { paymentProcess, getPaymentById } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .post('/process', validateBody(paymentSchema), paymentProcess)
  .get('/', getPaymentById);

export { paymentsRouter };
