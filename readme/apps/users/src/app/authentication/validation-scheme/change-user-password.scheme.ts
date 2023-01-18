import Joi = require("joi");
import { PasswordValidLength } from "./user-validation.constants";

export const changeUserPasswordValidationScheme = Joi.object({
  newPassword: Joi.string().required().min(PasswordValidLength.MIN).max(PasswordValidLength.MAX),
  oldPassword: Joi.string().required(),
});
