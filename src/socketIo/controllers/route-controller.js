const routeService = require("../../services/route-service");

const routeController = {};

routeController.newRoute = async (io, socket, data) => {
  // const customerId = parseInt(req.params.customerId);
  // const data = req.body;

  try {
    // data = {userId, locationA: {description, lat, lng}, locationB: {description, lat, lng}, distanceInKm: 1.8, durationInMinutes: 7, fare: 30}

    const customerId = data.customerId;
    const pickupPlace = data.locationA.description;
    const pickupLat = toString(data.locationA.lat);
    const pickupLng = toString(data.locationA.lng);
    const desPlace = data.locationB.description;
    const desLat = toString(data.locationB.lat);
    const desLng = toString(data.locationB.lng);
    const distance = parseFloat(data.distanceInKm);
    const estTime = parseInt(data.durationInMinutes);
    const rideFare = parseFloat(data.fare);

    const routeInfo = {
      customerId,
      pickupPlace,
      pickupLat,
      pickupLng,
      desPlace,
      desLat,
      desLng,
      distance,
      estTime,
      rideFare,
    };
    // create new channel for new ride request
    const newRoute = await routeService.createNewRoute(routeInfo);
    // create route room
    socket.join(`route_${newRoute.id}`);
    // sending route info to show in customer side
    io.to(`route_${newRoute.id}`).emit("routeHistory", newRoute);
    return newRoute;
    // socket.emit("routeHistory", newRoute);
  } catch (error) {
    console.log(error);
  }
};

routeController.cancelRoute = async (socket, routeId) => {
  // const routeId = parseInt(req.params.routeId);
  try {
    const canceledRoute = await routeService.cancelRoute(routeId);
    socket.to(`route_${routeId}`).emit("routeHistory", canceledRoute);
  } catch (error) {
    console.log(error);
  }
};

routeController.acceptRoute = async (io, socket, routeId, data) => {
  // const riderId = parseInt(req.params.riderId);
  // const data = req.body;
  // const routeId = parseInt(data.routeId);

  try {
    const riderId = data.riderId;
    const pickupTime = data.pickupTime;
    const acceptedRoute = await routeService.acceptRoute(
      routeId,
      riderId,
      pickupTime
    );
    io.to(`route_${routeId}`).emit("routeHistory", acceptedRoute);
  } catch (error) {
    console.log(error);
  }
};

routeController.finishRoute = async (io, socket, routeId) => {
  // const routeId = parseInt(req.params.routeId);
  // const data = req.body;
  try {
    const finishedRoute = await routeService.finishRoute(routeId);
    io.to(`route_${routeId}`).emit("routeHistory", finishedRoute);
  } catch (error) {
    next(error);
  }
};

routeController.getAllRoute = async (socket) => {
  try {
    const allRoutes = await routeService.getAllRoute();
    socket.emit("routeList", allRoutes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = routeController;
