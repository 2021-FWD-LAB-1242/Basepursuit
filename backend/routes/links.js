const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Get all links
router.get('/', async (req, res) => {
    try {
        const links = await Link.find();
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new link
router.post('/', async (req, res) => {
    try {
        const newLink = new Link(req.body);
        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a link
router.delete('/:id', async (req, res) => {
    try {
        await Link.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Link deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
