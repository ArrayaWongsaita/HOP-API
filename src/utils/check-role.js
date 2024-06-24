const prisma = require("../models/prisma");
const adminService = require("../services/admin-service");
const riderService = require("../services/rider-service");

const checkRole = async (emailOrPhone) => {
  const rider = await riderService.findRiderByEmailOrPhone(emailOrPhone);
  if (!rider) {
    const admin = await adminService.findAdminByEmailOrPhone(emailOrPhone);
    if (!admin) {
      return null;
    }
    return { user: admin, role: "admin" };
  }
  return { user: rider, role: "rider" };
};

module.exports = checkRole;
