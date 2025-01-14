const userService = require("../services/user-service");

const customerController = {};

customerController.getRouteHistory = async (req, res, next) => {
  try {
  const result = await  userService.getRouteHistory(req.user.id)
  res.status(200).json(result);
  } catch (error) {
    next(error)
  }
}

customerController.findRouteCustomer = async (req, res, next) => {
  try {
    const result = await userService.findUserRouteByCustomerId(req.user.id);
    res.status(200).json({ ...result });
  } catch (error) {
    next(error);
  }
};

customerController.getCustomerInfo = async (req, res, next) => {
  try {
    const customerId = parseInt(req.params.customerId);

    const customerInfo = await userService.findCustomerById(customerId);

    res.status(200).json(customerInfo);
  } catch (error) {
    next(error);
  }
};

customerController.updateCustomerInfo = async (req, res, next) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const data = req.body;

    const updatedCustomer = await userService.updateUserData(customerId, data);

    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

module.exports = customerController;
