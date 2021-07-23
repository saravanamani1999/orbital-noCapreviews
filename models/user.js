const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  major: {
    type: String,
    required: true,
  },
});
UserSchema.plugin(passportLocalMongoose);

UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("A user with the given email is already registered"));
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
