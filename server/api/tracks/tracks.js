const router = require('express').Router();
const storageClient = require('../../multer/multer');
const {
    createProducts,
    writeProductData,
    formatProductData,
    updateProductIndexData,
    uploadS3Products,
    saveLocalProductFiles,
    formatFilesByDestination,
    getAllProductsData,
    saveProductData,
    getAllProductsDataV2,
    formatProductsData
} = require('../../utils/productUtils');
const { formatResponseData } = require('../../utils/utils');
const { track } = require('./tracksConsts');
const { updatePlaylistIndex } = require('../playlist/playlistUtils');
const { indexTypes: {recentlyAdded} } = require('../playlist/playlistConsts');
const bodyParser = require('body-parser');
const { tracksMockData } = require('../../sequelize/mockData');
const _ = require('lodash');


// Get tracks locally
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

// Get tracks from database
router.get('/v2', async (req, res) => {
    try {
        const tracks = await getAllProductsDataV2(track);
        const formattedTracks = formatProductsData(tracks);
        const responseData = formatResponseData(formattedTracks);

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

// Create track and save data locally
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
        const stripeProducts = await createProducts(productData, productLinks);
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

// TEST ENDPOINT: Save track data to database
router.post('/v2Test', async ({ body }, res) => {
    try {
        let savedData = [];

        //Use data from body or mock data
        if (!_.isEmpty(body)) savedData = await saveProductData(body);
        else {
            for(const trackMockData of tracksMockData) {
                const currSavedData = await saveProductData(trackMockData);

                savedData = [...savedData, currSavedData];
            };
        };
        
        const responseData = formatResponseData(savedData, null);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

// Create track and save data to database and locally
router.post('/v2', storageClient(track), async (req, res) => {
    try {
        const { body: productData, files: filesData } = req;
        // TODO: save local product files to S3
        const { productName, productType } = productData;
        
        //save local product files
        //TODO: save local product files to S3
        const filesByDestination = formatFilesByDestination(filesData, productType);
        const productLinks = saveLocalProductFiles(productData, filesByDestination);

        //upload S3 product files
        const s3Keys = await uploadS3Products(productData, filesByDestination);

        //create stripe products
        const stripeProducts = await createProducts(productData, productLinks);
        const formattedTrackData = formatProductData(productData, productLinks, s3Keys, stripeProducts);
        //save track data to postgres
        const savedData = await saveProductData(formattedTrackData);
        //write track data locally
        // TODO: save local product files to S3
        const writtenData = await writeProductData(formattedTrackData);

        //write track index data locally
        // TODO: save local product files to S3
        updateProductIndexData(productName, productType);

        //write playlist index data locally
        // TODO: save playlist index data to postgres
        updatePlaylistIndex(productName, productType, recentlyAdded);

        const responseData = formatResponseData(savedData, null);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

module.exports = router;