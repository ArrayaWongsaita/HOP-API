const Joi = require("joi");

const authValidation = {};

authValidation.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().required().email({ tlds: false }),
  phone: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{8,}$/),
  confirmPassword: Joi.string().valid(Joi.ref("password")).strip(),
});

authValidation.loginSchema = Joi.object({
  emailOrPhone: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = authValidation;
