const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./src/routes/auth-route");
const customerRouter = require("./src/routes/customer-route");
const routeRouter = require("./src/routes/route-route");
const errorMiddleware = require("./src/middlewares/error");
const chatRoute = require("./src/routes/chat-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/customer", customerRouter);
// app.use("/route", routeRouter);

app.use(errorMiddleware);

const socketIO = (io, socket) => {
  chatRoute(socket, io);
  routeRouter(socket, io);
};

module.exports = { app, socketIO };
