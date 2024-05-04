const fs = require('fs');
const { getProductDataPath } = require('../../utils/productUtils');
const { getFormattedDate, serviceLog } = require('../../utils/utils');
const { indexFilePath } = require('./playlistConsts');
const playlistIndex = require('../../db/playlist/playlist.json');
const { services } = require('../../utils/consts');
const { Product, ProductType, Playlist } = require('../../sequelize/models');
const { Op } = require('sequelize');

const getPlaylist = () => {
    const {
        spotlight,
        recentlyAdded
    } = playlistIndex;
    const playlistMap = {};
    //Initialize playlist with spotlight tracks
    const playlist = spotlight.map(({productName, productType}) => {
        const trackDataPath = getProductDataPath(productName, productType);
        const { s3Key, ...trackData } = require(trackDataPath);
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

const getSpotlightPlaylist = async playlistOptions => {
    const spotlightPlaylistOptions = {
        ...playlistOptions,
        where: { [Op.not]: [{ order: null }] },
        order: [['order', 'ASC']]
    };
    const spotlightPlaylist = await Playlist.findAll(spotlightPlaylistOptions);

    serviceLog(services.sequelize, `Retrieved all spotlight playlist data`);

    return spotlightPlaylist;
};

const getRecentlyPlayedPlaylist = async playlistOptions => {
    const recentlyPlayedPlaylistOptions = {
        ...playlistOptions,
        where: { order: null },
        order: [['createdAt', 'DESC']]
    };
    const recentlyPlayedPlaylist = await Playlist.findAll(recentlyPlayedPlaylistOptions);

    serviceLog(services.sequelize, `Retrieved all recently played playlist data`);

    return recentlyPlayedPlaylist;
};

const getPlaylistV2 = async () => {
    const playlistOptions = {
        attributes: [
            'id',
            'order'
        ],
        include: [
            {
                model: Product,
                attributes: ['id'],
                include: [
                    {
                        model: ProductType,
                        attributes: ['product_type']
                    }
                ]
            }
        ]
    };
    const spotlightPlaylist = await getSpotlightPlaylist(playlistOptions);
    const recentlyPlayedPlaylist = await getRecentlyPlayedPlaylist(playlistOptions);
    const playlist = [...spotlightPlaylist, ...recentlyPlayedPlaylist];

    serviceLog(services.sequelize, `Retrieved all playlist data`);

    return playlist;
};

const formatPlaylistData = playlistData => {
    const formattedPlaylistData = playlistData.map(playlist => {
        const {
            id,
            order,
            product: {
                id: productId,
                product_type: { product_type: productType }
            }
        } = playlist.dataValues;
        const formattedPlaylist = {
            id,
            order,
            productId,
            productType
        };

        return formattedPlaylist;
    });

    return formattedPlaylistData;
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

    serviceLog(services.fs, `Added ${productName} to playlist index`);
};

module.exports = {
    getPlaylist,
    updatePlaylistIndex,
    getPlaylistV2,
    getSpotlightPlaylist,
    getRecentlyPlayedPlaylist,
    formatPlaylistData
};