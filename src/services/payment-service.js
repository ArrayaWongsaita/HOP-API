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

paymentService.confirmPayment = (paymentId, data) => {
  return prisma.payment.update({
    where: { id: paymentId },
    data: data,
  });
};

paymentService.denyPayment = (paymentId) => {
  return prisma.payment.update({
    where: { id: paymentId },
    data: { status: "DENIED" },
  });
};

module.exports = paymentService;
