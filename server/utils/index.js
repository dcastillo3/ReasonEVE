const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { createStripeProduct } = require("../stripe");
const { storageConfigs, dataFormat } = require('./consts');

const getTrackName = ({trackName, artistName, additionalArtistNames}, type) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`} - ${trackName} | ${type}`;

const getTrackProductParams = productData => {
    const {
        mp3Price,
        leasePrice,
        exclusivePrice
    } = productData;
    let trackProductData = [
        {
            name: getTrackName(productData, 'mp3'),
            price: mp3Price
        },
        {
            name: getTrackName(productData, 'lease'),
            price: leasePrice
        },
        {
            name: getTrackName(productData, 'exclusive'),
            price: exclusivePrice
        }
    ];

    return trackProductData;
};

const getProductParams = (productData, productType) => {
    switch (productType) {
        case 'track': {
            let trackProductParams = getTrackProductParams(productData);

            return trackProductParams;
        };
    };
};

const createProduct = async (productData, productType) => {
    let productParams = getProductParams(productData, productType);
    const products = [];

    for(let i = 0; i < productParams.length; i++) {
        let {name, price} = productParams[i];
        const product = await createStripeProduct(name, price);

        products.push(product);
    };

    return products;
};

const getTrackProductIds = products => products.reduce((prevValue, {name, default_price}) => {
    const productId = name.split('| ')[1];
    const trackId = {
        [productId]: default_price.id,
        ...prevValue
    };

    return trackId;
}, {});

const formatProductData = (productData, products, productType) => {
    let formattedProductData = {
        ...productData,
        active: true
    };

    switch (productType) {
        case 'track': {
            const productIds = getTrackProductIds(products);
            const trackProductData = {
                purchases: {
                    mp3: [],
                    lease: [],
                    exclusive: []
                },
                productIds
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

const writeProductData = async (productData, productType) => {
    const {
        nameField,
        folderPath
    } = storageConfigs[productType];
    const productName = productData[nameField];
    const fileName = `${productName}${dataFormat}`;
    const filePath = path.join(__dirname, folderPath, productName, fileName);
    const jsonData = JSON.stringify(productData, null, 4);

    fs.writeFileSync(filePath, jsonData);

    return productData;
};

const formatResponseData = (data, err) => {
    let responseData = {};

    //TO-DO: Populate err to send to front end
    if(err) {
        responseData = {
            err,
            success: false
        };
    } else {
        responseData = {
            data,
            success: true
        };
    };

    return responseData;
};

module.exports = {
    createProduct,
    formatProductData,
    writeProductData,
    formatResponseData
};