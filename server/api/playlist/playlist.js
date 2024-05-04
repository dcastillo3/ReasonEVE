const router = require('express').Router();
const { formatResponseData } = require('../../utils/utils');
const { getPlaylist, getPlaylistV2, formatPlaylistData } = require('./playlistUtils');

// Get playlist locally
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

// Get playlist from database
router.get('/v2', async (req, res) => {
    try {
        const playlist = await getPlaylistV2();
        const formattedPlaylist = formatPlaylistData(playlist);
        const responseData = formatResponseData(formattedPlaylist);

        res.send(responseData);
    } catch (err) {
        const responseData = formatResponseData(null, err);

        res.status(500).send(responseData);

        console.error(err);
    };
});

module.exports = router;