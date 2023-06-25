const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { createStripeProduct } = require('../stripe/stripe');
const { storageConfigs, sessionModes, errorMessages } = require('./consts');
const { getTrackProductParams, buildTrackProductPricing, getInitialTrackData } = require('../api/tracks/tracksUtils');
const { getFormattedDate, getUniqueId } = require('./utils');
const { track } = require('../api/tracks/tracksConsts');
const { uploadS3Product } = require('../aws/s3/s3');

const getProductParams = (productData, productLinks) => {
    switch (productData.productType) {
        case track: {
            let trackProductParams = getTrackProductParams(productData, productLinks);

            return trackProductParams;
        };
    };
};

const createProduct = async (productData, productLinks) => {
    let productParams = getProductParams(productData, productLinks);
    const products = [];

    for(let i = 0; i < productParams.length; i++) {
        let stripeProduct = productParams[i];
        const product = await createStripeProduct(stripeProduct);

        products.push(product);
    };

    return products;
};

const formatFilesByDestination = (filesData, productType) => {
    // Split local and s3 product files
    const { uploadFields } = storageConfigs[productType];
    let filesByDestination = {};

    Object.keys(filesData).forEach(filesDataField => {
        const files = filesData[filesDataField];
        const { destination } = uploadFields[filesDataField];

        filesByDestination = {
            ...filesByDestination,
            [destination]: {
                ...filesByDestination[destination],
                [filesDataField]: files
            }
        };
    });

    return filesByDestination;
};

const saveLocalProductFiles = ({ productName, productType }, { local: localProductFiles }) => {
    const { localPath, cdnPath } = storageConfigs[productType];
    const encodedProductName = encodeURIComponent(productName);
    const productLinks = {};

    Object.keys(localProductFiles).forEach(field => {
        const files = localProductFiles[field];
        const newProductPath = path.join(localPath, productName);

        //Make new directory if doesn't exist
        !fs.existsSync(newProductPath) && fs.mkdirSync(newProductPath);


        files.forEach(({ buffer, originalname }) => {
            const fileExtension = path.extname(originalname);
            const fileName = `${productName}${fileExtension}`;
            const filePath = `${newProductPath}/${fileName}`;
            const linkPath = `${cdnPath}/${encodedProductName}/${encodedProductName}${fileExtension}`;

            //Save file locally
            fs.writeFileSync(filePath, buffer);

            console.log(`
                Successfully uploaded ${fileName} locally. 
                Link: ${linkPath}
            `);

            //Save product link
            productLinks[field] = linkPath;
        });
    });

    return productLinks;
};

const uploadS3Products = async ({ productName, productType }, { s3: s3ProductFiles }) => {
    const s3Keys = {};

    for (let field in s3ProductFiles) {
        const files = s3ProductFiles[field];

        for (let i = 0; i < files.length; i++) {
            const { buffer, originalname } = files[i];
            const fileExtension = path.extname(originalname);
            const fileName = `${productName}${fileExtension}`;
            const s3Key = `${productType}s/${productName}/${field}/${fileName}`;
            
            await uploadS3Product(s3Key, buffer, fileName);

            // Save 
            s3Keys[field] = s3Key;
        };
    };

    return s3Keys;
};

const buildInitialProductPurchases = productPricing =>
    productPricing.reduce((prevValue, { purchaseType }) => ({ ...prevValue, [purchaseType]: [] }), {});

