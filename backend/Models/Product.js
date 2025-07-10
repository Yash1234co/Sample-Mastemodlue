const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    ProductName: { type: String },
    Category: {type:String},
    Brand:{type:mongoose.Schema.Types.ObjectId,ref:'Brand'},
    ProductType:{type:mongoose.Schema.Types.ObjectId,ref:'ProductType'},
     productCode: {
    type: String,
    unique: true,
    sparse:true
  }

},{timestamps:true})

const Products = mongoose.model('Products', productSchema)

module.exports = Products