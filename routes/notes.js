const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

// Middleware to check if user is authenticated
function isAuth(req, res, next){
    if(!req.session.userId) return res.redirect('/users/login');
    next();
}

// Dashboard list notes
router.get('/', isAuth, async (req, res) => {
    const notes = await Note.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.render('dashboard', { notes });
});

// Create Note page
router.get('/create', isAuth, (req, res) => res.render('createNote'));
router.post('/create', isAuth, async (req, res) => {
    const { title, content } = req.body;
    await Note.create({ title, content, user: req.session.userId });
    res.redirect('/');
});

// Edit Note
router.get('/edit/:id', isAuth, async (req, res) => {
    const note = await Note.findOne({_id: req.params.id, user: req.session.userId});
    if(!note) return res.send('Note not found or authorised');
    res.render('editNote', { note });
});

router.put('/edit/:id', isAuth, async (req, res) => {
    const { title, content } = req.body;
    await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.session.userId },
        { title, content }
    );
    res.redirect('/');
});

// Delete Note
router.delete('/delete/:id', isAuth, async (req, res) => {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
    res.redirect('/');
});

module.exports = router;