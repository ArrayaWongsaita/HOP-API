const express = require("express");
const riderController = require("../controllers/rider-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const riderRouter = express.Router();

riderRouter.get("/all", authenticate, riderController.getInfoRider);
riderRouter.get("/available", riderController.availableRider);
riderRouter.post(
  "/verify",
  authenticate,
  upload.fields([
    { name: "licenseImage", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
    { name: "vehicleImage", maxCount: 1 },
    { name: "vehicleRegistrationImage", maxCount: 1 },
  ])
);

module.exports = riderRouter;
