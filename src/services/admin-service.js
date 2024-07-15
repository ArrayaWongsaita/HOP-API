const prisma = require("../models/prisma");

const adminService = {};

adminService.findAdminByEmailOrPhone = (emailOrPhone) => {
  return prisma.admin.findFirst({
    where: {
     email: emailOrPhone 
    },
  });
};

adminService.findAdminById = (id) => {
  return prisma.admin.findFirst({ where: { id } });
};

module.exports = adminService;
