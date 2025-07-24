const Brand = require('../Models/Brand')

const AddBrand = async (req, res) => {
  try {
    let { name, shortname } = req.body;

    
    name = name?.trim();
    shortname = shortname?.trim();

    
    if (!name || name.length === 0) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    


    const newBrand = new Brand({ name, shortname });

    const saveBrand = await newBrand.save();

    return res.status(200).json({
      message: "Brand created successfully",
      createBrand: saveBrand,
    });
  } catch (err) {
    console.error("Error creating brand:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getBrands = async (req, res) => {
    try {
        const { name,shortname } = req.query;
        const filter = {}

        if (name && name.trim()) filter.name = name.trim()
        if(shortname && shortname.trim()) filter.shortname=shortname.trim()
        const filterdata = await Brand.find(filter)
        res.status(200).json(filterdata)

    }
    catch (err) {
        console.error("fecthing error");
        res.status(500).json({ message: "Server Error" }

        )

    }
}

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { shortname } = req.body;

    const brand = await Brand.findByIdAndUpdate(
      id,
      { shortname },
      { new: true, runValidators: true }
    );

    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    res.json({ success: true, brand });
  } catch (err) {
    console.error("Update Brand Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.AddBrand = AddBrand
exports.getBrands = getBrands
exports.updateBrand = updateBrand