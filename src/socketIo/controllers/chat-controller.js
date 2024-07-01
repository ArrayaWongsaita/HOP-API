const chatService = require("../../services/chat-service");


const chatController = {};
//====================== JOIN CHAT =======================
chatController.joinChat = async (socket, chatId) => {
  try {
    if (chatId) {
      socket.join(`chat_${chatId}`);
      console.log(`User joined chat ${chatId}`);
      // ส่งข้อความเก่าให้ผู้ใช้ที่เข้าร่วม
      const messages = await chatService.findMessageByChatId(chatId);
      socket.emit("chatHistory", messages);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

chatController.typing = (socket, chatId, role) => {
  console.log(chatId, role);
  if (chatId) {
    socket.to(`chat_${chatId}`).emit("typing", { role });
  }
};

chatController.getListChat = async (socket, data) => {
  try {
    if (data.role === "ADMIN") {
      const res = await chatService.findChatListByAdminId(data.id);
      socket.emit("chatList", res);
    } else if (data.role === "RIDER") {
      const res = await chatService.findChatListByRiderId(data.id);
      socket.emit("chatList", res);
    } else if (data.role === "USER") {
      const res = await chatService.findChatListByUserId(data.id);
      socket.emit("chatList", res);
    } else {
      socket.emit("chatList", []);
    }
  } catch (error) {
    console.log(error);
  }
};

//====================== SEN MESSAGE =======================
chatController.senMessage = async (
  io,
  socket,
  chatId,
  senderId,
  content,
  senderRole
) => {
  try {
    console.log(
      `Received message from ${senderRole} id ${senderId} in chat ${chatId}: ${content}`
    );
    const message = await chatService.createMessageByChatIdSenderIdAndContent(
      chatId,
      senderId,
      content,
      senderRole
    );
    io.to(`chat_${chatId}`).emit("newMessage", message);
  } catch (error) {
    console.error("Error creating message:", error);
  }
};

chatController.deleteChatHistory = async (socket, chatId) => {
  try {
    await chatService.deleteChatHistoryByChatId(chatId);
    console.log("delete all message chatId", chatId, " =  ", []);
    // io.to(`chat_${chatId}`).emit('newMessage', 'delete');
    socket.to(`chat_${chatId}`).emit("chatHistory", []); /// ส่งประวัติแชทที่ว่างเปล่ากลับไปยังลูกค้า
  } catch (error) {
    console.log(error);
  }
};

//====================== DIS CONNECT =======================
chatController.disConnect = (socket) => {
  const sessionId = socket.handshake.sessionID;

  // ลบเซสชันของผู้ใช้งาน
  if (sessionId) {
    console.log(sessionId, " Dis connect");
    // ใช้ express-session เพื่อลบเซสชัน
    socket.handshake.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        console.log("Session destroyed successfully");
      }
    });
  }
};

module.exports = chatController;
