const express = require('express');
const router = express.Router();

const addsample = require('../Controller/CreateSample');
const getSample = require('../Controller/Samples');
const Comments = require('../Controller/Comments');
const addImages = require('../Controller/ImageUpload');
const getImages = require('../Controller/getImages');
const UpdateImages = require('../Controller/updateImages');
const upload = require('../Middleware/Image');
const Product= require('../Controller/Product')
const Brand= require('../Controller/AddBrand')
const ProductType=require('../Controller/AddProductType')
const ProductCode=require('../Controller/getProduccode')

router.post('/addsample', addsample.createSampleModule);
router.get('/getData', getSample.getSamples);

router.post('/comments', Comments.addComments);
router.get('/getcomments/:sampleId', Comments.getComnents);

router.post('/upload/:sampleId', upload.array('images', 10), addImages.imageUpload);
router.get('/images/:sampleId', getImages.getImagesBySample);
router.put('/updateimages/:imageId', upload.single('image'), UpdateImages.updateimages);

router.post('/createProduct',Product.createProducts)
router.get('/products',Product.getproductrs)

router.post('/createBrand',Brand.AddBrand)
router.get('/getBrand',Brand.getBrands)
router.put('/updateBrand/:id', Brand.updateBrand);

router.post('/createProductType',ProductType.addproductType)
router.get('/getProductType',ProductType.getProducts)
router.put('/updateProduct',Product.updateProducts)
router.put('/updateProductType/:id', ProductType.updateProductType);

router.get('/getProductCode',ProductCode.getproductCode)





module.exports = router;
