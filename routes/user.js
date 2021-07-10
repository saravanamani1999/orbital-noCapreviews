const express = require("express");
const router = express.Router();

const passport = require("passport");
const LocalStrategy = require("passport-local");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {
  validateComment,
  isLoggedIn,
  isAuthor,
} = require("../utils/middleware");

const moduleInfo = require("../data/moduleInfo.json");
const majors = require("../data/majors.js");
const User = require("../models/user");

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("user/profile", { majors });
});

router.put(
  "/profile",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { user } = req.body;
    const updatedUser = await User.findByIdAndUpdate(user._id, { ...user });
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    req.flash("success", "Successfully updated your major");
    res.redirect(redirectUrl);
  })
);

router.get("/register", (req, res) => {
  res.render("user/register", { majors });
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password, major } = req.body;
      const user = new User({ email, username, major });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Successfully registered!");
        const redirectUrl = req.session.returnTo || "/";
        delete req.session.returnTo;
        res.redirect(redirectUrl);
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/user/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/user/login",
  }),
  (req, res) => {
    req.flash("success", "Successfully logged in!");
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out!");
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

module.exports = router;
