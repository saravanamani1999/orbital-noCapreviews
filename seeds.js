const mongoose = require("mongoose");
const Module = require("./models/module");
const Comment = require("./models/comment");
const moduleInfo = require("./data/moduleInfo.json");
const dotenv = require("dotenv");
dotenv.config();

const dbURI = `${process.env.dbURI}` || "mongodb://localhost:27017/noCap";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// mongoose.connect("mongodb://localhost:27017/noCap", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  // Remove all collections in Module collection in mongoDB
  await Module.deleteMany({});
  // Initiate all modules with moduleCode and dummy values to ratings and empty list for comments/forum
  for (m of moduleInfo) {
    const dummyModule = new Module({
      code: m.moduleCode,
      ratings: {
        difficulty: 3,
        workload: 4,
        teachingStaff: 4,
        overallExp: 4,
      },
    });
    await dummyModule.save();
  }
};

const seedComment = async () => {
  // Remove all Comments in mongoDB
  await Comment.deleteMany({});
  // Create two sample comments add into CS1010S
  const comment1 = new Comment({
    author: "wuchuan",
    semester: "AY 20/21 Sem 2",
    major: "Business Analytics",
    body: "I enjoyed this module very much! The teaching staff were super helpful in clarifying my doubts",
  });
  const comment2 = new Comment({
    author: "mani",
    semester: "AY 20/21 Sem 1",
    major: "Life Science",
    body: "This module was so difficult to handle i dont think i can take anymore",
  });
  const cs1010s = await Module.findByCode("cs1010s");
  cs1010s.forum.push(comment1, comment2);
  await comment1.save();
  await comment2.save();
  await cs1010s.save();
};

// Debugging Code
// const test = async () => {
//   await Module.findOneAndUpdate(
//     { code: "CS1010S" },
//     { $pull: { forum: "60e69adc9733ea3f5c40de9e" } }
//   );
// };

seedDB().then(() => {
  seedComment().then(() => {
    console.log("seed finished running");
    mongoose.connection.close();
  });
});
