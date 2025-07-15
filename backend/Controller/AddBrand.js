const Brand = require('../Models/Brand')

const AddBrand = async (req, res) => {
    try {
        const { name } = req.body

        if (!name || name.length===0 ) {
            return res.status(400).json({ message: "Add Brand Filed" })
        }
        const newBrand = new Brand({
            name:req.body.name
        })
        const saveBrand = await newBrand.save()
        res.status(200).json({ message: "Brand Created Sucessfully", createBrand: saveBrand })
    }
    catch (err) {
        console.error("Brand createing error", err);
        res.status(500).json({ message: "Server error", error: err.message })

    }
}

const getBrands = async (req, res) => {
    try {
        const { name } = req.query;
        const filter = {}

        if (name && name.trim()) filter.name = name.trim()
        const filterdata = await Brand.find(filter)
        res.status(200).json(filterdata)

    }
    catch (err) {
        console.error("fecthing error");
        res.status(500).json({ message: "Server Error" }

        )

    }
}


exports.AddBrand = AddBrand
exports.getBrands = getBrands