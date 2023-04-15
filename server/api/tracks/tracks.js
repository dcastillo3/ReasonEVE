const router = require('express').Router();
const storageClient = require('../../multer');
const {
    createProduct,
    writeProductData,
    formatProductData,
    getProductData,
    updateProductIndexData
} = require('../../utils/productUtils');
const { formatResponseData } = require('../../utils/utils');
const { track } = require('./tracksConsts');
const { updatePlaylistIndex } = require('../playlist/playlistUtils');
const { indexTypes: {recentlyAdded} } = require('../playlist/playlistConsts');

// Get tracks from index
router.get('/', (req, res) => {
    try {
        const tracks = getProductData(track);
        const responseData = formatResponseData(tracks);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

// Add to tracks directory
router.post('/', storageClient(track), async (req, res) => {
    try {
        const { body: productData, files: fileData } = req;
        const { productName, productType } = productData;

        //create stripe products
        const trackProducts = await createProduct(productData);
        const formattedTrackData = formatProductData(productData, fileData, trackProducts);
        //write track data locally
        const writtenData = await writeProductData(formattedTrackData);
        const responseData = formatResponseData(writtenData);

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

module.exports = router;