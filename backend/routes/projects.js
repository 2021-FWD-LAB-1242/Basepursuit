const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Add project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

module.exports = router;
