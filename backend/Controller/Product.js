



// const Products = require('../Models/Product');
// const ProductCode = require('../Models/ProductCode');
// const Brand = require('../Models/Brand');
// const ProductType = require('../Models/ProductType');
// const mongoose = require('mongoose');

// // Create Product
// // const createProducts = async (req, res) => {
// //   try {
// //     const {
// //       ProductName,
// //       Category,
// //       Brand: BrandId,
// //       ProductType: ProductTypeId,
// //       autoGenerate,
// //       productCode
// //     } = req.body;

// //     if (!ProductName || !Category || !BrandId || !ProductTypeId) {
// //       return res.status(400).json({ message: 'All fields are required' });
// //     }

// //     let codeDoc;

// //     if (autoGenerate) {
// //       // Fetch Brand & ProductType to get short names
// //       const brandDoc = await Brand.findById(BrandId);
// //       const typeDoc = await ProductType.findById(ProductTypeId);
// //       if (!brandDoc || !typeDoc) {
// //         return res.status(400).json({ message: "Invalid Brand or ProductType" });
// //       }

// //       const count = await ProductCode.countDocuments();
// //       const serial = String(count + 1).padStart(3, '0'); // e.g., 006
// //       const finalCode = `${serial}-${brandDoc.shortname}-${typeDoc.shortname}`;

// //       codeDoc = await new ProductCode({
// //         code: finalCode,
// //         brand: BrandId,
// //         productType: ProductTypeId
// //       }).save();
// //     } else {
// //       if (!productCode) {
// //         return res.status(400).json({ message: "Manual code is required" });
// //       }

// //       const exists = await ProductCode.findOne({ code: productCode });
// //       if (exists) {
// //         return res.status(400).json({ message: "Code already exists in database" });
// //       }

// //       codeDoc = await new ProductCode({
// //         code: productCode,
// //         brand: BrandId,
// //         productType: ProductTypeId
// //       }).save();
// //     }

// //     const newProduct = new Products({
// //       ProductName,
// //       Category,
// //       Brand: new mongoose.Types.ObjectId(BrandId),
// //       ProductType: new mongoose.Types.ObjectId(ProductTypeId),
// //       productCode: codeDoc._id,
// //     });

// //     await newProduct.save();

// //     res.status(200).json({ message: 'Product successfully created', product: newProduct });
// //   } catch (err) {
// //     console.error("Error in createProducts:", err);
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // };

// const createProducts = async (req, res) => {
//   try {
//     const {
//       ProductName,
//       Category,
//       Brand: BrandId,
//       ProductType: ProductTypeId,
//       autoGenerate,
//       productCode
//     } = req.body;

//     if (!ProductName || !Category || !BrandId || !ProductTypeId) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // ✅ Duplicate Product Check (normalized name, same brand + type)
//     const existingProduct = await Products.findOne({
//       ProductName: { $regex: `^${ProductName.trim()}$`, $options: "i" },
//       Brand: new mongoose.Types.ObjectId(BrandId),
//       ProductType: new mongoose.Types.ObjectId(ProductTypeId)
//     });
//     console.log("Checking for existing product with:", ProductName.trim(), BrandId, ProductTypeId);

//     if (existingProduct) {
//       return res.status(409).json({ message: 'Product with same name, brand, and type already exists' });
//     }

//     let codeDoc;

//     if (autoGenerate) {
//       // Fetch Brand & ProductType to get short names
//       const brandDoc = await Brand.findById(BrandId);
//       const typeDoc = await ProductType.findById(ProductTypeId);
//       if (!brandDoc || !typeDoc) {
//         return res.status(400).json({ message: "Invalid Brand or ProductType" });
//       }

//       const count = await ProductCode.countDocuments();
//       const serial = String(count + 1).padStart(3, '0'); // e.g., 006
//       const finalCode = `${serial}-${brandDoc.shortname}-${typeDoc.shortname}`;

//       codeDoc = await new ProductCode({
//         code: finalCode,
//         brand: BrandId,
//         productType: ProductTypeId
//       }).save();
//     } else {
//       if (!productCode) {
//         return res.status(400).json({ message: "Manual code is required" });
//       }

