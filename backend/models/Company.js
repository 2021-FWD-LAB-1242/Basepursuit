const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  status: String,
  referral: String,
  appliedDate: Date,
  roleDetails: String,
  jobUrl: String,
  campusType: String // 'off-campus' or 'on-campus'
});

module.exports = mongoose.model('Company', companySchema);
