const Products = require('../Models/Product')

const createProducts = async (req, res) => {
    try {
        const { ProductName, Category, Brand, ProductType } = req.body

        if (!ProductName || !Category || !Brand || !ProductType) {
            return res.status(400).json({ message: 'All field are require' })
        }
        const codenumber = await Products.findOne().sort({ productCode: -1 })

        codenumber = '001'
        if (codenumber && codenumber.productCode) {
            const lastCodenumber = parseInt(codenumber.productCode.replace('PRD', ''))
            const nextcodenumber = lastCodenumber + 1
            codenumber = String(nextcodenumber).padStart(3, '0')
        }

        const newProduct = new Products({ ProductName, Category, Brand, ProductType, })
        await newProduct.save()

        res.status(200).json({ message: "Product are sucessfully created", Product: newProduct })
    }
    catch (err) {
        console.error("somthing Worng in code");
        res.status(500).json({ message: "Server error", error: err.message })
    }

}



const getproductrs = async (req, res) => {
    try {
        const { ProductName, Category, Brand, ProductType } = req.query
        const filter = {}

        if (ProductName && ProductName.trim()) filter.ProductName = ProductName.trim()
        if (Category && Category.trim()) filter.Category = Category.trim()
        if (Brand && Brand.trim()) filter.Brand = Brand.trim()
        if (ProductType && ProductType.trim()) filter.ProductType.trim()

        const filtredData = await Products.find(filter)

        console.log("filter are used", filter)
        console.log("Data get sucessfully", filtredData)

        res.status(200).json({ filtredData })

    }
    catch (err) {
        console.error("fecthig error");
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

exports.createProducts = createProducts
exports.getproductrs=getproductrs