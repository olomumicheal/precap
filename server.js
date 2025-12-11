require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');

// Database connection
const connectDB = require('./config/db');
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // make sure this is configured when ready
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Make session available in templates
app.use((req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});

// EJS
app.set('view engine', 'ejs');

// ROUTES — make sure users.js exports a router
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/users', require('./routes/users'));
// app.use('/', require('./routes/notes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
