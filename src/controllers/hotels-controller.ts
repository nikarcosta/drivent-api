import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { badRequestError } from '@/errors';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (err) {
    next(err);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const hotelIdStr = req.params.hotelId as string;
  if (!hotelIdStr) throw badRequestError();

  const hotelId = parseInt(hotelIdStr, 10);

  const { userId } = req;

  try {
    const hotelRooms = await hotelsService.getHotelRooms(hotelId, userId);
    return res.status(httpStatus.OK).send(hotelRooms);
  } catch (err) {
    next(err);
  }
}
