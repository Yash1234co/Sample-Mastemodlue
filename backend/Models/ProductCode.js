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
  ,
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  productType: { type: mongoose.Schema.Types.ObjectId, ref: "ProductType" },
}, {
  timestamps: true
});

const ProductCode = mongoose.model('ProductCode', productCodeSchema);

module.exports = ProductCode;


// const mongoose = require('mongoose');

// const productCodeSchema = new mongoose.Schema(
//   {
//     code: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     status: {
//       type: String,
//       enum: ['used', 'available'],
//       default: 'used'
//     },
//     brand: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Brand',
//       required: true
//     },
//     productType: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'ProductType',
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// const ProductCode = mongoose.model('ProductCode', productCodeSchema);
// module.exports = ProductCode;
