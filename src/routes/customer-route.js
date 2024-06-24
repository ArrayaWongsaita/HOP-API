const express = require("express");
const customerController = require("../controllers/customer-controller");

const customerRouter = express.Router();

// Customer Profile
customerRouter.get("/:customerId", customerController.getCustomerInfo);
customerRouter.patch("/:customerId", customerController.updateCustomerInfo);

module.exports = customerRouter;
