const util = require('util');
const express = require('express');
const router = express.Router();
const entries = require('../models/entries-memory');

// Add new Diary Entry
router.get('/add', (req, res, next) => {
    res.render('entryedit', {
        title: "My day",
        docreate: true,
        entrydate: "",
        entry: undefined
    });
});

// Save Diary Entry
router.post('/save', async (req, res, next) => {
    var diaryEntry;
    if (req.body.docreate === 'create') {
        diaryEntry = await entries.create(req.body.date,
            req.body.title, req.body.content);
    } else {
        diaryEntry = await entries.update(req.body.date,
            req.body.title, req.body.content);
    }
    res.redirect('/entry/view?date=' + req.body.date);
});

// Read Diary Entry
router.get('/view', async (req, res, next) => {
    var diaryEntry = await entries.read(req.query.date);
    res.render('entryview', {
        title: diaryEntry ? diaryEntry.title : "",
        date: req.query.date,
        entry: diaryEntry
    });
});

module.exports = router;