const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  checked: { type: Boolean, default: false }
});

const interviewSchema = new mongoose.Schema({
  company: { type: String, required: true },
  date: { type: Date, required: true },
  checklist: [checklistItemSchema],
  resources: { type: String }
});

module.exports = mongoose.model('Interview', interviewSchema);
