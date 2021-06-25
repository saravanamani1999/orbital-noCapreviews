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
                overallExp: 4
            },
            forum: [{
                author: "Khoo Wu Chuan",
                semester: "AY 20/21 Sem 2",
                major: "Business Analytics",
                body: "This module sucks :("
            },{
                author: "Mani",
                semester: "AY 20/21 Sem1",
                major: "Life Science",
                body: "This module is great!"
            }]
        });
        await dummyModule.save()
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})
