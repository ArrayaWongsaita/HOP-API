const chatController = require("../controllers/chat-controller");

module.exports = chatRoute = (socket, io) => {
  socket.on("getListChat", (data) => {
    console.log(`---- getListChat -------`);
    chatController.getListChat(socket, data);
  });

  socket.on("joinChat", ({ chatId }) => {
    console.log(`----${socket.user.email} joinChat id ${chatId} -------`);
    chatController.joinChat(socket, chatId);
  });

  socket.on("sendMessage", ({ chatId, senderId, content, senderRole }) => {
    console.log("---- sendMessage -------");
    chatController.senMessage(
      io,
      socket,
      chatId,
      senderId,
      content,
      senderRole
    );
  });
  socket.on("sendMessageAdmin", ({ chatId, senderId, content, senderRole }) => {
    console.log("---- sendMessageAdmin -------");
    chatController.senMessageAdmin(
      io,
      socket,
      chatId,
      senderId,
      content,
      senderRole
    );
  });

  socket.on("typing", ({ chatId, role }) => {
    console.log("---- typing -------");
    chatController.typing(socket, chatId, role);
  });

  socket.on("deleteChatHistory", ({ chatId }) => {
    console.log("---- deleteChatHistory -------");
    chatController.deleteChatHistory(socket, chatId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.user.email);
    chatController.disConnect(socket);
  });


socket.on("leaveChat", ({chatId}) => {
  socket.leave(`chat_${chatId}`);
  console.log(`User ${socket.user.email} left Chat = ${chatId}`);
});

socket.on("chatToAdmin", ()=>{
  chatController.chatToAdmin(socket,io)
})


};
