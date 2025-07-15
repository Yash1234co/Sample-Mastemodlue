const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{type:String,
        trim:true,
        unique:true
    }

},{timestamps:true})

const ProductType=mongoose.model('ProductType',productSchema)

module.exports=ProductType