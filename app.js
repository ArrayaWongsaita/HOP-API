const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./src/routes/auth-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);

module.exports = app;
