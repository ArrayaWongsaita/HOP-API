const prisma = require("../models/prisma");

const userService = {};

userService.findUserRouteByCustomerId = (customerId) =>
  prisma.route.findFirst({
    where: {
      customerId,
      NOT: {
        status: {
          in: ["FINISHED", "CANCELED"],
        },
      },
    },
  });

userService.createCustomer = (customerData) => {
  return prisma.user.create({ data: customerData });
};

userService.findCustomerByEmailAndPhone = (email, phone) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { phone: phone }],
    },
  });
};

userService.findCustomerByEmailOrPhone = (emailOrPhone) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    },
  });
};

userService.findCustomerById = (id) => {
  return prisma.user.findFirst({ where: { id } });
};

userService.updateUserData = (id, data) => {
  return prisma.user.update({ where: id, data });
};

module.exports = userService;
