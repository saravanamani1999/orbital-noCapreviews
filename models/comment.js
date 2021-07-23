const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: String,
  semester: String,
  major: String,
  body: String,
});

module.exports = mongoose.model("Comment", commentSchema);
