const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const checkRole = require("../utils/check-role");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    // For customer registration
    if (req.role === "customer") {
      const data = req.body;

      const existedCustomer = userService.findCustomerByEmailOrPhone(
        data.email || data.phone
      );

      if (existedCustomer) {
        res
          .status(400)
          .json({ message: "email or phone number already in use" });
      }

      data.password = await hashService.hash(data.password);

      await userService.createCustomer(data);
    }

    // For rider register
    if (req.role === "rider") {
      const data = req.body;

      const existedRider = userService.findRiderByEmailOrPhone(
        data.email || data.phone
      );

      if (existedRider) {
        res
          .status(400)
          .json({ message: "email or phone number is already in use" });
      }

      data.password = await hashService.hash(data.password);

      await userService.createRider(data);
    }

    res.status(200).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    // Customer login
    if (req.role === "customer") {
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
      return accessToken;
    }

    // Rider or Admin login
    if (!req.role) {
      const data = req.input;

      const userRole = await checkRole(data.emailOrPhone);

      if (!userRole) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const { user, role } = userRole;

      const isMatch = await hashService.compare(data.password, user.password);

      if (!isMatch) {
        res.status(400).json({ message: "invalid credentials" });
      }

      const accessToken = jwtService.sign({
        user: { id: user.id, role: role },
      });
      return accessToken;
    }

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

// Get authorized user
authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
