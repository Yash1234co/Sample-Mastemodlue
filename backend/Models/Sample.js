const mongoose = require('mongoose')

const sampleSchema = new mongoose.Schema({
    SampleRef: { type: String },
    DueDate: { type: Date, default: Date.now },
    SupplierType: { type: String },
    Supplier: { type: String },
    

},{timestamps:true})
const Sample = mongoose.model('Sample', sampleSchema)

module.exports = Sample;