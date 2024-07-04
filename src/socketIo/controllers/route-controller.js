const routeService = require("../../services/route-service");

const routeController = {};

routeController.newRoute = async (io, socket, data) => {
  try {
    const routeInfo = {
      customerId: data.userId,
      pickupPlace: data.locationA.description,
      pickupLat: data.locationA.lat + "",
      pickupLng: data.locationA.lng + "",
      desPlace: data.locationB.description,
      desLat: data.locationB.lat + "",
      desLng: data.locationB.lng + "",
      distance: parseFloat(data.distanceInKm),
      estTime: parseInt(data.durationInMinutes),
      rideFare: parseFloat(data.fare),
    };
    // create new channel for new ride request
    const newRoute = await routeService.createNewRoute(routeInfo);
    console.log(newRoute);
    // create route room
    socket.join(`route_${newRoute.id}`);
    // sending route info to show in customer side
    io.to(`route_${newRoute.id}`).emit("routeHistory", newRoute);
    io.emit("newRouteRequest", newRoute);
  } catch (error) {
    console.log(error);
  }
};

routeController.cancelRoute = async (io, socket, routeId) => {
  try {
    const canceledRoute = await routeService.cancelRoute(+routeId);
    io.emit("routeStatusChanged", canceledRoute);
    socket.to(`route_${routeId}`).emit("routeHistory", canceledRoute);
  } catch (error) {
    console.log(error);
  }
};

routeController.acceptRoute = async (io, socket, data) => {
  try {
    const riderId = socket.user.id;
    const { routeId, riderLat, riderLng } = data;
    socket.join(`route_${routeId}`);

    const acceptedRoute = await routeService.acceptRoute(
      routeId,
      riderId,
      riderLat + "",
      riderLng + ""
    );
    io.emit("routeStatusChanged", acceptedRoute);
    io.to(`route_${routeId}`).emit("routeHistory", acceptedRoute);
  } catch (error) {
    console.log(error);
  }
};

routeController.finishRoute = async (io, socket, routeId) => {
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

routeController.requestRouteHistory = async (socket, routeId) => {
  try {
    socket.join(`route_${routeId}`);
    const routeDetail = await routeService.findRouteByRouteId(+routeId);
    socket.emit("routeHistory", routeDetail);
  } catch (error) {
    console.log(error);
  }
};

routeController.updateRouteStatus = async (io, data) => {
  try {
    const { routeId, status } = data;
    console.log(+routeId, status);
    const routeUpdated = await routeService.updateStatusByRouteIdAndStatus(
      +routeId,
      status
    );
    io.to(`route_${routeId}`).emit("routeHistory", routeUpdated);
  } catch (error) {
    console.log(error);
  }
};

module.exports = routeController;
