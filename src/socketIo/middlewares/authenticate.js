const adminService = require("../../services/admin-service");
const jwtService = require("../../services/jwt-service");
const riderService = require("../../services/rider-service");
const userService = require("../../services/user-service");

const socketIoAuthenticate = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Unauthorized access"));
    }
    const payload = jwtService.verify(token);
    if (payload.user.role === "customer") {
      const user = await userService.findCustomerById(payload.user.id);
      if (!user) {
        next(new Error("user not found"));
      }
      delete user.password;
      user.role = payload.user.role.toUpperCase();
      socket.user = user;
      return next();
    }

    // Check if rider
    if (payload.user.role === "rider") {
      const user = await riderService.findRiderById(payload.user.id);
      if (!user) {
        next(new Error("user not found"));
      }
      delete user.password;
      user.role = payload.user.role.toUpperCase();
      socket.user = user;
      return next();
    }

    // Check if admin
    if (payload.user.role === "admin") {
      const user = await adminService.findAdminById(payload.user.id);
      if (!user) {
        next(new Error("user not found"));
      }
      delete user.password;
      user.role = payload.user.role.toUpperCase();
      socket.user = user;
      return next();
    }
    next(new Error("user not found"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = socketIoAuthenticate;
