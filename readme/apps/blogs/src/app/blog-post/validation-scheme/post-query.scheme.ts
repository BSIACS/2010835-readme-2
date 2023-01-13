import Joi = require("joi");

export const postQueryValidationScheme = Joi.object({
  limit: Joi.number().optional(),
  userId: Joi.string().optional(),
  postType: Joi.string().optional(),
  postTag: Joi.string().optional(),
  sortBy: Joi.string().optional(),
  sortDirection: Joi.string().optional(),
  page: Joi.number().optional(),
})
