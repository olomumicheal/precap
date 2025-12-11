const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET Signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        req.session.userId = user._id;

        res.redirect('/');
    } catch (err) {
        res.send("Error: " + err.message);
    }
});


// GET Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials");

    req.session.userId = user._id;
    res.redirect('/');
});


// LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