//       const exists = await ProductCode.findOne({ code: productCode });
//       if (exists) {
//         return res.status(400).json({ message: "Code already exists in database" });
//       }

//       codeDoc = await new ProductCode({
//         code: productCode,
//         brand: BrandId,
//         productType: ProductTypeId
//       }).save();
//     }

//     const newProduct = new Products({
//       ProductName: ProductName.trim(),
//       Category,
//       Brand: new mongoose.Types.ObjectId(BrandId),
//       ProductType: new mongoose.Types.ObjectId(ProductTypeId),
//       productCode: codeDoc._id,
//     });

//     await newProduct.save();

//     res.status(200).json({ message: 'Product successfully created', product: newProduct });
//   } catch (err) {
//     console.error("Error in createProducts:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // Get all or filtered products
// const getproductrs = async (req, res) => {
//   try {
//     const { ProductName, Category, Brand, ProductType } = req.query;
//     const filter = {};

//     if (ProductName?.trim()) filter.ProductName = ProductName.trim();
//     if (Category?.trim()) filter.Category = Category.trim();
//     if (Brand?.trim()) filter.Brand = Brand.trim();
//     if (ProductType?.trim()) filter.ProductType = ProductType.trim();

//     const filteredData = await Products.find(filter)
//       .populate('Brand', 'name shortname') // populate Brand fields
//       .populate('ProductType', 'name shortname') // populate ProductType fields
//       .populate({
//         path: 'productCode',
//         select: 'code brand productType',
//         populate: [
//           { path: 'brand', select: 'shortname' },       // brand's shortname
//           { path: 'productType', select: 'shortname' }  // productType's shortname (case-sensitive)
//         ]
//       });

//     res.status(200).json(filteredData);

//   } catch (err) {
//     console.error("Fetching error:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // Update product
// const updateProducts = async (req, res) => {
//   try {
//     const {
//       id,
//       ProductName,
//       Category,
//       Brand,
//       ProductType,
//       productCode,
//       autoGenerate
//     } = req.body;

//     const product = await Products.findById(id).populate('productCode');
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     product.ProductName = ProductName;
//     product.Category = Category;
//     product.Brand = new mongoose.Types.ObjectId(Brand);
//     product.ProductType = new mongoose.Types.ObjectId(ProductType);

//     if (autoGenerate) {
//       const brandDoc = await Brand.findById(Brand);
//       const typeDoc = await ProductType.findById(ProductType);
//       const count = await ProductCode.countDocuments();
//       const serial = String(count + 1).padStart(3, '0');
//       const finalCode = `${serial}-${brandDoc.shortname}-${typeDoc.shortname}`;

//       const newCodeDoc = await new ProductCode({
//         code: finalCode,
//         brand: Brand,
//         productType: ProductType,
//       }).save();

//       product.productCode = newCodeDoc._id;
//     } else if (productCode) {
//       const existing = await ProductCode.findOne({ code: productCode });
//       if (existing && !existing._id.equals(product.productCode._id)) {
//         return res.status(400).json({ message: "Product code already exists" });
//       }

//       const currentCodeDoc = await ProductCode.findById(product.productCode);
//       if (!currentCodeDoc) {
//         return res.status(500).json({ message: "Product code not found" });
//       }

//       currentCodeDoc.code = productCode;
//       currentCodeDoc.brand = Brand;
//       currentCodeDoc.productType = ProductType;
//       await currentCodeDoc.save();
//     }

//     await product.save();
//     res.status(200).json({ message: "Product updated successfully", product });

//   } catch (err) {
//     console.error("Error updating product:", err.message);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// exports.createProducts = createProducts;
// exports.getproductrs = getproductrs;
// exports.updateProducts = updateProducts;













































// // const Products =require('../Models/Product')
// // const ProductCode = require("../models/ProductCode");
// // const Brand =require('../Models/Brand')
// // const ProductType = require('../Models/ProductType');
// // // CREATE PRODUCT
// // exports.createProducts = async (req, res) => {
// //   try {
// //     const { ProductName,Category, Brand: BrandId, ProductType: ProductTypeId, autoGenerate } = req.body;

// //     let codeDoc = null;

// //     if (autoGenerate) {
// //       const count = await ProductCode.countDocuments();
// //       const serial = String(count + 1).padStart(3, '0');

