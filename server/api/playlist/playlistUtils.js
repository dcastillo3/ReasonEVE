const fs = require('fs');
const { getProductDataPath } = require('../../utils/productUtils');
const { getFormattedDate } = require('../../utils/utils');
const { indexFilePath } = require('./playlistConsts');
const playlistIndex = require('../../db/playlist/playlist.json');

const getPlaylist = () => {
    const {
        spotlight,
        recentlyAdded
    } = playlistIndex;
    const playlistMap = {};
    //Initialize playlist with spotlight tracks
    const playlist = spotlight.map(({productName, productType}) => {
        const trackDataPath = getProductDataPath(productName, productType);
        const trackData = require(trackDataPath);
        const mappedItem = `${productType}-${productName}`;

        playlistMap[mappedItem] = true;

        return trackData;
    });

    recentlyAdded.forEach(({productName, productType}) => {
        const mappedItem = `${productType}-${productName}`;

        //check for duplicates
        if(!playlistMap[mappedItem]) {
            const trackDataPath = getProductDataPath(productName, productType);
            const trackData = require(trackDataPath);

            playlist.push(trackData);
        };
    });

    return playlist;
};

const updatePlaylistIndex = (productName, productType, playlistIndexType) => {
    const newIndexData = {
        ...playlistIndex,
        [playlistIndexType]: [
            {
                productName,
                productType
            },
            ...playlistIndex[playlistIndexType]
        ],
        dateUpdated: getFormattedDate()
    };
    const fileData = JSON.stringify(newIndexData, null, 4);

    //write product index data
    fs.writeFileSync(indexFilePath, fileData);

};

module.exports = {
    getPlaylist,
    updatePlaylistIndex
};