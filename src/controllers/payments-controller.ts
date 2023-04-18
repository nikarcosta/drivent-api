import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';
import { PaymentBody } from '@/protocols';

export async function paymentProcess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const paymentInfo = req.body as PaymentBody;

  try {
    const payment = await paymentService.paymentProcess(userId, paymentInfo);
    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    next(err);
  }
}
