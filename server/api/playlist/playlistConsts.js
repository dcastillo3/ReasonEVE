const path = require("path");

const indexFilePath = path.join(__dirname, '../../db/playlist/playlist.json');

const indexTypes = {
    spotlight: 'spotlight',
    recentlyAdded: 'recentlyAdded'
};

module.exports = {
    indexFilePath,
    indexTypes
};