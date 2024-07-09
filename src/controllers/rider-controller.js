const fs = require("fs");
const riderService = require("../services/rider-service");
const uploadService = require("../services/upload-service");
const paymentService = require("../services/payment-service");
const subscriptionService = require("../services/subscriptions-service");

const riderController = {};

riderController.findRouteRider = async (req, res, next) => {
  try {
    const result = await riderService.findRiderRouteByRiderId(req.user.id);
    res.status(200).json({ ...result });
  } catch (error) {
    next(error);
  }
};

riderController.getInfoRider = async (req, res, next) => {
  try {
    const result = await riderService.findLatestSlipByRiderId(req.user.id);
    if (result.length < 0) {
      return res.status(404).json({ message: "No slip found" });
    }
    const currentDate = new Date();
    const expirationDate = new Date(result[0].expiredDate);

    // คำนวณความแตกต่างในมิลลิวินาที
    const differenceInTime = expirationDate - currentDate;

    // แปลงมิลลิวินาทีเป็นวัน
    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    const data = result[0];
    data.numberOfExpirationDays = differenceInDays + 1;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

riderController.availableRider = async (req, res, next) => {
  try {
    const allAvailableRiders = await riderService.findAvailableRider();
    res.status(200).json(allAvailableRiders);
  } catch (error) {
    next(error);
  }
};

riderController.verifyRequest = async (req, res, next) => {
  try {
    // console.log("Incoming files:", req.files);
    const riderId = req.user.id;
    const { address, birthDate, idCard } = req.body;
    const {
      licenseImage,
      profileImage,
      vehicleImage,
      vehicleRegistrationImage,
    } = req.files;

    const uploadFile = async (file) => {
      const filePath = file.path;
      const cloudinaryUrl = await uploadService.upload(filePath);
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error("Error deleting file:", filePath, error);
        }
      }); // Delete the local file
      return cloudinaryUrl;
    };

    const licenseImageUrl = await uploadFile(licenseImage[0]);
    const profileImageUrl = await uploadFile(profileImage[0]);
    const vehicleImageUrl = await uploadFile(vehicleImage[0]);
    const vehicleRegistrationImageUrl = await uploadFile(
      vehicleRegistrationImage[0]
    );

    const verifyData = {
      profileImage: profileImageUrl,
      citizenId: idCard,
      dob: birthDate,
      address: address,
      driverLicense: licenseImageUrl,
      vehiclePlate: vehicleRegistrationImageUrl,
      vehicleImage: vehicleImageUrl,
    };
    const submittedData = await riderService.submitVerification(
      riderId,
      verifyData
    );
    res.status(200).json(submittedData);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

riderController.createPayment = async (req, res, next) => {
  try {
    // req = {riderId, paymentSlip}

    const riderId = parseInt(req.user.id); // authenticate
    const planId = parseInt(req.body.planId);

    const uploadFile = async (file) => {
      const filePath = file.path;
      const cloudinaryUrl = await uploadService.upload(filePath);
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error("Error deleting file:", filePath, error);
        }
      }); // Delete the local file
      return cloudinaryUrl;
    };

    const paymentSlipUrl = await uploadFile(req.file.path);
    const paymentInfo = {
      riderId: riderId,
      paymentSlip: paymentSlipUrl,
      planId: planId,
    };

    const createdPayment = await paymentService.createPayment(paymentInfo);

    res.status(200).json(createdPayment);
  } catch (error) {
    next(error);
  }
};

riderController.getAllPlan = async (req, res, next) => {
  try {
    const allSubscriptionPlans = await subscriptionService.getAllPlans();
    res.status(200).json(allSubscriptionPlans);
  } catch (error) {
    next(error);
  }
};

module.exports = riderController;
