import Joi = require("joi");

export const createRepostValidationScheme = Joi.object({
  id: Joi.number().strict().required(),
});
