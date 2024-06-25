const prisma = require("../models/prisma");
const routeService = {};

routeService.createNewRoute = (routeInfo) => {
  return prisma.route.create({ data: routeInfo });
};

routeService.acceptRoute = (routeId, riderId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { riderId: riderId, status: ACCEPTED },
  });
};

routeService.finishRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: FINISHED },
  });
};

module.exports = routeService;
