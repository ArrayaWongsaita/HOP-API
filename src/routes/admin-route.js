const express = require("express");
const adminController = require("../controllers/admin-controller");

const adminRouter = express.Router();

adminRouter.get("/approval", adminController.getAllPending);
adminRouter.patch("/approval", adminController.approveRider);

adminRouter.get("/payment", adminController.getAllPayments);
adminRouter.patch("/payment", adminController.confirmPayment);

adminRouter.get("/route");

module.exports = adminRouter;