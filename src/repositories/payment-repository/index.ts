import { prisma } from '@/config';
import { PaymentData } from '@/protocols';

async function createPayment(paymentData: PaymentData) {
  return await prisma.payment.create({
    data: paymentData,
  });
}

async function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentRepository = {
  createPayment,
  getPayment,
};

export default paymentRepository;
