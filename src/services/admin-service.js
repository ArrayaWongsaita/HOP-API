const prisma = require("../models/prisma");

const adminService = {};

adminService.findAdminByEmailOrPhone = (emailOrPhone) => {
  return prisma.admin.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { mobile: emailOrPhone }],
    },
  });
};

adminService.findAdminById = (id) => {
  return prisma.admin.findFirst({ where: { id } });
};

module.exports = adminService;
