const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// POST route to add a new goal
router.post('/', async (req, res) => {
  try {
    const { title, isWeekly } = req.body;
    const newGoal = new Goal({ title, isWeekly });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add goal' });
  }
});

// GET route to fetch all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

// DELETE route to delete a specific goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.status(200).json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
});

module.exports = router;
