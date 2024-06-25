const express = require("express");
const routeController = require("../controllers/route-controller");

const routeRouter = express.Router();

routeRouter.post("/:customerId", routeController.newRoute);
routeRouter.get("/", (req, res) => {});
routeRouter.patch("/:riderId", routeController.acceptRoute);
routeRouter.patch("/:routeId", (req, res) => {});
routeRouter.delete("/:routeId", (req, res) => {});
