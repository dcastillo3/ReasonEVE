const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const storageClient = require('../multer');
const { createTrackProducts } = require('../utils');

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

        res.send(playlist);
    } catch (error) {
        throw (error);
    };
});

// Add to tracks directory
router.post('/addTrack', storageClient('track'), async (req, res) => {
    try {
        const trackProducts = await createTrackProducts(req.body);

        console.log(trackProducts)

        res.send({
            success: true,
            trackProducts,
            message: 'Track added successfully',
        });
    } catch (error) {
        throw(error);
    }
});

module.exports = router;