import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';
import { PaymentBody } from '@/protocols';
import { badRequestError } from '@/errors';

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

export async function getPaymentById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketIdStr = req.query.ticketId as string;
  if (!ticketIdStr) throw badRequestError();

  const ticketId = parseInt(ticketIdStr, 10);

  const { userId } = req;

  try {
    const paymentData = await paymentService.getPayment(ticketId, userId);
    return res.status(httpStatus.OK).send(paymentData);
  } catch (err) {
    next(err);
  }
}
