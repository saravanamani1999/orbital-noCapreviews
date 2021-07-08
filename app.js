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

const modules = require("./routes/modules");

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

// CONFIGURATIONS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARE OR FUNCTIONS
app.use(express.urlencoded({ extended: true })); //parsing req.body
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "static")));

// ROUTING
app.use("/modules", modules);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.redirect("/");
});

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
