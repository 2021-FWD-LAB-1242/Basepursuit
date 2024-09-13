const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new resource
router.post('/', async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        await newResource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a resource
router.delete('/:id', async (req, res) => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Resource deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
