const mongoose = require('mongoose');
const Module = require('./models/module');

// CONNECTING TO MONGODB
mongoose.connect('mongodb://localhost:27017/noCap', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Seed sample data

const comments = [{
    author: "Khoo Wu Chuan",
    semester: "AY 20/21 Sem 2",
    major: "Business Analytics",
    body: "This module sucks :("
}, {
    author: "Mani",
    semester: "AY 20/21 Sem1",
    major: "Life Science",
    body: "This module is great!"
}]

const seedDB = async () => {
    await Module.deleteMany({});
    const module = new Module({
        code: "CS1010S",
        ratings: {
            difficulty: 3,
            workload: 4,
            teachingStaff: 4,
            overallExp: 4
        },
        forum: comments
    })
    await module.save();
    console.log(module)
}

seedDB();