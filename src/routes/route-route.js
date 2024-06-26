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
  socket.on("newRoute", ({ customerId, data }) => {
    routeController.newRoute(socket, customerId, routeInfo);
  });

  // cancel ride request by customer
  socket.on("cancelRoute", (routeId) => {
    routeController.cancelRoute(socket, routeId);
  });

  // confirm ride by rider
  socket.on("confirmRoute", (routeId, riderId) => {
    routeController.acceptRoute(io, socket, routeId, riderId);
  });

  // finish confirmation by rider
  socket.on("finishRoute", (routeId) => {
    routeController.finishRoute(io, socket, routeId, riderId);
  });

  // get all ride request
  socket.on("allRoutes", () => {
    routeController.getAllRoute(socket);
  });
};
