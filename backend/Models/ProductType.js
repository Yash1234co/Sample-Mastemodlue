const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{type:String,
        trim:true,
        unique:true
    },
    shortname:{
        type:String
    }

},{timestamps:true})

const ProductType=mongoose.model('ProductType',productSchema)

module.exports=ProductType