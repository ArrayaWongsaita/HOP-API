const paymentService = require("../services/payment-service");
const riderService = require("../services/rider-service");

const adminController = {};

adminController.getAllPending = async (req, res, next) => {
  try {
    const pendingApprovalRiders = await riderService.getPendingRider();
    res.status(200).json(pendingApprovalRiders);
  } catch (error) {
    next(error);
  }
};

adminController.approveRider = async (req, res, next) => {
  try {
    const riderId = parseInt(req.body.riderId);
    const approvedRider = await riderService.approveStatus(riderId);
    res.status(200).json(approvedRider);
  } catch (error) {
    next(error);
  }
};

adminController.getAllPayments = async (req, res, next) => {
  try {
    const approvedRiders = await paymentService.getAllPayment();
    res.status(200).json(approvedRiders);
  } catch (error) {
    next(error);
  }
};

adminController.confirmPayment = async (req, res, next) => {
  try {
    const paymentId = req.body.paymentId;
    const confirmedPayment = await paymentService.confirmPayment(paymentId);
  } catch (error) {
    next(error);
  }
};

module.exports = adminController;
