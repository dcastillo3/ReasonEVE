const router = require('express').Router();
const storageClient = require('../../multer');
const {
    createProduct,
    writeProductData,
    formatProductData,
    getProductData,
    updateProductIndexData,
    getProductName
} = require('../../utils/productUtils');
const { formatResponseData } = require('../../utils/utils');
const { productType } = require('./tracksConsts');
const { updatePlaylistIndex } = require('../playlist/playlistUtils');
const { indexTypes: {recentlyAdded} } = require('../playlist/playlistConsts');

// Get tracks from index
router.get('/', (req, res) => {
    try {
        const tracks = getProductData(productType);
        const responseData = formatResponseData(tracks);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        throw (err);
    };
});

// Add to tracks directory
router.post('/', storageClient(productType), async (req, res) => {
    try {
        //create stripe products
        const trackProducts = await createProduct(req.body, productType);
        const formattedTrackData = formatProductData(req.body, req.files, trackProducts, productType);
        //write track data locally
        const writtenData = await writeProductData(formattedTrackData, productType);
        const responseData = formatResponseData(writtenData);
        const productName = getProductName(req.body, productType);

        //write track index data locally
        updateProductIndexData(productName, productType);

        //write playlist index data locally
        updatePlaylistIndex(productName, productType, recentlyAdded);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        throw(err);
    };
});

module.exports = router;