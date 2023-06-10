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
const bodyParser = require('body-parser');

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

//Post requests below this line will have body parsed via json method
router.use(bodyParser.json());

//Enable if url encoding needs parsing
// router.use(bodyParser.urlencoded({ extended: true }));

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