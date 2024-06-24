const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const riderService = require("../services/rider-service");
const userService = require("../services/user-service");
const checkRole = require("../utils/check-role");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    // For customer registration
    if (req.body.role === "customer") {
      const data = req.input;

      const existedCustomer = await userService.findCustomerByEmailAndPhone(
        data.email,
        data.phone
      );

      console.log(existedCustomer);

      if (existedCustomer) {
        res
          .status(400)
          .json({ message: "email or phone number already in use" });
      }

      data.password = await hashService.hash(data.password);

      await userService.createCustomer(data);
      res.status(200).json({ message: "User created" });
    }

    // For rider register
    if (req.body.role === "rider") {
      const data = req.input;

      const existedRider = await riderService.findRiderByEmailAndPhone(
        data.email,
        data.phone
      );

      if (existedRider) {
        res
          .status(400)
          .json({ message: "email or phone number is already in use" });
      }

      data.password = await hashService.hash(data.password);

      await riderService.createRider(data);
      res.status(200).json({ message: "User created" });
    }
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    // Customer login
    if (req.body.role === "customer") {
      const data = req.input;
      const existedCustomer = await userService.findCustomerByEmailOrPhone(
        data.emailOrPhone
      );

      if (!existedCustomer) {
        res.status(400).json({ message: "user not found" });
      }

      const isMatch = await hashService.compare(
        data.password,
        existedCustomer.password
      );

      if (!isMatch) {
        res.status(400).json({ message: "invalid credentials" });
      }

      const accessToken = jwtService.sign({
        user: { id: existedCustomer.id, role: "customer" },
      });
      return res.status(200).json(accessToken);
    }

    // Rider or Admin login
    if (!req.role) {
      const data = req.input;

      const userRole = await checkRole(data.emailOrPhone);

      if (!userRole) {
        return res.status(400).json({ message: "invalid credentials" });
      }

      const { user, role } = userRole;

      const isMatch = await hashService.compare(data.password, user.password);

      if (!isMatch) {
        res.status(400).json({ message: "invalid credentials" });
      }

      const accessToken = jwtService.sign({
        user: { id: user.id, role: role },
      });
      return res.status(200).json(accessToken);
    }
  } catch (error) {
    next(error);
  }
};

// Get authorized user
authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
