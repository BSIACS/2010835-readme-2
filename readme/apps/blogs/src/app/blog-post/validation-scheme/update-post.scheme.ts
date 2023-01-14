import Joi = require("joi");

export const updatePostValidationScheme = Joi.object({
  id: Joi.number().strict().required(),
  originUserId: Joi.string().optional(),
  postType: Joi.string().optional(),
  postState: Joi.string().optional(),
  isRepost: Joi.bool().optional(),
  name: Joi.string().optional(),                            //video, text
  videoLink: Joi.string().optional(),                       //video,
  announceText: Joi.string().optional(),                    //text,
  text: Joi.string().optional(),                            //text, quote, link
  author: Joi.string().optional(),                          //quote
  photo: Joi.string().optional(),                           //photo
  link: Joi.string().optional(),                            //link
  tags: Joi.array().items(Joi.string()).optional(),
});
