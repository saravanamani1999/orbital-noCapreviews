const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
    moduleCode: String,
    ratings: {
        difficulty: Number,
        workload: Number,
        teachingStaff: Number,
        overallExp: Number
    } ,
    forum: [
        {type: Schema.Types.ObjectId, ref: 'Comment'}
    ]
})

const CommentSchema = new Schema({
    author: String,
    semester: String,
    major: String,
    body: String
})

const Module = mongoose.model('Module', ModuleSchema);
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Module;
module.exports = Comment;