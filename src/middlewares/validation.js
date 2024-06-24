const authValidation = require("../validators/auth-validator");

const validation = {};

validation.registerValidation = (req, res, next) => {
  const { value, error } = authValidation.registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;
  next();
};

validation.loginValidation = (req, res, next) => {
  const { value, error } = authValidation.loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;
  next();
};

module.exports = validation;
