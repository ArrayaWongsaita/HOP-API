const prisma = require("../models/prisma");

const riderService = {};

riderService.createRider = (riderData) => {
  return prisma.rider.create({ data: riderData });
};

riderService.findRiderByEmailAndPhone = (email, phone) => {
  return prisma.rider.findFirst({
    where: {
      OR: [{ email: email }, { phone: phone }],
    },
  });
};

riderService.findRiderByEmailOrPhone = (emailOrPhone) => {
  return prisma.rider.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    },
  });
};

riderService.findRiderById = (id) => {
  return prisma.rider.findFirst({ where: { id } });
};

module.exports = riderService;
