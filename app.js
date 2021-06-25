// IMPORTING RELEVANT MODULES
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
//const passport = require('passport');
//const LocalStrategy = require('passport-local');
//const flash = require('connect-flash');
//const session = require('express-session');
// IMPORT FUNCTIONS AND FILES
const Module = require('./models/module');
const moduleInfo = require('./moduleInfo.json')
//const User = require('./models/user');
//const { isLoggedIn } = require('./middleware');
//const catchAsync = require('./utils/catchAsync');

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

// SESSION CONFIGURATION
// const sessionConfig = {
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// // SETTING UP PASSPORT FOR AUTHENTICATION
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// app.use(flash());
// app.use(session(sessionConfig))

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// CONFIGURATIONS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


// MIDDLEWARE OR FUNCTIONS
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'static')));

// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })

// ROUTES
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/searchModules', (req, res) => {
    res.redirect(`/${req.query.q}`)
});

app.get('/:moduleCode', async (req, res) => {
    const { moduleCode } = req.params;
    // Getting the specific module information from moduleInfo.json based on moduleCode 
    const data = moduleInfo.filter(module => module.moduleCode === moduleCode.toUpperCase())[0]; 
    if (typeof data === undefined) {
        res.render('error')
    }
    // Querying MongoDB for specific module properties based on moduleCode
    const comments = await Module.findOne({code: moduleCode.toUpperCase()}); 
    res.render('module', {data, comments})
});

app.post('/:moduleCode/newComment', async (req, res) => {
    const { moduleCode } = req.params;
    const { author, semester, major, body } = req.body;
    const module = await Module.findOne({code: moduleCode.toUpperCase()});
    module.forum.push(req.body)
    module.save();
    res.redirect(`/${moduleCode}`)
})

// USER ROUTES
// app.get('/register', (req, res) => {
//     res.render('user/register');
// })

// app.post('/register', catchAsync(async (req, res, next) => {
//     try {
//         const { email, username, password } = req.body;
//         const user = new User({ email, username });
//         const registeredUser = await User.register(user, password);
//         req.login(registeredUser, err => {
//             if (err) return next(err);
//             req.flash('success', 'Sucessfully Registered!');
//             res.redirect('/');
//         })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('/register');
//     }
// }));

// app.get('/login', (req, res) => {
//     res.render('users/login');
// })

// app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'Successfully Logged In!');
//     const redirectUrl = req.session.returnTo || '/';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// })

// app.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', "Successfully Logged Out!");
//     res.redirect('/');
// });



// BINDS AND LISTENS FOR CONNECTION
app.listen(3000, () => {
    console.log('Serving on port 3000')
});