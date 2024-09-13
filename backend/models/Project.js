const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  description: String,
  notes: String,
  status: { type: String, enum: ['Completed', 'Ongoing', 'Planned'] },
  githubLink: String,
  liveLink: String
});

module.exports = mongoose.model('Project', projectSchema);
