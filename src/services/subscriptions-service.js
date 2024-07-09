const prisma = require("../models/prisma.js");

const subscriptionService = {};

subscriptionService.getAllPlans = () => {
  return prisma.subscription.findMany();
};

module.exports = subscriptionService;
