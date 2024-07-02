const prisma = require("../models/prisma");
const routeService = {};

routeService.createNewRoute = (routeInfo) => {
  return prisma.route.create({ data: routeInfo });
};

routeService.acceptRoute = (routeId, riderId, pickupTime) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { riderId: riderId, status: ACCEPTED, pickupTime: pickupTime },
  });
};

routeService.finishRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: FINISHED },
  });
};

routeService.getAllRoute = () => {
  return prisma.route.findMany({ where: { status: PENDING } });
};

routeService.cancelRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: CANCELED },
  });
};

module.exports = routeService;
