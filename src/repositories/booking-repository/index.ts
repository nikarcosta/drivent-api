import { prisma } from '@/config';

async function getBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function findRoomById(roomId: number) {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function findBookingsByRoomId(roomId: number) {
  return await prisma.booking.findMany({
    where: {
      roomId,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function findBookingByUserId(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
  });
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  return await prisma.booking.upsert({
    where: {
      id: bookingId,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const bookingsRepository = {
  getBooking,
  findRoomById,
  findBookingsByRoomId,
  createBooking,
  findBookingByUserId,
  updateBooking,
};

export default bookingsRepository;
