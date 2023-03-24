const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { createStripeProduct } = require('../stripe');
const { storageConfigs } = require('./consts');
const { getTrackProductParams, getTrackProductIds } = require('../api/tracks/tracksUtils');
const { getFormattedDate } = require('./utils');

const getProductParams = productData => {
    switch (productData.productType) {
        case 'track': {
            let trackProductParams = getTrackProductParams(productData);

            return trackProductParams;
        };
    };
};

const createProduct = async productData => {
    let productParams = getProductParams(productData);
    const products = [];

    for(let i = 0; i < productParams.length; i++) {
        let {name, price} = productParams[i];
        const product = await createStripeProduct(name, price);

        products.push(product);
    };

    return products;
};

const buildProductLinks = (fileData, {productName, productType}) => {
    const { cdnPath } = storageConfigs[productType];
    const encodedProductName = encodeURIComponent(productName);
    const productLinks = {};

    Object.entries(fileData).forEach(([fileKey, [{filename}]]) => {
        const fileExtension = path.extname(filename);
        const filePath = `${cdnPath}/${encodedProductName}/${encodedProductName}${fileExtension}`;

        if(fileKey === 'coverArt') productLinks.coverArt = filePath;
        else productLinks.url = filePath;
    });

    return productLinks;
};

const formatProductData = (productData, fileData, products) => {
    const { productType } = productData;
    const currDate = getFormattedDate();
    let formattedProductData = {
        ...productData,
        dateCreated: currDate,
        dateUpdated: currDate,
        active: true
    };

    switch (productType) {
        case 'track': {
            const productIds = getTrackProductIds(products, productData);
            const {
                url,
                coverArt
            } = buildProductLinks(fileData, productData);
            const trackProductData = {
                purchases: {
                    mp3: [],
                    lease: [],
                    exclusive: []
                },
                productIds,
                url,
                coverArt
            };

            formattedProductData = {
                ...formattedProductData,
                ...trackProductData
            };

            break;
        };
    };

    return formattedProductData;
};

const updateProductIndexData = (productName, productType) => {
    const indexFilePath = getProductIndexPath(productType);
    const indexData = require(indexFilePath);
    const newIndexData = {
        ...indexData,
        indexData: [
            ...indexData.indexData,
            productName
        ],
        dateUpdated: getFormattedDate()
    };
    const fileData = JSON.stringify(newIndexData, null, 4);

    //write product index data
    fs.writeFileSync(indexFilePath, fileData);
};

const writeProductData = async productData => {
    const { productName, productType } = productData;
    const filePath = getProductDataPath(productName, productType);
    const fileData = JSON.stringify(productData, null, 4);

    //write product data
    fs.writeFileSync(filePath, fileData);

    return productData;
};

const getProductDataPath = (productName, productType) => {
    const {
        localPath,
        dataFormat
    } = storageConfigs[productType];
    const productDataFile = `${productName}${dataFormat}`;
    const productDataPath = path.join(localPath, productName, productDataFile);

    return productDataPath;
};

const getProductIndexPath = productType => {
    const {
        localPath,
        indexName,
        dataFormat
    } = storageConfigs[productType];
    const indexFileName = `${indexName}${dataFormat}`;
    const indexPath = path.join(localPath, indexFileName);

    return indexPath;
};

const getProductData = productType => {
    const indexPath = getProductIndexPath(productType);
    const { indexData } = require(indexPath);
    const productData = indexData.map(track => {
        const trackDataPath = getProductDataPath(track, productType);
        const trackData = require(trackDataPath);

        return trackData;
    });

    return productData;
};

module.exports = {
    createProduct,
    formatProductData,
    writeProductData,
    updateProductIndexData,
    getProductDataPath,
    getProductData
};