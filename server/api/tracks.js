const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const storageClient = require('../multer');
const { createProduct, writeProductData, formatProductData, formatResponseData } = require('../utils');

// Set product type
const productType = 'track';

// Read tracks directory and generate track data
router.get('/getTracks', (req, res) => {
    try {
        const playlist = [];
        const tracksPath = path.join(__dirname, '../../tracks');
        const trackFolders = fs.readdirSync(tracksPath);
        const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/tracks';

        trackFolders.forEach((trackFolder, id) => {
            const trackPath = path.join(tracksPath, trackFolder);
            const trackFiles = fs.readdirSync(trackPath);
            let trackData = {};

            if (trackFiles.length) {
                trackFiles.forEach(file => {
                    const fileName = path.parse(file).name;
                    const extension = path.extname(file);

                    if (extension === '.mp3') {
                        trackData = {
                            ...trackData,
                            id,
                            title: fileName,
                            artist: 'ReasonEVE',
                            url: `${cdnBaseUrl}/${fileName}/${file}`
                        };
                    } else {
                        trackData = {
                            ...trackData,
                            coverArt: `${cdnBaseUrl}/${fileName}/${file}`,
                        };
                    };
                });
            };

            playlist.push(trackData);
        });

        const responseData = formatResponseData(playlist);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        throw (err);
    };
});

// Add to tracks directory
router.post('/addTrack', storageClient(productType), async (req, res) => {
    try {
        //create stripe products
        const trackProducts = await createProduct(req.body, productType);
        const formattedTrackData = formatProductData(req.body, trackProducts, productType);
        //write track data locally
        const writtenData = await writeProductData(formattedTrackData, productType);
        const responseData = formatResponseData(writtenData);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        throw(err);
    };
});

module.exports = router;