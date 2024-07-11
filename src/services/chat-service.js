const prisma = require("../models/prisma");

const chatService = {};

chatService.getChatAdminAndMessages = () =>
  prisma.chat.findMany({
    where: { adminId: { not: null } },
    include: { messages: true, rider: true, user: true },
  });

chatService.findChatListByAdminId = (adminId) =>
  prisma.chat.findMany({ where: { adminId } });
chatService.findChatListByRiderId = (riderId) =>
  prisma.chat.findMany({ where: { riderId } });
chatService.findChatListByUserId = (userId) =>
  prisma.chat.findMany({ where: { userId } });

chatService.findMessageByChatId = (chatId) =>
  prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });

chatService.createChatToAdminByUserIdOrRiderId = (data) =>
  prisma.chat.create({ data });

chatService.findChatUserAndAdminIdByUserId = (userId) => {
  return prisma.chat.findFirst({
    where: {
      userId: userId,
      adminId: { not: null },
    },
    include: { messages: true },
  });
};
chatService.findChatUserAndAdminIdByRiderId = (riderId) => {
  return prisma.chat.findFirst({
    where: {
      riderId,
      adminId: { not: null },
    },
    include: { messages: true },
  });
};

chatService.createMessageByChatIdSenderIdAndContent = (
  chatId,
  senderId,
  content,
  senderRole
) =>
  prisma.message.create({
    data: {
      chatId: parseInt(chatId),
      content,
      senderRole,
    },
  });
chatService.deleteChatHistoryByChatId = (chatId) =>
  prisma.message.deleteMany({
    where: { chatId },
  });
module.exports = chatService;
