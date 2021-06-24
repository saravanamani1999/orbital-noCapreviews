const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Forum = require('./models/forum');
const moduleInfo = require('./moduleInfo.json')


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

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/modules', (req, res) => {
    res.send("all modules are displayed here")
});

app.get('/modules/:moduleCode', (req, res) => {
    const { moduleCode } = req.params;
    const data = moduleInfo.filter(module => module.moduleCode === moduleCode.toUpperCase())[0];
    res.render('module', {data})
});


app.listen(3000, () => {
    console.log('Serving on port 3000')
});