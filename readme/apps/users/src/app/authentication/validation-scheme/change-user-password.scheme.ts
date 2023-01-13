import Joi = require("joi");

export const changeUserPasswordValidationScheme = Joi.object({
  newPassword: Joi.string().required().min(6).max(12),
  oldPassword: Joi.string().required(),
});
