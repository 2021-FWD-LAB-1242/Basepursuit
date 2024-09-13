const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// POST route to add a new company
router.post('/', async (req, res) => {
  try {
    const { name, status, referral, appliedDate, roleDetails, jobUrl, campusType } = req.body;
    const company = new Company({ name, status, referral, appliedDate, roleDetails, jobUrl, campusType });
    await company.save();
    res.status(201).json(company);
  } catch (e) {
    console.error('Failed to add company:', e.message);
    res.status(400).json({ error: 'Failed to add company', details: e.message });
  }
});


// GET route to fetch all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch companies', details: e.message });
  }
});

// DELETE route to delete a company
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.status(200).json(company);
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete company', details: e.message });
  }
});

module.exports = router;
