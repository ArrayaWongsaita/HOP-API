const prisma = require("../models/prisma");

const riderService = {};

riderService.findRiderRouteByRiderId = (riderId) =>
  prisma.route.findFirst({
    where: {
      riderId,
      NOT: {
        status: {
          in: ["FINISHED", "CANCELED"],
        },
      },
    },
  });

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

riderService.findLatestSlipByRiderId = (riderId) =>
  prisma.payment.findMany({
    where: { riderId, approvedAt: { not: null } },
    orderBy: { id: "desc" },
    take: 1,
  });

riderService.findAvailableRider = () => {
  return prisma.route.findMany({
    select: { riderId },
    where: {
      status: {
        not: "ACCEPTED",
      },
    },
  });
};

module.exports = riderService;
