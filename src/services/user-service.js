const prisma = require("../models/prisma");

const userService = {};

userService.createCustomer = (customerData) => {
  return prisma.user.create({ data: customerData });
};

userService.findCustomerByEmailOrPhone = (emailOrPhone) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { mobile: emailOrPhone }],
    },
  });
};

userService.findCustomerById = (id) => {
  return prisma.user.findFirst({ where: { id } });
};

userService.createRider = (riderData) => {
  return prisma.rider.create({ data: riderData });
};

userService.findRiderByEmailOrPhone = (emailOrPhone) => {
  return prisma.rider.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    },
  });
};

userService.findRiderById = (id) => {
  return prisma.rider.findFirst({ where: { id } });
};

userService.findAdminByEmailOrPhone = (emailOrPhone) => {
  return prisma.admin.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { mobile: emailOrPhone }],
    },
  });
};

userService.findAdminById = (id) => {
  return prisma.admin.findFirst({ where: { id } });
};

module.exports = userService;
