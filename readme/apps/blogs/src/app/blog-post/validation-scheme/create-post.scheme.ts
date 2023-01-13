import Joi = require("joi");

export const createPostValidationScheme = Joi.object({
  id: Joi.number().required(),
  originPostId: Joi.number().required(),
  userId: Joi.string().required(),
  originUserId: Joi.string().optional(),
  postType: Joi.string().required(),
  postState: Joi.string().required(),
  isRepost: Joi.bool().required(),
  name: Joi.string().optional(),                            //video, text
  videoLink: Joi.string().optional(),                       //video,
  announceText: Joi.string().optional(),                    //text,
  text: Joi.string().optional(),                            //text, quote, link
  author: Joi.string().optional(),                          //quote
  photo: Joi.string().optional(),                           //photo
  link: Joi.string().optional(),                            //link
  tags: Joi.array().items(Joi.string()).optional(),
});
