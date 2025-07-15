const ProductType = require('../Models/ProductType')

const addproductType = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.length===0) {
            return res.status(400).json({ messag: "filed ProductType" })
        }

        const newProductType = new ProductType({
            name:req.body.name
        })
        const saveproductType = await newProductType.save()
        res.status(200).json({ message: "ProductType create Sucessfully", ProductTypes: saveproductType })
    }
    catch (err) {
        console.error("error in productType");
        res.status(500).json({ message: "Server Error", error: err.message })

    }

}

const getProducts = async (req, res) => {
    try {
        const { name } = req.query;
        const filter = {}

        if (name && name.trim()) name.productType = name.trim()

        const filteredata = await ProductType.find(filter)
        res.status(200).json(filteredata)

    }
    catch(err){
        console.error("fetching error");
        res.status(500).json({message:"Server error"})

        
    }
}

exports.addproductType=addproductType
exports.getProducts=getProducts