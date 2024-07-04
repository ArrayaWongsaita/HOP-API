const prisma = require("../models/prisma");

const paymentService = {};

paymentService.createPayment = (paymentInfo) => {
  return prisma.payment.create({
    data: paymentInfo,
  });
};

paymentService.getAllPayment = () => {
  return prisma.payment.findMany();
};

paymentService.confirmPayment = (paymentId) => {
  return prisma.payment.update({
    where: { id: paymentId },
    data: { approvedAt: new Date() },
  });
};

module.exports = paymentService;
