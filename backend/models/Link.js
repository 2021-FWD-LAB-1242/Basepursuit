const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    label: { type: String, required: true },
    url: { type: String, required: true }
});

module.exports = mongoose.model('Link', linkSchema);
