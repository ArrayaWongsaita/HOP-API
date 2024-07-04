const express = require("express");
const riderController = require("../controllers/rider-controller");
const authenticate = require("../middlewares/authenticate");

const riderRouter = express.Router();

riderRouter.get("/", authenticate, riderController.getInfoRider);
riderRouter.get("/route", authenticate, riderController.findRouteRider);

module.exports = riderRouter;
