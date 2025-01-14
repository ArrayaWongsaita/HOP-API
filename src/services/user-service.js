const prisma = require("../models/prisma");

const userService = {};

userService.getRouteHistory = (customerId) => {
  return prisma.route.findMany({
    where: { customerId },
    orderBy: { id: "desc" },
    take: 5,
  });
};

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
userService.findUserRouteAndUserAndRiderDetailByCustomerId = (customerId) =>
  prisma.route.findFirst({
    where: {
      customerId,
      status: {
        notIn: ["FINISHED", "CANCELED"],
      },
    },
    include: {
      rider: true,
      customer: true,
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
