const prisma = require("../models/prisma");
const routeService = {};

routeService.createNewRoute = (routeInfo) => {
  return prisma.route.create({ data: routeInfo });
};

// rider accept the ride request
routeService.acceptRoute = (routeId, riderId, pickupTime) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { riderId: riderId, status: "ACCEPTED", pickupTime: pickupTime },
  });
};

// rider is going to the pickup point
routeService.goingRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "GOING" },
  });
};

// rider is already picked up the customer
routeService.pickedup = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "PICKEDUP" },
  });
};

// rider is sending the customer
routeService.onTheWay = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "OTW" },
  });
};

// rider is arrived the destination point
routeService.arrived = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "ARRIVED" },
  });
};

// the ride request is finished
routeService.finishRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "FINISHED" },
  });
};

routeService.getAllRoute = () => {
  return prisma.route.findMany({ where: { status: "PENDING" } ,orderBy: { id: "desc" }});
};

routeService.cancelRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "CANCELED" },
  });
};

module.exports = routeService;
