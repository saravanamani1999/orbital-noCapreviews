const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
    code: String,
    ratings: {
        difficulty: Number,
        workload: Number,
        teachingStaff: Number,
        overallExp: Number
    },
    forum: [{
        _id: false,
        author: String,
        semester: String,
        major: String,
        body: String
    }]
})

const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;