const storageConfigs = {
    track: {
        nameField: 'trackName',
        folderPath: '../../tracks',
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
        folderPath: '../../packs',
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

const dataFormat = '.json';

module.exports = {
    storageConfigs,
    dataFormat
};