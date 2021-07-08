// IMPORTING RELEVANT MODULES
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.inkot.mongodb.net/noCap?retryWrites=true&w=majority`;
let PORT = process.env.PORT || 3000;

//const passport = require('passport');
//const LocalStrategy = require('passport-local');
//const flash = require('connect-flash');
//const session = require('express-session');

// IMPORT FUNCTIONS AND FILES
const Module = require("./models/module");
const moduleInfo = require("./data/moduleInfo.json");
const majors = require("./data/majors.js");
//const User = require('./models/user');
//const { isLoggedIn } = require('./utils/middleware');
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");

// Change dbURI to mongodb://localhost:27017/noCap if running it in local
// mongoose.connect(dbURI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

//CONNECTING TO MONGODB LOCALLY
mongoose.connect("mongodb://localhost:27017/noCap", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// SESSION CONFIGURATION
// const sessionConfig = {
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// // SETTING UP PASSPORT FOR AUTHENTICATION
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// app.use(flash());
// app.use(session(sessionConfig))

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// CONFIGURATIONS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARE OR FUNCTIONS
app.use(express.urlencoded({ extended: true })); //parsing req.body
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "static")));

// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.redirect("/");
});

app.get("/searchModules", (req, res) => {
  res.redirect(`/modules/${req.query.q}`);
});

app.get(
  "/modules/:moduleCode",
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
    const comments = await Module.findOne({ code: moduleCode.toUpperCase() });
    res.render("module", { data, comments, majors });
  })
);

app.post(
  "/modules/:moduleCode/newComment",
  catchAsync(async (req, res) => {
    const { moduleCode } = req.params;
    const { author, semester, major, body } = req.body;
    const module = await Module.findOne({ code: moduleCode.toUpperCase() });
    module.forum.push(req.body);
    module.save();
    res.redirect(`/modules/${moduleCode}#forum`);
  })
);

//USER ROUTES
app.get("/register", (req, res) => {
  res.render("user/register");
});

app.get("/login", (req, res) => {
  res.render("user/login");
});

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong!";
  res.render("error", { err });
});

// BINDS AND LISTENS FOR CONNECTION
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

module.exports = app;