const formatProductData = (productData, { coverArt, preview }, s3Keys, stripeProducts) => {
    const { productType } = productData;
    const currDate = getFormattedDate();
    const productId = getUniqueId();
    let formattedProductData = {
        dateCreated: currDate,
        dateUpdated: currDate,
        active: true
    };

    switch (productType) {
        case track: {
            const initialTrackData = getInitialTrackData(productData);
            const productPricing = buildTrackProductPricing(stripeProducts, productData);
            const purchases = buildInitialProductPurchases(productPricing);
            const trackProductData = {
                productId,
                ...initialTrackData,
                preview,
                coverArt,
                s3Keys,
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
            productName,
            ...indexData.indexData
        ],
        dateUpdated: getFormattedDate()
    };
    const fileData = JSON.stringify(newIndexData, null, 4);

    //write product index data
    fs.writeFileSync(indexFilePath, fileData);

    console.log(`
        Successfully added ${productName} to ${productType} index data. 
        indexPath: ${indexFilePath}
    `);
};

const writeProductData = productData => {
    const { productName, productType } = productData;
    const filePath = getProductDataPath(productName, productType);
    const fileData = JSON.stringify(productData, null, 4);

    //write product data
    fs.writeFileSync(filePath, fileData);

    console.log(`
        Successfully wrote ${productName} data file locally. 
        filePath: ${filePath}
    `);

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

const getProductData = (productName, productType) => {
    const productDataPath = getProductDataPath(productName, productType);
    const productData = require(productDataPath);

    return productData;
};

const getAllProductsData = productType => {
    const indexPath = getProductIndexPath(productType);
    const { indexData } = require(indexPath);
    const productData = indexData.map(product => {
        const productDataPath = getProductDataPath(product, productType);
        // Choose files to exclude from frontend
        const { s3Key, purchases, ...productData } = require(productDataPath);

        return productData;
    });

    return productData;
};

// Customers can checkout 1 of each product per cart, at this time
const formatLineItems = products => 
    products.map(({selectedPricing: {id}}) => ({price: id, quantity: 1}));

const formatMetadataKeyForStripe = (productName, fieldKey) => {
    const formattedProductName = productName.replace(' ', '_');
    const formattedFieldKey = `${formattedProductName}-${fieldKey}`;

    return formattedFieldKey;
};

const formatMetadataKeyFromStripe = metadataKey => {
    const [productName, fieldKey] = metadataKey.split('-');
    const formattedData = {
        productName: productName.replace('_', ' '),
        fieldKey
    };

    return formattedData;
};

const formatProductMetadata = (productName, productMetadata) =>
    Object.keys(productMetadata).reduce((prevMetadata, productMetadataKey) => {
        const productMetadataValue = productMetadata[productMetadataKey];
        const formattedProductMetadataKey = formatMetadataKeyForStripe(productName, productMetadataKey);

        return {
            ...prevMetadata,
            [formattedProductMetadataKey]: productMetadataValue
        };
    }, {});

const formatMetadata = products => {
    const formattedMetadata = products.reduce((prevMetadata, {productName, productType, selectedPricing: { purchaseType }}) => {
        const { s3Keys } = getProductData(productName, productType);
        const productMetadata = {
            productName,
            productType,
            purchaseType,
            s3Key: s3Keys[purchaseType]
        };
        const formattedProductMetadata = formatProductMetadata(productName, productMetadata);
        
        return {
            ...prevMetadata,
            ...formattedProductMetadata
        };
    }, {});

    return formattedMetadata;
};

const formatCheckoutProducts = metadata => {
    const metadataByProduct = Object.keys(metadata).reduce((prevProducts, metadataKey) => {
        const metadataValue = metadata[metadataKey];
        const { productName, fieldKey } = formatMetadataKeyFromStripe(metadataKey);
        
        //organize metadata by productName
        return {
            ...prevProducts,
            [productName]: {
                ...prevProducts[productName],
                [fieldKey]: metadataValue
            }
        };
    }, {});

    //refactor into array of products
    const formattedCheckoutProducts = Object.keys(metadataByProduct).map(productKey => {
        const product = metadataByProduct[productKey];

        return product;
    });

    return formattedCheckoutProducts;
};

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
    const metadata = formatMetadata(products);
    const {
        success_url,
        cancel_url
    } = validateCheckoutReturnUrls(successUrl, cancelUrl, host);
    const formattedCheckoutSessionData = {
        line_items,
        mode: sessionModes.payment,
        success_url,
        cancel_url,
        metadata
    };

    return formattedCheckoutSessionData;
};

const updatePurchasedProductsData = (eventId, { email, name }, products) =>
    products.forEach(({ productName, productType, purchaseType }) => {
        const productData = getProductData(productName, productType);
        const purchaseData = {
            eventId,
            email,
            name
        };

        // update product data
        productData.purchases[purchaseType].push(purchaseData);

        // write product data
        writeProductData(productData);
    });

const formatUploadFieldsForMulter = uploadFields => Object.keys(uploadFields).map(uploadFieldKey => {
    const { maxCount } = uploadFields[uploadFieldKey];
    const formattedUploadField = {
        name: uploadFieldKey,
        maxCount
    };

    return formattedUploadField;
});

module.exports = {
    createProduct,
    formatProductData,
    writeProductData,
    updateProductIndexData,
    getProductDataPath,
    getAllProductsData,
    formatCheckoutSessionData,
    uploadS3Products,
    saveLocalProductFiles,
    formatFilesByDestination,
    getProductData,
    updatePurchasedProductsData,
    formatCheckoutProducts,
    formatUploadFieldsForMulter
};