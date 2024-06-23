const Joi = require("joi");

const authValidation = {};

authValidation.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  emailOrPhone: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ])
    .required()
    .strip(),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{8, }$/),
  confirmPassword: Joi.string().valid(Joi.ref("password")).strip(),
  email: Joi.forbidden().when("emailOrPhone", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
  phone: Joi.forbidden().when("emailOrPhone", {
    is: Joi.string().pattern(/^[0-9]{10$}/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
});

authValidation.loginSchema = Joi.object({
  emailOrPhone: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = authValidation;
