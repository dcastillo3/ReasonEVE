const router = require('express').Router();
const { formatResponseData } = require('../../utils/utils');
const { getPlaylist } = require('./playlistUtils');

// Get playlist from index
router.get('/', (req, res) => {
    try {
        const playlist = getPlaylist();
        const responseData = formatResponseData(playlist);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

module.exports = router;