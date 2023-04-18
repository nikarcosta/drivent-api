import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { PaymentSchema } from '@/schemas';
import { paymentProcess } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).post('/process', validateBody(PaymentSchema), paymentProcess);
export { paymentsRouter };
