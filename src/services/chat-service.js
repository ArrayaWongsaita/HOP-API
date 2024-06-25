const prisma = require("../models/prisma");



const chatService = {}

chatService.findChatListByAdminId = (adminId)=> prisma.chat.findMany({where: {adminId}})
chatService.findChatListByRiderId = (riderId)=> prisma.chat.findMany({where: {riderId}})
chatService.findChatListByUserId = (userId)=> prisma.chat.findMany({where: {userId}})

chatService.findMessageByChatId = (chatId) => prisma.message.findMany({
  where: { chatId },
  orderBy: { createdAt: 'asc' },
});

chatService.createMessageByChatIdSenderIdAndContent = (chatId, senderId, content,senderRole)=> prisma.message.create({
  data: {
    chatId: parseInt(chatId), 
    content,
    senderRole
  },
});
chatService.deleteChatHistoryByChatId = (chatId)=>prisma.message.deleteMany({
  where: { chatId },
});
module.exports = chatService