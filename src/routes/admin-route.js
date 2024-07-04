const express = require("express");
const adminController = require("../controllers/admin-controller");

const adminRouter = express.Router();

adminRouter.get("/approval", adminController.getAllPending);

adminRouter.get("/payment", adminController.getAllPayments);
