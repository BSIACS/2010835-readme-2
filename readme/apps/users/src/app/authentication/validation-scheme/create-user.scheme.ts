import Joi = require("joi");
import { NameValidLength, PasswordValidLength } from "./user-validation.constants";

export const createUserValidationScheme = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required().min(NameValidLength.MIN).max(NameValidLength.MAX),
  surname: Joi.string(),
  password: Joi.string().required().min(PasswordValidLength.MIN).max(PasswordValidLength.MAX),
});
