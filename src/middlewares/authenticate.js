const adminService = require("../services/admin-service");
const jwtService = require("../services/jwt-service");
const riderService = require("../services/rider-service");
const userService = require("../services/user-service");

const authenticate = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "unauthorized access" });
  }

  const accessToken = authorization.split(" ")[1];
  const payload = jwtService.verify(accessToken);
  try {
    // Check if customer
    if (payload.user.role === "customer") {
      const user = await userService.findCustomerById(payload.user.id);
      if (!user) {
        res.status(400).json({ message: "user not found" });
      }
      delete user.password;

      req.user = user;

      next();
    }

    // Check if rider
    if (payload.user.role === "rider") {
      const user = await riderService.findRiderById(payload.user.id);
      if (!user) {
        res.status(400).json({ message: "user not found" });
      }
      delete user.password;

      req.user = user;

      next();
    }

    // Check if admin
    if (payload.user.role === "admin") {
      const user = await adminService.findAdminById(payload.user.id);
      if (!user) {
        res.status(400).json({ message: "user not found" });
      }
      delete user.password;

      req.user = user;
      next();
    }
    res.status(400).json({ message: "user not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
