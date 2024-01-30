// packageModel.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true },
  content: String,
  weight: Number,
  origin: String,
  destination: String,
});

module.exports = mongoose.model('Package', packageSchema);
