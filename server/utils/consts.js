const path = require("path");


const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/dcastillo3/ReasonEVE/server/db';

const storageDestinations = {
    local: 'local',
    s3: 's3'
};

const storageConfigs = {
    track: {
        localPath: path.join(__dirname, '../db/tracks'),
        cdnPath: `${cdnBaseUrl}/tracks`,
        indexName: 'tracks',
        dataFormat: '.json',
        uploadFields: {
            preview: {
                maxCount: 1,
                destination: storageDestinations.local
            },
            coverArt: {
                maxCount: 1,
                destination: storageDestinations.local
            },
            mp3: {
                maxCount: 1,
                destination: storageDestinations.s3
            },
            lease: {
                maxCount: 1,
                destination: storageDestinations.s3
            },
            exclusive: {
                maxCount: 1,
                destination: storageDestinations.s3
            },
        }
    },
    pack: {
        localPath: path.join(__dirname, '../db/packs'),
        cdnPath: `${cdnBaseUrl}/packs`,
        indexName: 'packs',
        dataFormat: '.json',
        uploadFields: {
            preview: {
                maxCount: 1,
                destination: storageDestinations.local
            },
            coverArt: {
                maxCount: 1,
                destination: storageDestinations.local
            },
            exclusive: {
                maxCount: 1,
                destination: storageDestinations.s3
            },
        }
    }
};

const sessionModes = {
    payment: 'payment'
};

const errorMessages = {
    validateCheckoutReturnUrls: 'Host validation failed. Incorrect success and cancel urls.'
};

const production = 'production';

const services = {
    stripe: 'stripe',
    sequelize: 'sequelize',
    AWSS3: 'AWSS3',
    AWSSES: 'AWSSES',
    fs: 'fs',
    express: 'express',
};

module.exports = {
    storageConfigs,
    sessionModes,
    errorMessages,
    production,
    services
};