const express = require("express");
const authController = require("../controllers/auth-controller");
const validation = require("../middlewares/validation");
const authenticate = require("../middlewares/authenticate");

const authRouter = express.Router();

// REGISTER for different roles

// Customer register
authRouter.post(
  "/register/customer",
  validation.registerValidation,
  (req, res, next) => {
    req.body.role = "customer";
    next();
  },
  authController.register
);

// Rider register
authRouter.post(
  "/register/rider",
  validation.registerValidation,
  (req, res, next) => {
    req.body.role = "rider";
    next();
  },
  authController.register
);

// LOGIN for different roles

// Customer login
authRouter.post(
  "/login/customer",
  validation.loginValidation,
  (req, res, next) => {
    (req.body.role = "customer"), next();
  },
  authController.login
);

// Rider OR Admin login
authRouter.post(
  "/login/riderOrAdmin",
  validation.loginValidation,
  authController.login
);

// Get authorized user in different roles
authRouter.get("/me", authenticate, authController.getMe);

module.exports = authRouter;
