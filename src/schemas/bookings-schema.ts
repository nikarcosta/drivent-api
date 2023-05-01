import Joi from 'joi';
import { RoomIdNumber } from '@/protocols';

export const roomIdSchema = Joi.object<RoomIdNumber>({
  roomId: Joi.number().required(),
});
