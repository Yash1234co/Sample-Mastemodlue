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

router.post('/addsample', addsample.createSampleModule);
router.get('/getData', getSample.getSamples);

router.post('/comments', Comments.addComments);
router.get('/getcomments/:sampleId', Comments.getComnents);

router.post('/upload/:sampleId', upload.array('images', 10), addImages.imageUpload);
router.get('/images/:sampleId', getImages.getImagesBySample);
router.put('/updateimages/:imageId', upload.single('image'), UpdateImages.updateimages);

router.post('/createProduct',Product.createProducts)
router.get('/products',Product.getproductrs)



module.exports = router;
