const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: String,
  description: String,
  isWeekly: Boolean, // true for weekly goals, false for daily goals
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', goalSchema);
