const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { validateComment } = require("../utils/middleware");

const moduleInfo = require("../data/moduleInfo.json");
const majors = require("../data/majors.js");

const Module = require("../models/module");
const Comment = require("../models/comment");

// MOD SEARCH AND DISPLAY
router.get("/search", (req, res) => {
  res.redirect(`/modules/${req.query.q}`);
});

router.get(
  "/:moduleCode",
  catchAsync(async (req, res) => {
    const { moduleCode } = req.params;
    // Getting the specific module information from moduleInfo.json based on moduleCode
    const data = moduleInfo.filter(
      (module) => module.moduleCode === moduleCode.toUpperCase()
    )[0];
    if (!data) {
      //if module not found in json
      throw new AppError("Module Not Found", 404);
    }
    // Querying MongoDB for specific module properties based on moduleCode
    const comments = await Module.findByCode(moduleCode).populate("forum");
    res.render("module", { data, comments, majors });
  })
);

//FORUM CREATE,UPDATE AND DELETE
router.post(
  "/:moduleCode/comment",
  catchAsync(async (req, res) => {
    const { moduleCode } = req.params;
    const { comment } = req.body;
    const newComment = new Comment(comment);
    const module = await Module.findByCode(moduleCode);
    module.forum.push(newComment);
    await newComment.save();
    await module.save();
    req.flash("success", "Successfully posted your comment!");
    res.redirect(`/modules/${moduleCode}#forum`);
  })
);

router.get(
  "/:moduleCode/:commentId",
  catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    res.render("comment", { comment });
  })
);

router.put(
  "/:moduleCode/:commentId",
  catchAsync(async (req, res) => {
    const { moduleCode, commentId } = req.params;
    const newComment = await Comment.findByIdAndUpdate(commentId, {
      ...req.body.comment,
    });
    res.redirect(`/modules/${moduleCode}`);
  })
);

router.delete(
  "/:moduleCode/:commentId",
  catchAsync(async (req, res) => {
    const { moduleCode, commentId } = req.params;
    await Module.findOneAndUpdate(
      { code: moduleCode },
      { $pull: { forum: commentId } }
    );
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/modules/${moduleCode}`);
  })
);

module.exports = router;
