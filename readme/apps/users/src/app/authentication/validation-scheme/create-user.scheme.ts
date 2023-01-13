import Joi = require("joi");

export const createUserValidationScheme = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required().min(3).max(50),
  surname: Joi.string(),
  password: Joi.string().required().min(6).max(12),
});
