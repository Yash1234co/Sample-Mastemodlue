const express = require('express');
const router = express.Router();

const addsample = require('../Controller/SampleController');

const Comments = require('../Controller/CommentsController');
const addImages = require('../Controller/ImageController');


const upload = require('../Middleware/Image');
const Product= require('../Controller/ProductController')
const Brand= require('../Controller/BrandController')
const ProductType=require('../Controller/ProductTypeController')
const ProductCode=require('../Controller/ProduccodeController')
const ImagesForProducts=require('../Controller/ImageControllerForProducts')


router.post('/addsample', addsample.createSampleModule);
router.get('/getData', addsample.getSamples);

router.post('/comments', Comments.addComments);
router.get('/getcomments/:sampleId', Comments.getComnents);

router.post('/upload/:sampleId', upload.array('images', 10), addImages.imageUpload);
router.get('/images/:sampleId', addImages.getImagesBySample);
router.put('/updateimages/:imageId', upload.single('image'), addImages.updateimages);

router.post('/createProduct',Product.createProducts)
router.get('/products',Product.getproductrs)

router.post('/createBrand',Brand.AddBrand)
router.get('/getBrand',Brand.getBrands)
router.put('/updateBrand/:id', Brand.updateBrand);

router.post('/createProductType',ProductType.addproductType)
router.get('/getProductType',ProductType.getProducts)
router.put('/updateProduct',Product.updateProducts)
router.put('/updateProductType/:id', ProductType.updateProductType);


router.post('/uploadImagesForProduct/:productId', upload.single('image'), ImagesForProducts.imageUploaderForProducts)
router.get('/getImagesForProduct/:productId', ImagesForProducts.getImageForProducts)


router.get('/getProductCode',ProductCode.getproductCode)





module.exports = router;
