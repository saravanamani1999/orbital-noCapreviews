// IMPORTING RELEVANT MODULES AND FILES
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
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

// CONFIGURATIONS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


// MIDDLEWARE OR FUNCTIONS
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'static')));

// ROUTES
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/searchModules', (req, res) => {
    res.redirect(`/${req.query.q}`)
});

app.get('/:moduleCode', async (req, res) => {
    const { moduleCode } = req.params;
    console.log(moduleCode)
    const data = moduleInfo.filter(module => module.moduleCode === moduleCode.toUpperCase())[0]; // Getting the specific module information from moduleInfo.json based on moduleCode 
    const comments = await Module.findOne({code: moduleCode.toUpperCase()});
    res.render('module', {data, comments})
});



// BINDS AND LISTENS FOR CONNECTION
app.listen(3000, () => {
    console.log('Serving on port 3000')
});