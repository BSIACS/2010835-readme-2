import Joi = require("joi");

export const updateCommentValidationScheme = Joi.object({
  postId: Joi.number().strict(true).required(),
  text: Joi.string().required().min(10).max(300),
  userId: Joi.string().required(),
});
