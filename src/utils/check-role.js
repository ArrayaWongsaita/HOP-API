const prisma = require("../models/prisma");
const userService = require("../services/user-service");

const checkRole = async (emailOrPhone) => {
  const rider = await userService.findRiderByEmailOrPhone(emailOrPhone);
  if (!rider) {
    const admin = await userService.findAdminByEmailOrPhone(emailOrPhone);
    if (!admin) {
      return null;
    }
    return { user: admin, role: "admin" };
  }
  return { user: rider, role: "rider" };
};

module.exports = checkRole;
