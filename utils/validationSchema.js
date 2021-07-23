const Joi = require("joi");

module.exports.commentSchema = Joi.object({
  review: Joi.object({
    author: Joi.string().required(),
    semester: Joi.string().required(),
    major: Joi.string().valid().required(),
    body: Joi.string().required(),
  }).required(),
});
