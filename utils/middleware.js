const Joi = require("joi");
const { commentSchema } = require("./validationSchema");
const AppError = require("./appError");
const Comment = require("../models/comment");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in first!");
    return res.redirect("/user/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { moduleCode, commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (comment.author.trim() === req.user.username.trim()) {
    return next();
  }
  console.log("permission denied");
  req.flash("error", "You do not have permission to do that");
  return res.redirect(`/modules/${moduleCode}`);
};

module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};