// //       const brandDoc = await Brand.findById(BrandId);
// //       const productTypeDoc = await ProductType.findById(ProductTypeId);

// //       if (!brandDoc?.shortname || !productTypeDoc?.shortname) {
// //         return res.status(400).json({ message: 'Brand or ProductType shortname missing' });
// //       }

// //       const fullCode = `${serial}-${brandDoc.shortname}-${productTypeDoc.shortname}`;

// //       codeDoc = await new ProductCode({
// //         code: fullCode,
// //         status: 'used',
// //         brand: BrandId,
// //         productType: ProductTypeId
// //       }).save();
// //     }

// //     const newProduct = new Products({
// //       ProductName,
// //       Category,
// //       Brand: BrandId,
// //       ProductType: ProductTypeId,
// //       productCode: codeDoc?._id || null
// //     });

// //     const savedProduct = await newProduct.save();
// //     res.status(201).json(savedProduct);
// //   } catch (err) {
// //     console.error("Error in createProducts:", err);
// //     res.status(500).json({ message: "Error creating product", error: err.message });
// //   }
// // };

// // // GET PRODUCTS
// // exports.getproductrs = async (req, res) => {
// //   try {
// //     const { Brand, ProductType } = req.query;
// //     const filter = {};

// //     if (Brand) filter.Brand = Brand;
// //     if (ProductType) filter.ProductType = ProductType;

// //     const filteredData = await Products.find(filter)
// //       .populate("Brand", "name shortname")
// //       .populate("ProductType", "name shortname")
// //       .populate("productCode", "code") // Removed `prefix`
// //       .exec();

// //     res.json(filteredData);
// //   } catch (err) {
// //     console.error("Error in getproductrs:", err);
// //     res.status(500).json({ message: "Error fetching products", error: err.message });
// //   }
// // };

// // // UPDATE PRODUCT
// // exports.updateProducts = async (req, res) => {
// //   try {
// //     const productId = req.params.id;
// //     const { ProductName, Brand: BrandId, ProductType: ProductTypeId, autoGenerate } = req.body;

// //     let codeDoc = null;

// //     if (autoGenerate) {
// //       // const count = await ProductCode.countDocuments();
// //       // const serial = String(count + 1).padStart(3, '0');

// //       const lastCode = await ProductCode.findOne({})
// //   .sort({ createdAt: -1 }) // or sort by `_id` descending
// //   .lean();

// // let serial = '001';
// // if (lastCode && lastCode.code) {
// //   const lastSerial = lastCode.code.split('-')[0]; // e.g., "003"
// //   const newSerial = String(Number(lastSerial) + 1).padStart(3, '0');
// //   serial = newSerial;
// // }

// //       const brandDoc = await Brand.findById(BrandId);
// //       const productTypeDoc = await ProductType.findById(ProductTypeId);

// //       if (!brandDoc?.shortname || !productTypeDoc?.shortname) {
// //         return res.status(400).json({ message: 'Brand or ProductType shortname missing' });
// //       }

// //       const fullCode = `${serial}-${brandDoc.shortname}-${productTypeDoc.shortname}`;

// //       codeDoc = await new ProductCode({
// //         code: fullCode,
// //         status: 'used',
// //         brand: BrandId,
// //         productType: ProductTypeId
// //       }).save();
// //     }

// //     const updatedProduct = await Products.findByIdAndUpdate(
// //       productId,
// //       {
// //         ProductName,
// //         Category,
// //         Brand: BrandId,
// //         ProductType: ProductTypeId,
// //         productCode: codeDoc?._id || null
// //       },
// //       { new: true }
// //     );

// //     res.json(updatedProduct);
// //   } catch (err) {
// //     res.status(500).json({ message: "Error updating product", error: err.message });
// //   }
// // };




const Products = require('../Models/Product');
const ProductCode = require('../Models/ProductCode');
const Brand = require('../Models/Brand');
const ProductType = require('../Models/ProductType');
const mongoose = require('mongoose');

