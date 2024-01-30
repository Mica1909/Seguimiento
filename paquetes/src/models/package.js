const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  trackingNumber: String,
  content: String,
  weight: Number,
  origin: String,
  destination: String,
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
