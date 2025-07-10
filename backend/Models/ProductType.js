const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{type:String}

},{timestamps:true})

const ProductType=mongoose.model('ProductType',productSchema)

module.exports=ProductType