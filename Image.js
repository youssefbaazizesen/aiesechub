
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  description: String,
  filename: String, // Store the filename in the database
});

module.exports = mongoose.model('Image', imageSchema);
