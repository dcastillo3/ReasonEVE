const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Read tracks directory and generate track data
router.get('/getTracks', (req, res) => {
    const tracksDirectory = path.join(__dirname, '../../tracks');

    fs.readdir(tracksDirectory, (err, tracks) => {
        if (err) {
            console.log('Make sure tracks directory is in root');
            throw err;
        };

        if (tracks.length) {
            const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/tracks/';
            const playlist = tracks.map((track, id) => ({
                id,
                coverArt: 'https://media.gettyimages.com/photos/line-subway-train-in-queens-with-manhattan-skyline-new-york-city-picture-id1189547726?s=612x612',
                title: path.parse(track).name,
                artist: 'ReasonEVE',
                url: `${cdnBaseUrl}/${track}`
            }));

            res.send(playlist);
        }
    });
});

router.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

module.exports = router;