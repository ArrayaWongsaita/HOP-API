const express = require("express");
const routeController = require("../controllers/route-controller");

const routeRouter = express.Router();

routeRouter.post("/:customerId", routeController.newRoute);
routeRouter.get("/all", routeController.getAllRoute);
routeRouter.patch("/rider/accept/:riderId", routeController.acceptRoute);
routeRouter.patch("/rider/finish:riderId", routeController.finishRoute);
routeRouter.patch("customer/:routeId", routeController.cancelRoute);

module.exports = routeRouter;
