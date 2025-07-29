const ProductType = require('../Models/ProductType')

const addproductType = async (req, res) => {
    try {
        let { name ,shortname} = req.body;

        name=name?.trim()
        shortname=shortname?.trim()

        if (!name || name.length===0) {
            return res.status(400).json({ messag: "filed ProductType" })
        }

        if(!shortname || shortname.length === 0){
            shortname=name.slice(0,2).toUpperCase()
        }
        const newProductType = new ProductType({
            name:req.body.name,
            shortname:req.body.shortname
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
        const { name, shortname } = req.query;
        const filter = {}

        if (name && name.trim()) filter.name = name.trim()
        if (shortname && shortname.trim()) filter.shortname = shortname.trim()

        const filteredata = await ProductType.find(filter)
        res.status(200).json(filteredata)

    }
    catch(err){
        console.error("fetching error");
        res.status(500).json({message:"Server error"})

        
    }
}
const updateProductType = async (req, res) => {
    try {
        const productType = await ProductType.findByIdAndUpdate(
            req.params.id,
            { shortname: req.body.shortname },
            { new: true }
        );
        res.json({ success: true, productType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.addproductType=addproductType
exports.getProducts=getProducts
exports.updateProductType=updateProductType