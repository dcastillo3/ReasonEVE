const router = require('express').Router();
const storageClient = require('../../multer/multer');
const {
    createProduct,
    writeProductData,
    formatProductData,
    updateProductIndexData,
    uploadS3Products,
    saveLocalProductFiles,
    formatFilesByDestination,
    getAllProductsData,
    saveProductData
} = require('../../utils/productUtils');
const { formatResponseData } = require('../../utils/utils');
const { track } = require('./tracksConsts');
const { updatePlaylistIndex } = require('../playlist/playlistUtils');
const { indexTypes: {recentlyAdded} } = require('../playlist/playlistConsts');
const bodyParser = require('body-parser');


// Get tracks from index
router.get('/', (req, res) => {
    try {
        const tracks = getAllProductsData(track);
        const responseData = formatResponseData(tracks);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

//Post requests below this line will have body parsed via json method
router.use(bodyParser.json());

//Enable if url encoding needs parsing
// router.use(bodyParser.urlencoded({ extended: true }));

// Add to tracks directory
router.post('/', storageClient(track), async (req, res) => {
    try {
        const { body: productData, files: filesData } = req;
        const { productName, productType } = productData;
        
        const filesByDestination = formatFilesByDestination(filesData, productType);
        //save local product files
        const productLinks = saveLocalProductFiles(productData, filesByDestination);
        //upload S3 product files
        const s3Keys = await uploadS3Products(productData, filesByDestination);

        //create stripe products
        const stripeProducts = await createProduct(productData, productLinks);
        const formattedTrackData = formatProductData(productData, productLinks, s3Keys, stripeProducts);
        //write track data locally
        const writtenData = await writeProductData(formattedTrackData);
        const responseData = formatResponseData(writtenData, null);

        //write track index data locally
        updateProductIndexData(productName, productType);

        //write playlist index data locally
        updatePlaylistIndex(productName, productType, recentlyAdded);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

// Create track in database
router.post('/v2', storageClient(track), async (req, res) => {
    try {
        const { body: productData, files: filesData } = req;
        const { productType } = productData;
        
        //save local product files
        const filesByDestination = formatFilesByDestination(filesData, productType);
        const productLinks = saveLocalProductFiles(productData, filesByDestination);

        //upload S3 product files
        const s3Keys = await uploadS3Products(productData, filesByDestination);

        //create stripe products
        const stripeProducts = await createProduct(productData, productLinks);
        
        //save track data to postgres
        const formattedTrackData = formatProductData(productData, productLinks, s3Keys, stripeProducts);
        const savedData = await saveProductData(formattedTrackData);

        //write track index data locally
        // updateProductIndexData(productName, productType);

        //write playlist index data locally
        // updatePlaylistIndex(productName, productType, recentlyAdded);

        const responseData = formatResponseData(savedData, null);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

module.exports = router;