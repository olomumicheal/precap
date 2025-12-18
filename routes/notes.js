const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

// Middleware to check if user is authenticated
function isAuth(req, res, next) {
    if (!req.session.userId) return res.redirect('/users/login');
    next();
}

// Dashboard: list notes
router.get('/', isAuth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.session.userId }).sort({ createdAt: -1 });
        res.render('index', { notes }); // <- render index.ejs
    } catch (err) {
        console.error(err);
        res.render('index', { notes: [], error: 'Failed to load notes' });
    }
});

// Create Note page
router.get('/create', isAuth, (req, res) => res.render('createNote'));

router.post('/create', isAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.render('createNote', { error: 'Title and content are required' });
        }
        await Note.create({ title, content, user: req.session.userId });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('createNote', { error: 'Failed to create note' });
    }
});

// Edit Note
router.get('/edit/:id', isAuth, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.session.userId });
        if (!note) return res.redirect('/');
        res.render('editNote', { note });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.put('/edit/:id', isAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.redirect(`/edit/${req.params.id}`);
        await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.session.userId },
            { title, content }
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Delete Note
router.delete('/delete/:id', isAuth, async (req, res) => {
    try {
        await Note.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

module.exports = router;
