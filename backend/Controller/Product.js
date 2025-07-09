const Products = require('../Models/Product');
const Category=require('../Models/Category')


const createProducts = async (req, res) => {
  try {
    const { ProductName, Category, Brand, ProductType, autoGenerate } = req.body;

    if (!ProductName || !Category || !Brand ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let productCode;

    if (autoGenerate) {
      const totalCount = await Products.countDocuments();
      productCode = String(totalCount + 1).padStart(3, '0');
    }

    const newProduct = new Products({
      ProductName,
      Category,
      Brand,
      ProductType,
      ...(autoGenerate && { productCode }) 
    });

    await newProduct.save();

    res.status(200).json({ message: 'Product successfully created', product: newProduct });

  } catch (err) {
    console.error("Error in createProducts:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const getproductrs = async (req, res) => {
  try {
    const { ProductName, Category, Brand, ProductType } = req.query;
    const filter = {};

    if (ProductName?.trim()) filter.ProductName = ProductName.trim();
    if (Category?.trim()) filter.Category = Category.trim();
    if (Brand?.trim()) filter.Brand = Brand.trim();
    if (ProductType?.trim()) filter.ProductType = ProductType.trim();

    const filteredData = await Products.find(filter);
    res.status(200).json(filteredData);
  } catch (err) {
    console.error("Fetching error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getCategories=async(req,res)=>{
    try{
      const Categories=await Category.find().sort({name:1})
      res.status(200).json(Categories)
}
catch(err){
console.error("server error");
res.status(500).json({message:"Featching Error",error:err.message})
}
}
exports.getCategories=getCategories
exports.createProducts=createProducts
exports.getproductrs=getproductrs