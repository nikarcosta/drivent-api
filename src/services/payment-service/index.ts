import { notFoundError, unauthorizedError } from '@/errors';
import ticketRepository from '@/repositories/tickets-repository';
import paymentRepository from '@/repositories/payment-repository';
import { PaymentBody, PaymentData } from '@/protocols';

async function paymentProcess(userId: number, paymentInfo: PaymentBody) {
  const ticket = await ticketRepository.getTicketAndEnrollment(paymentInfo.ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const price = await ticketRepository.getUserTicket(ticket.enrollmentId);

  const paymentData: PaymentData = {
    ticketId: paymentInfo.ticketId,
    value: price.TicketType.price,
    cardIssuer: paymentInfo.cardData.issuer,
    cardLastDigits: paymentInfo.cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(paymentData);

  await ticketRepository.updateTicketStatus(ticket.id);

  return payment;
}

async function getPayment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.getTicketAndEnrollment(ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const paymentData = await paymentRepository.getPayment(ticketId);

  if (!paymentData) throw notFoundError();

  return paymentData;
}

const paymentService = {
  paymentProcess,
  getPayment,
};

export default paymentService;
