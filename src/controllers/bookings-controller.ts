import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/bookings-service';
import { badRequestError } from '@/errors';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingsService.getBooking(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (err) {
    next(err);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const booking = await bookingsService.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { bookingId } = req.params;

  const { userId } = req;

  const { roomId } = req.body;

  try {
    const updatedBooking = await bookingsService.updateBooking(userId, Number(bookingId), roomId);
    return res.status(httpStatus.OK).send({
      bookingId: updatedBooking.id,
    });
  } catch (err) {
    next(err);
  }
}
