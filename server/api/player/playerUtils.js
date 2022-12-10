const fs = require('fs');
const playerIndex = require('../../db/player/player.json');
const { getProductDataPath } = require('../../utils/productUtils');
const { getFormattedDate } = require('../../utils/utils');
const { indexFilePath } = require('./playerConsts');

const getPlaylist = () => {
    const {
        spotlight,
        recentlyAdded
    } = playerIndex;
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

const updatePlayerIndex = (productName, productType, playerIndexType) => {
    const newIndexData = {
        ...playerIndex,
        [playerIndexType]: [
            ...playerIndex[playerIndexType],
            {
                productName,
                productType
            }
        ],
        dateUpdated: getFormattedDate()
    };
    const fileData = JSON.stringify(newIndexData, null, 4);

    //write product index data
    fs.writeFileSync(indexFilePath, fileData);

};

module.exports = {
    getPlaylist,
    updatePlayerIndex
};