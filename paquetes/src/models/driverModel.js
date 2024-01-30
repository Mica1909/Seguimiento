// driverModel.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: String,
  vehicle: String,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Driver', driverSchema);
