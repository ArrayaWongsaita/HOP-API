const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // ลบข้อมูลทั้งหมดเพื่อเริ่มการ seed ใหม่
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.route.deleteMany();
  await prisma.rider.deleteMany();
  await prisma.user.deleteMany();
  await prisma.admin.deleteMany();

  // สร้าง Users
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '0123456789',
      password: 'password123'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      password: 'password123'
    }
  });

  // สร้าง Riders
  const rider1 = await prisma.rider.create({
    data: {
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      phone: '0234567890',
      password: 'password123',
      status: 'PENDING'
    }
  });

  const rider2 = await prisma.rider.create({
    data: {
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      phone: '0345678901',
      password: 'password123',
      status: 'PENDING'
    }
  });

  // สร้าง Admins
  const admin1 = await prisma.admin.create({
    data: {
      firstName: 'Admin',
      lastName: 'One',
      email: 'admin.one@example.com',
      password: 'adminpassword'
    }
  });

  // สร้าง Routes
  const route1 = await prisma.route.create({
    data: {
      customerId: user1.id,
      status: 'PENDING',
      pickupPlace: '123 Main St',
      pickupLat: '12.34',
      pickupLng: '56.78',
      desPlace: '456 Elm St',
      desLat: '23.45',
      desLng: '67.89',
      rideFare: 100.0,
      distance: 10.0,
      estTime: 15
    }
  });

  const route2 = await prisma.route.create({
    data: {
      customerId: user2.id,
      status: 'PENDING',
      pickupPlace: '789 Oak St',
      pickupLat: '34.56',
      pickupLng: '78.90',
      desPlace: '012 Pine St',
      desLat: '45.67',
      desLng: '89.01',
      rideFare: 200.0,
      distance: 20.0,
      estTime: 30
    }
  });

  // สร้าง Payments
  const payment1 = await prisma.payment.create({
    data: {
      riderId: rider1.id,
      paymentSlip: 'paymentSlip1.png',
      createdAt: new Date(),
      approvedAt: new Date(),
      expiredDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    }
  });

  const payment2 = await prisma.payment.create({
    data: {
      riderId: rider2.id,
      paymentSlip: 'paymentSlip2.png',
      createdAt: new Date(),
      approvedAt: new Date(),
      expiredDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    }
  });

  // สร้าง Chats
  const chat1 = await prisma.chat.create({
    data: {
      userId: user1.id,
      riderId: rider1.id,
      adminId: admin1.id,
      senderBy: 'user'
    }
  });

  const chat2 = await prisma.chat.create({
    data: {
      userId: user2.id,
      riderId: rider2.id,
      adminId: admin1.id,
      senderBy: 'rider'
    }
  });

  // สร้าง Messages
  await prisma.message.create({
    data: {
      chatId: chat1.id,
      senderRole: 'USER',
      content: 'Hello, I am user1.',
      createdAt: new Date()
    }
  });

  await prisma.message.create({
    data: {
      chatId: chat1.id,
      senderRole: 'RIDER',
      content: 'Hello, I am rider1.',
      createdAt: new Date()
    }
  });

  await prisma.message.create({
    data: {
      chatId: chat2.id,
      senderRole: 'USER',
      content: 'Hello, I am user2.',
      createdAt: new Date()
    }
  });

  await prisma.message.create({
    data: {
      chatId: chat2.id,
      senderRole: 'RIDER',
      content: 'Hello, I am rider2.',
      createdAt: new Date()
    }
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
