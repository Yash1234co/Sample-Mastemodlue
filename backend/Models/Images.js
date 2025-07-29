const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    Sample: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sample'
       
    },
   Products:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Products'
   },
    filename: { type: String },
    path: { type: String },
    uploadAt: {
        type: Date,
        default: Date.now,
    }

})

const Images = mongoose.model('images', imageSchema)
module.exports = Images;