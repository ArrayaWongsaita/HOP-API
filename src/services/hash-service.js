const bcrypt = require("bcryptjs");

const hashService = {};

hashService.hash = (password) => {
  return bcrypt.hash(password, 12);
};

hashService.compare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = hashService;
