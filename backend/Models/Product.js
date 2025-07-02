const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    ProductName:{type:String},
    Category:{type:String},
    Brand:{type:String},
    Product:{type:String},
    productCode:{
        type:String,
        unique:true
    }

})

const Products=mongoose.model('Products',productSchema)

module.exports=Products