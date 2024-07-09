const paymentService = require("../services/payment-service");
const riderService = require("../services/rider-service");
const routeService = require("../services/route-service");

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
    const status = res.body.status;

    if (status === "APPROVED") {
      const approvedRider = await riderService.approveStatus(riderId);
      return res.status(200).json(approvedRider);
    }

    if (status === "DENIED") {
      const deniedRider = await riderService.denyStatus(riderId);
      return res.status(200).json(deniedRider);
    }

    res.status(400).json({ message: "Invalid status" });
  } catch (error) {
    next(error);
  }
};

adminController.confirmPayment = async (req, res, next) => {
  try {
    const paymentId = parseInt(req.body.paymentId);
    const status = req.body.status;
    const planId = parseInt(req.body.planId);

    if (status === "CONFIRMED") {
      const now = new Date();
      if (planId == 1) {
        const next30Days = now.getTime() + 30 * 24 * 60 * 60 * 1000;
        const expiredDate = new Date(next30Days);
        return expiredDate;
      } else if (planId == 2) {
        const next90Days = now.getTime() + 90 * 24 * 60 * 60 * 1000;
        const expiredDate = new Date(next90Days);
        return expiredDate;
      } else if (planId == 3) {
        const next180Days = now.getTime() + 180 * 24 * 60 * 60 * 1000;
        const expiredDate = new Date(next180Days);
        return expiredDate;
      } else if (planId == 4) {
        const next270Days = now.getTime() + 270 * 24 * 60 * 60 * 1000;
        const expiredDate = new Date(next270Days);
        return expiredDate;
      } else if (planId == 5) {
        const next360Days = now.getTime() + 360 * 24 * 60 * 60 * 1000;
        const expiredDate = new Date(next360Days);
        return expiredDate;
      } else {
        res.status(400).json({ message: "Invalid planId" });
      }

      const paymentData = {
        approvedDate: now,
        expiredDate: expiredDate,
        status: "SUBSCRIBED",
      };

      const confirmedPayment = await paymentService.confirmPayment(
        paymentId,
        paymentData
      );

      return res.status(200).json(confirmedPayment);
    }

    if (status === "DENIED") {
      const deniedPayment = await paymentService.denyPayment(paymentId);

      return res.status(200).json(deniedPayment);
    }

    res.status(400).json({ message: "Invalid status" });
  } catch (error) {
    next(error);
  }
};

adminController.getAllPayments = async (req, res, next) => {
  try {
    const allPayments = await paymentService.getAllPayment();
    res.status(200).json(allPayments);
  } catch (error) {
    next(error);
  }
};

adminController.getAllRoutes = async (req, res, next) => {
  try {
    const allRoutes = await routeService.getAllRoutes();
    res.status(200).json(allRoutes);
  } catch (error) {
    next(error);
  }
};

module.exports = adminController;
