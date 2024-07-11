const chatService = require("../services/chat-service");
const paymentService = require("../services/payment-service");
const riderService = require("../services/rider-service");
const routeService = require("../services/route-service");

const adminController = {};

adminController.getAllPending = async (req, res, next) => {
  try {
    const pendingApprovalRiders = await riderService.getAllRider();
    res.status(200).json(pendingApprovalRiders);
  } catch (error) {
    next(error);
  }
};

adminController.approveRider = async (req, res, next) => {
  try {
    const riderId = parseInt(req.body.riderId);
    const status = req.body.status;

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

    let expiredDate ;

    if (status === "CONFIRMED") {
      const now = new Date();
      if (planId == 1) {
        const next30Days = now.getTime() + 30 * 24 * 60 * 60 * 1000;
        expiredDate = new Date(next30Days);
      } else if (planId == 2) {
        const next90Days = now.getTime() + 90 * 24 * 60 * 60 * 1000;
         expiredDate = new Date(next90Days);

      } else if (planId == 3) {
        const next180Days = now.getTime() + 180 * 24 * 60 * 60 * 1000;
         expiredDate = new Date(next180Days);

      } else if (planId == 4) {
        const next270Days = now.getTime() + 270 * 24 * 60 * 60 * 1000;
         expiredDate = new Date(next270Days);

      } else if (planId == 5) {
        const next360Days = now.getTime() + 360 * 24 * 60 * 60 * 1000;
         expiredDate = new Date(next360Days);

      } else {
        res.status(400).json({ message: "Invalid planId" });
      }
      console.log("test ")

      const paymentData = {
        approvedAt: now,
        expiredDate: expiredDate,
        status: "SUBSCRIBED",
      };

      console.log(paymentData)

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
    console.log(error)
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
adminController.getAllChatInfo= async (req, res, next) => {
  try {
    const chatInfo = await chatService.getChatAdminAndMessages()
    res.status(200).json(chatInfo);
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
