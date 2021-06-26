const mongoose = require('mongoose');
const Module = require('./models/module');
const moduleInfo = require('./moduleInfo.json')

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

const seedDB = async() => {
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
                overallExp: 4
            },
            forum: []
        });
        await dummyModule.save()
    }
}

const seedModule = async() => {
    const cs1010s = await Module.findOne({ code: "CS1010S" });
    cs1010s.forum.push({
        author: "Khoo Wu Chuan",
        semester: "AY 20/21 Sem 2",
        major: "Business Analytics",
        body: "Delivery of module is quite different from other modules as it uses the concept of gamification through the Coursemology Platform. Made it less boring to complete the missions and assignments. Workload is pretty heavy with all the missions and consistent effort is definitely needed to do well in this module. Teaching staff are patient and generally willing to help anyone clear their doubts. I agree with the overall sentiment of this module but those with prior experience with python or programming in general would definitely find the module to be easier than the overall sentiment."
    }, {
        author: "Mani",
        semester: "AY 20/21 Sem1",
        major: "Life Science",
        body: "It was meant to be an introductory module to programming in python. As a beginner in python programming, I struggled a lot at the start of the module but thanks to the helpful professors and TAs i managed to keep up with the content. Overall it was a good experience and I would recommend you to take this if youre interested in python programming. The overall sentiments are in line with what i felt about this module."
    })
    await cs1010s.save();
}

seedDB().then(() => {
    seedModule().then(() => {
        console.log("seed finished running")
        mongoose.connection.close();
    })
})
