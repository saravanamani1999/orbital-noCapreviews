const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    module: String,
    comment: String
});

module.exports = mongoose.model('Forum', ForumSchema);