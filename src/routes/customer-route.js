const express = require("express");
const customerController = require("../controllers/customer-controller");
const authenticate = require("../middlewares/authenticate");

const customerRouter = express.Router();

// Customer Profile
customerRouter.get("/route", authenticate, customerController.findRouteCustomer);
customerRouter.get("/:customerId", customerController.getCustomerInfo);
customerRouter.patch("/:customerId", customerController.updateCustomerInfo);

module.exports = customerRouter;
