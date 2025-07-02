const mongoose=require('mongoose')
const Sample=require('./Sample')                            


const Commetns=new mongoose.Schema({
    Sample:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Sample',
    required:true
    },
    text:{type:String}

},{timestamps:true})

const commetns=mongoose.model('Comments',Commetns)

module.exports=commetns
