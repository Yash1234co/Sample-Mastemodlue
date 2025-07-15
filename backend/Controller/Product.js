const Products = require('../Models/Product');
const ProductCode = require('../Models/ProductCode');
const mongoose = require('mongoose');

// Create a new product
const createProducts = async (req, res) => {
  try {
    const {
      ProductName,
      Category,
      Brand,
      ProductType,
      autoGenerate,
      productCode
    } = req.body;

    // Validate required fields
    if (!ProductName || !Category || !Brand || !ProductType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let codeDoc;

    // Auto-generate product code
    if (autoGenerate) {
      const count = await ProductCode.countDocuments();
      const newCode = String(count + 1).padStart(3, '0');

      codeDoc = await new ProductCode({ code: newCode, status: 'used' }).save();
    } else {
      // Manual product code
      if (!productCode) {
        return res.status(400).json({ message: "Manual code is required" });
      }

      const exists = await ProductCode.findOne({ code: productCode });
      if (exists) {
        return res.status(400).json({ message: "Code already exists in database" });
      }

      codeDoc = await new ProductCode({ code: productCode, status: 'used' }).save();
    }

    // Create product document
    const newProduct = new Products({
      ProductName,
      Category,
      Brand: new mongoose.Types.ObjectId(Brand),
      ProductType: new mongoose.Types.ObjectId(ProductType),
      productCode: codeDoc._id,
    });

    await newProduct.save();

    res.status(200).json({ message: 'Product successfully created', product: newProduct });

  } catch (err) {
    console.error("Error in createProducts:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all or filtered products
const getproductrs = async (req, res) => {
  try {
    const { ProductName, Category, Brand, ProductType } = req.query;
    const filter = {};

    if (ProductName?.trim()) filter.ProductName = ProductName.trim();
    if (Category?.trim()) filter.Category = Category.trim();
    if (Brand?.trim()) filter.Brand = Brand.trim();
    if (ProductType?.trim()) filter.ProductType = ProductType.trim();

    const filteredData = await Products.find(filter)
      .populate('Brand', 'name')
      .populate('ProductType', 'name')
      .populate('productCode', 'code') // 👈 show readable product code
      .exec();

    res.status(200).json(filteredData);

  } catch (err) {
    console.error("Fetching error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createProducts = createProducts;
exports.getproductrs = getproductrs;
