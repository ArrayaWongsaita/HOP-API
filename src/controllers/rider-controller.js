const riderService = require("../services/rider-service");

const riderController = {};

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

module.exports = riderController;
