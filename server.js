require("dotenv").config();

const socketio = require('socket.io');
const {app, socketIO} = require("./app.js");



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
  socketIO(socket,io);
});
