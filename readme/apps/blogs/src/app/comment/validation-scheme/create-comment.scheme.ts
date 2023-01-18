import Joi = require("joi");
import { CommentTextValidLength } from "./comment-validation.constants";

export const createCommentValidationScheme = Joi.object({
  postId: Joi.number().strict(true).required(),
  text: Joi.string().required().min(CommentTextValidLength.MIN).max(CommentTextValidLength.MAX),
  userId: Joi.string().required(),
});
