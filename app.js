const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./src/routes/auth-route");
const customerRouter = require("./src/routes/customer-route");
const errorMiddleware = require("./src/middlewares/error");
const chatRoute = require("./src/socketIo/routes/chat-route");
const routeRoute = require("./src/socketIo/routes/route-route");
const riderRouter = require("./src/routes/rider-route");
const adminRouter = require("./src/routes/admin-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/customer", customerRouter);
app.use("/rider", riderRouter);
app.use("/admin", adminRouter);

app.use(errorMiddleware);

const socketIO = (socket, io) => {
  // console.log("socket--------")
  socket.onAny((event, ...args) => {
    console.log(`Received event: ${event}`);
    console.log("With arguments:", args);
  });

  chatRoute(socket, io);
  routeRoute(socket, io);
};

module.exports = { app, socketIO };
