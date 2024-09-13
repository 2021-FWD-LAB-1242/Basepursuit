const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// GET all interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET interview by ID
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new interview
router.post('/', async (req, res) => {
  try {
    // Ensure that checklist is an array
    const interview = new Interview({
      company: req.body.company,
      date: req.body.date,
      checklist: req.body.checklist || [], // Default to an empty array if not provided
      resources: req.body.resources
    });
    await interview.save();
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an interview
router.delete('/:id', async (req, res) => {
  try {
    const result = await Interview.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Interview not found' });
    res.status(200).json({ message: 'Interview deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH to update an interview (e.g., to update the checklist)
router.patch('/:id', async (req, res) => {
  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedInterview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.status(200).json(updatedInterview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
