const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // ลองข้อมูลสำหรับ User
  const users = await prisma.user.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '0123456789',
        password: 'securepassword',
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phone: '0123456781',
        password: 'securepassword',
      },
    ],
  });

  // ลองข้อมูลสำหรับ Rider
  const riders = await prisma.rider.createMany({
    data: [
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '0987654321',
        password: 'securepassword',
        profileImage: 'path/to/image.jpg',
        citizenId: '1234567890123',
        dob: new Date('1990-01-01'),
        address: '123 Main St',
        driverLicense: 'DL123456',
        licensePlate: 'ABC-1234',
        vehicleImage: 'path/to/vehicle.jpg',
        status: 'PENDING',
      },
      {
        firstName: 'Bob',
        lastName: 'Williams',
        email: 'bob.williams@example.com',
        phone: '0987654322',
        password: 'securepassword',
        profileImage: 'path/to/image.jpg',
        citizenId: '1234567890124',
        dob: new Date('1985-02-01'),
        address: '456 Another St',
        driverLicense: 'DL123457',
        licensePlate: 'XYZ-5678',
        vehicleImage: 'path/to/vehicle2.jpg',
        status: 'APPROVED',
      },
    ],
  });

  // ลองข้อมูลสำหรับ Admin
  const admins = await prisma.admin.createMany({
    data: [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'securepassword',
      },
      {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'super.admin@example.com',
        password: 'securepassword',
      },
    ],
  });

  // ลองข้อมูลสำหรับ Route
  const routes = await prisma.route.createMany({
    data: [
      {
        customerId: 1,
        status: 'PENDING',
        pickupPlace: '123 Main St',
        pickupLat: '13.736717',
        pickupLng: '100.523186',
        desPlace: '456 Another St',
        desLat: '13.756331',
        desLng: '100.501762',
        rideFare: 150.50,
        distance: 10.5,
        estTime: 20,
        riderId: 1,
      },
      {
        customerId: 2,
        status: 'ACCEPTED',
        pickupPlace: '789 Third St',
        pickupLat: '13.746717',
        pickupLng: '100.533186',
        desPlace: '012 Fourth St',
        desLat: '13.766331',
        desLng: '100.511762',
        rideFare: 200.75,
        distance: 15.0,
        estTime: 30,
        riderId: 2,
      },
    ],
  });

  // ลองข้อมูลสำหรับ Payment
  const payments = await prisma.payment.createMany({
    data: [
      {
        riderId: 1,
        paymentSlip: 'path/to/payment_slip1.jpg',
        approvedAt: new Date(),
      },
      {
        riderId: 2,
        paymentSlip: 'path/to/payment_slip2.jpg',
      },
    ],
  });

  // ลองข้อมูลสำหรับ Chat
  const chats = await prisma.chat.createMany({
    data: [
      {
        userId: 1,
        riderId: 1,
        adminId: 1,
        senderBy: 'USER',
      },
      {
        userId: 2,
        riderId: 2,
        adminId: 2,
        senderBy: 'RIDER',
      },
    ],
  });

  // ลองข้อมูลสำหรับ Message
  const messages = await prisma.message.createMany({
    data: [
      {
        chatId: 1,
        senderRole: 'USER',
        content: 'Hello, this is a test message from user',
      },
      {
        chatId: 1,
        senderRole: 'RIDER',
        content: 'Hi there, this is a reply from rider',
      },
      {
        chatId: 2,
        senderRole: 'RIDER',
        content: 'Hello, this is another test message from rider',
      },
      {
        chatId: 2,
        senderRole: 'ADMIN',
        content: 'Hello, this is a message from admin',
      },
    ],
  });

  console.log('Data seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
