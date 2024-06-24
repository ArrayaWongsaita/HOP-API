const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./src/routes/auth-route");
const customerRouter = require("./src/routes/customer-route");
const errorMiddleware = require("./src/middlewares/error");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/customer", customerRouter);

app.use(errorMiddleware);

module.exports = app;
