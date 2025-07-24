
const Products=require('../Models/Product')

const getproductCode=async(req,res)=>{
    try{
        const Autocode=await Products.countDocuments()
        const code=String(Autocode+1).padStart(3,'0')
        res.status(200).json({code})
    }
    catch(err){
        console.error("Code error");
        res.status(500).json({message:"Server Error"})
        
    }
}

exports.getproductCode=getproductCode