const mongoose = require('mongoose');

const productCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['used', 'available'],
    default: 'used'
  }
}, {
  timestamps: true
});

const ProductCode = mongoose.model('ProductCode', productCodeSchema);

module.exports = ProductCode;
