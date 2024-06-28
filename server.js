require("dotenv").config();
const socketio = require("socket.io");
const { app, socketIO } = require("./app.js");
// const socketRoute = require("./src/routes/socket-route.js");

const PORT = process.env.PORT || 8000;
const expressServer = app.listen(PORT, () =>
  console.log("server running on port ", PORT)
);

const io = socketio(expressServer, {
  cors: {
    origin: "*", // อนุญาตให้ร้องขอจากโดเมนนี้ * = ทุกโดเมน
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  // console.log("socket--------")
  socket.onAny((event, ...args) => {
    console.log(`Received event: ${event}`);
    console.log("With arguments:", args);
  });
  socketIO(io, socket);
});
