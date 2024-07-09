const routeController = require("../controllers/route-controller");

// HTTP
// const express = require("express");
// const routeRouter = express.Router();
// routeRouter.post("/:customerId", routeController.newRoute);
// routeRouter.get("/all", routeController.getAllRoute);
// routeRouter.patch("/rider/accept/:riderId", routeController.acceptRoute);
// routeRouter.patch("/rider/finish:riderId", routeController.finishRoute);
// routeRouter.patch("customer/:routeId", routeController.cancelRoute);

module.exports = routeRouter = (socket, io) => {
  // create new route by customer
  socket.on("newRoute", (routeInfo) => {
    routeController.newRoute(io, socket, routeInfo);
  });

  // cancel ride request by customer
  socket.on("cancelRoute", ({ routeId }) => {
    routeController.cancelRoute(io, socket, routeId);
  });

  // confirm ride by rider
  socket.on("acceptRoute", (data) => {
    routeController.acceptRoute(io, socket, data);
  });

  // finish confirmation by rider
  socket.on("finishRoute", (data) => {
    routeController.finishRoute(io, socket, data);
  });

  socket.on("updateRouteStatus", (data) => {
    console.log("data = ", data);
    routeController.updateRouteStatus(io, data);
  });

  // get all ride request
  socket.on("allRoutes", () => {
    routeController.getAllRoute(socket);
  });

  socket.on("requestRouteHistory", ({ routeId }) => {
    routeController.requestRouteHistory(socket, routeId);
  });

  socket.on("leaveRoute", ({routeId}) => {
    socket.leave(`route_${routeId}`);
    console.log(`User ${socket.user.email} left route ${routeId}`);
  });
};
