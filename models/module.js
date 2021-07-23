const mongoose = require("mongoose");
const Comment = require("./comment");
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  ratings: {
    difficulty: Number,
    workload: Number,
    teachingStaff: Number,
    overallExp: Number,
  },
  forum: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

moduleSchema.statics.findByCode = function (moduleCode) {
  return this.findOne({ code: moduleCode.toUpperCase() });
};

// const Module = mongoose.model("Module", moduleSchema);

// Module.findByCode("cs1010s").then((res) => {
//   console.log(res);
// });

module.exports = mongoose.model("Module", moduleSchema);
