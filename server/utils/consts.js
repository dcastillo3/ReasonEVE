const path = require("path");


const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db';

const storageConfigs = {
    track: {
        nameField: 'trackName',
        localPath: path.join(__dirname, '../db/tracks'),
        cdnPath: `${cdnBaseUrl}/tracks`,
        indexName: 'tracks',
        dataFormat: '.json',
        uploadFields: [
            { 
                name: 'track', 
                maxCount: 1 
            }, 
            { 
                name: 'coverArt', 
                maxCount: 1 
            }
        ]
    },
    pack: {
        nameField: 'packName',
        localPath: path.join(__dirname, '../db/packs'),
        cdnPath: `${cdnBaseUrl}/packs`,
        indexName: 'packs',
        dataFormat: '.json',
        uploadFields: [
            { 
                name: 'pack', 
                maxCount: 1 
            }, 
            { 
                name: 'coverArt', 
                maxCount: 1 
            }
        ]
    }
};

module.exports = {
    storageConfigs
};