const createProducts = async (req, res) => {
  try {
    const {
      ProductName,
      Category,
      Brand: BrandId,
      ProductType: ProductTypeId,
      autoGenerate,
      productCode
    } = req.body;

    if (!ProductName || !Category || !BrandId || !ProductTypeId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validation 1: Check for duplicate product name (case-insensitive)
    const existingProductName = await Products.findOne({
      ProductName: { $regex: `^${ProductName.trim()}$`, $options: "i" }
    });

    if (existingProductName) {
      return res.status(409).json({ message: 'A product with this name already exists' });
    }

    // Validation 2: Check for duplicate brand and product type combination
    const existingCombination = await Products.findOne({
      Brand: new mongoose.Types.ObjectId(BrandId),
      ProductType: new mongoose.Types.ObjectId(ProductTypeId)
    });

    if (existingCombination) {
      return res.status(409).json({ message: ' product with the same brand and type combination already exists' });
    }


    let codeDoc;

    if (autoGenerate) {
      // Fetch Brand & ProductType to get short names
      const brandDoc = await Brand.findById(BrandId);
      const typeDoc = await ProductType.findById(ProductTypeId);
      if (!brandDoc || !typeDoc) {
        return res.status(400).json({ message: "Invalid Brand or ProductType" });
      }

      const count = await ProductCode.countDocuments();
      const serial = String(count + 1).padStart(3, '0'); // e.g., 006
      const finalCode = `${serial}-${brandDoc.shortname}-${typeDoc.shortname}`;

      codeDoc = await new ProductCode({
        code: finalCode,
        brand: BrandId,
        productType: ProductTypeId
      }).save();
    } else {
      if (!productCode) {
        return res.status(400).json({ message: "Manual code is required" });
      }

      const exists = await ProductCode.findOne({ code: productCode });
      if (exists) {
        return res.status(400).json({ message: "This product code already exists in the database" });
      }

      codeDoc = await new ProductCode({
        code: productCode,
        brand: BrandId,
        productType: ProductTypeId
      }).save();
    }

    const newProduct = new Products({
      ProductName: ProductName.trim(),
      Category,
      Brand: new mongoose.Types.ObjectId(BrandId),
      ProductType: new mongoose.Types.ObjectId(ProductTypeId),
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
      .populate('Brand', 'name shortname') // populate Brand fields
      .populate('ProductType', 'name shortname') // populate ProductType fields
      .populate({
        path: 'productCode',
        select: 'code brand productType',
        populate: [
          { path: 'brand', select: 'shortname' },       // brand's shortname
          { path: 'productType', select: 'shortname' }  // productType's shortname (case-sensitive)
        ]
      });

    res.status(200).json(filteredData);

  } catch (err) {
    console.error("Fetching error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update product
const updateProducts = async (req, res) => {
  try {
    const {
      id,
      ProductName,
      Category,
      Brand,
      ProductType,
      productCode,
      autoGenerate
    } = req.body;

    const product = await Products.findById(id).populate('productCode');
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.ProductName = ProductName;
    product.Category = Category;
    product.Brand = new mongoose.Types.ObjectId(Brand);
    product.ProductType = new mongoose.Types.ObjectId(ProductType);

    if (autoGenerate) {
      const brandDoc = await Brand.findById(Brand);
      const typeDoc = await ProductType.findById(ProductType);
      const count = await ProductCode.countDocuments();
      const serial = String(count + 1).padStart(3, '0');
      const finalCode = `${serial}-${brandDoc.shortname}-${typeDoc.shortname}`;

      const newCodeDoc = await new ProductCode({
        code: finalCode,
        brand: Brand,
        productType: ProductType,
      }).save();

      product.productCode = newCodeDoc._id;
    } else if (productCode) {
      const existing = await ProductCode.findOne({ code: productCode });
      if (existing && !existing._id.equals(product.productCode._id)) {
        return res.status(400).json({ message: "Product code already exists" });
      }

      const currentCodeDoc = await ProductCode.findById(product.productCode);
      if (!currentCodeDoc) {
        return res.status(500).json({ message: "Product code not found" });
      }

      currentCodeDoc.code = productCode;
      currentCodeDoc.brand = Brand;
      currentCodeDoc.productType = ProductType;
      await currentCodeDoc.save();
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });

  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.createProducts = createProducts;
exports.getproductrs = getproductrs;
exports.updateProducts = updateProducts;
