const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { createStripeProduct } = require('../stripe');
const { storageConfigs, sessionModes, errorMessages } = require('./consts');
const { getTrackProductParams, buildTrackProductPricing, getInitialTrackData } = require('../api/tracks/tracksUtils');
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

const buildInitialProductPurchases = productPricing =>
    productPricing.reduce((prevValue, { purchaseType }) => ({ ...prevValue, [purchaseType]: [] }), {});

const formatProductData = (productData, fileData, products) => {
    const { productType } = productData;
    const currDate = getFormattedDate();
    let formattedProductData = {
        dateCreated: currDate,
        dateUpdated: currDate,
        active: true
    };

    switch (productType) {
        case 'track': {
            const initialTrackData = getInitialTrackData(productData);
            const productPricing = buildTrackProductPricing(products, productData);
            const purchases = buildInitialProductPurchases(productPricing);
            const {
                url,
                coverArt
            } = buildProductLinks(fileData, productData);
            const trackProductData = {
                ...initialTrackData,
                url,
                coverArt,
                productPricing,
                purchases
            };

            formattedProductData = {
                ...trackProductData,
                ...formattedProductData
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

// Customers can checkout 1 of each product per cart, at this time
const formatLineItems = products => 
    products.map(({selectedPricing: {id}}) => ({price: id, quantity: 1}));

//Validate success and cancel url hosts
const validateCheckoutReturnUrls = (successUrl, cancelUrl, host) => {
    const successHost = successUrl.split('/')[2];
    const cancelHost = cancelUrl.split('/')[2];
    
    if(successHost === host && cancelHost === host) {
        const validCheckoutReturnUrls = {
            success_url: successUrl,
            cancel_url: cancelUrl
        };
    
        return validCheckoutReturnUrls;
    } else throw new Error(errorMessages.validateCheckoutReturnUrls);
};

const formatCheckoutSessionData = (products, successUrl, cancelUrl, host) => {
    const line_items = formatLineItems(products);
    const {
        success_url,
        cancel_url
    } = validateCheckoutReturnUrls(successUrl, cancelUrl, host);
    //Format data for stripe checkout session consumption
    const formattedCheckoutSessionData = {
        line_items,
        mode: sessionModes.payment,
        success_url,
        cancel_url,
    };

    return formattedCheckoutSessionData;
};

module.exports = {
    createProduct,
    formatProductData,
    writeProductData,
    updateProductIndexData,
    getProductDataPath,
    getProductData,
    formatCheckoutSessionData
};