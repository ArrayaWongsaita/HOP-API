const prisma = require("../models/prisma");
const routeService = {};

// process.on("exit", async () => {
//   console.log("Disconnecting Prisma...");
//   await prisma.$disconnect();
//   console.log("Prisma disconnected");
// });
routeService.createNewRoute = (routeInfo) => {
  return prisma.route.create({ data: routeInfo });
};

routeService.updateRouteToAcceptedByRouteIdRiderIdRiderLatAndRiderLng = (
  routeId,
  riderId,
  riderLat,
  riderLng
) =>
  prisma.route.update({
    where: { id: routeId },
    data: {
      status: "ACCEPTED",
      rider: {
        connect: { id: riderId },
      },
      riderLat,
      riderLng,
    },
  });

routeService.createChatByCustomerIdAndRiderId = (customerId, riderId) =>
  prisma.chat.create({
    data: {
      userId: customerId,
      riderId: riderId,
    },
  });

// routeService.acceptRoute = (routeId, riderId, customerId, riderLat, riderLng) =>  prisma.$transaction(async (tx) => {
//     // Update the route status and connect rider
//     try {
//       const acceptedRoute = await tx.route.update({
//         where: { id: routeId },
//         data: {
//           status: "ACCEPTED",
//           rider: {
//             connect: { id: riderId },
//           },
//           riderLat,
//           riderLng,
//         },
//       });
//       console.log("---------------------------------------------------")
//       console.log(`Route id = ${acceptedRoute.id} Create a chat between customer id = ${acceptedRoute.customerId} and rider id = ${acceptedRoute.riderId} `)
//       // Create a chat between customer and rider
//       if(acceptedRoute.status ===  "ACCEPTED"){

//         const createChat = await tx.chat.create({
//           data: {
//             userId: customerId,
//             riderId: riderId,
//           },
//         });
//         acceptedRoute.chatInfo = createChat;
//         console.log("output = ",createChat )
//       }
//       console.log("---------------------------------------------------")

//       return acceptedRoute;
//     } catch (error) {
//       console.log("error prisma.$transaction",error)
//     }
//   });

// rider is going to the pickup point
routeService.goingRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "GOING" },
  });
};

// rider is already picked up the customer
routeService.pickedup = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "PICKEDUP" },
  });
};

// rider is sending the customer
routeService.onTheWay = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "OTW" },
  });
};

// rider is arrived the destination point
routeService.arrived = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "ARRIVED" },
  });
};

// the ride request is finished
routeService.finishRoute = async (data) => {
  console.log(data);

  const transaction = await prisma.$transaction(async (prisma) => {
    // Update the route status and connect rider
    try {
      const Route = await prisma.route.update({
        where: { id: +data.id },
        data: { status: "FINISHED" },
      });
      console.log(Route);
      await prisma.message.deleteMany({ where: { chatId: data.chatId } });
      await prisma.chat.deleteMany({
        where: { riderId: data.riderId, userId: data.userId },
      });
      return Route;
    } catch (error) {
      console.log("prisma.$transaction error ", error);
    }
  });

  console.log(transaction);
  return transaction;
};

routeService.getAllRoute = () => {
  return prisma.route.findMany({
    where: { status: "PENDING" },
    orderBy: { id: "desc" },
  });
};

routeService.cancelRoute = (routeId) => {
  return prisma.route.update({
    where: { id: routeId },
    data: { status: "CANCELED" },
  });
};

routeService.findRouteByRouteId = async (id) => {
  console.log("====================get route========================", id);
  // หา route ที่มี id ตรงกับ id ที่ส่งมา
  const route = await prisma.route.findFirst({ where: { id } });

  if (route) {
    // หา chat ที่มี userId และ riderId ตรงกับ customerId และ riderId ของ route
    const chat = await prisma.chat.findFirst({
      where: {
        userId: route.customerId,
        riderId: route.riderId,
      },
      include: {
        rider: true,
        user: true
      }
    });

    // เพิ่มข้อมูล chat เข้าไปใน route ก่อนส่งออก
    route.chatInfo = chat;
  }

  return route;
};

routeService.updateStatusByRouteIdAndStatus = (id, status) =>
  prisma.route.update({ where: { id }, data: { status } });

routeService.getAllRoutes = () => {
  return prisma.route.findMany();
};

module.exports = routeService;
