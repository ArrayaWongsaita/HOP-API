// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      password: 'securepassword123'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      password: 'securepassword456'
    }
  });

  // Create Riders
  const rider1 = await prisma.rider.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '5555555555',
      password: 'securepassword789',
      profileImage: 'profile_image_url',
      citizenId: '1234567890123',
      dob: new Date('1980-01-01'),
      address: '123 Main St, Springfield, USA',
      driverLicense: 'D1234567',
      licensePlate: 'XYZ123',
      verhicleImage: 'vehicle_image_url',
      status: 'APPROVED'
    }
  });

  const rider2 = await prisma.rider.create({
    data: {
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      phone: '6666666666',
      password: 'securepassword012',
      profileImage: 'profile_image_url',
      citizenId: '0987654321098',
      dob: new Date('1990-02-02'),
      address: '456 Elm St, Springfield, USA',
      driverLicense: 'D7654321',
      licensePlate: 'ABC456',
      verhicleImage: 'vehicle_image_url',
      status: 'PENDING'
    }
  });

  // Create Admins
  const admin1 = await prisma.admin.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      passsword: 'adminpassword123',
      email: 'admin@example.com'
    }
  });

  // Create Routes
  const route1 = await prisma.route.create({
    data: {
      customerId: user1.id,
      status: 'ACCEPTED',
      pickupPlace: '123 Pickup St, Springfield',
      pickupLat: '40.712776',
      pickupLng: '-74.005974',
      desPlace: '456 Destination Ave, Springfield',
      desLat: '40.712776',
      desLong: '-74.005974',
      rideFare: 50.0,
      distance: 10.5,
      riderId: rider1.id
    }
  });

  const route2 = await prisma.route.create({
    data: {
      customerId: user2.id,
      status: 'PENDING',
      pickupPlace: '789 Pickup Blvd, Springfield',
      pickupLat: '40.712776',
      pickupLng: '-74.005974',
      desPlace: '101 Destination Rd, Springfield',
      desLat: '40.712776',
      desLong: '-74.005974',
      rideFare: 30.0,
      distance: 5.0
    }
  });

  // Create Payments
  const payment1 = await prisma.payment.create({
    data: {
      riderId: rider1.id,
      paymentSlip: 'payment_slip_url'
    }
  });

  const payment2 = await prisma.payment.create({
    data: {
      riderId: rider2.id
    }
  });

  // Create Chats
  const chat1 = await prisma.chat.create({
    data: {
      userId: user1.id,
      riderId: rider1.id,
      senderBy: 'user',
      messages: {
        create: [
          { senderRole: 'USER', content: 'Hello, I need a ride.' },
          { senderRole: 'RIDER', content: 'Sure, where to?' }
        ]
      }
    }
  });

  const chat2 = await prisma.chat.create({
    data: {
      userId: user2.id,
      adminId: admin1.id,
      senderBy: 'user',
      messages: {
        create: [
          { senderRole: 'USER', content: 'I need help with my account.' },
          { senderRole: 'RIDER', content: 'Sure, how can I assist you?' }
        ]
      }
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
