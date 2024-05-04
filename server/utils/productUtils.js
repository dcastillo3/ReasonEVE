const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { createStripeProduct } = require('../stripe/stripe');
const { storageConfigs, sessionModes, errorMessages, services } = require('./consts');
const { buildTrackProductsParams, buildTrackProductPricing, getInitialTrackData } = require('../api/tracks/tracksUtils');
const { getFormattedDate, getUniqueId, serviceLog } = require('./utils');
const { track } = require('../api/tracks/tracksConsts');
const { uploadS3Product } = require('../aws/s3/s3');
const { ProductType, Artist, Track, Product, MediaFile, PurchaseType, S3Key, ProductPricing, AdditionalArtist, Playlist } = require('../sequelize/models');
const sequelize = require('../sequelize/config');
const { Op } = require("sequelize");

const buildProductsParams = (productData, productLinks) => {
    switch (productData.productType) {
        case track: {
            let trackProductsParams = buildTrackProductsParams(productData, productLinks);

            return trackProductsParams;
        };
    };
};

const createProducts = async (productData, productLinks) => {
    // Build params for each stripe product. Currently mp3, lease, and exclusive
    let productsParams = buildProductsParams(productData, productLinks);
    const stripeProducts = [];

    // Create each stripe product
    for(let i = 0; i < productsParams.length; i++) {
        let productParams = productsParams[i];
        const stripeProduct = await createStripeProduct(productParams);

        stripeProducts.push(stripeProduct);
    };

    return stripeProducts;
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

            serviceLog(services.fs, `Saved ${fileName} file`);

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

    serviceLog(services.fs, `Added ${productName} to ${productType} index`);
};

const writeProductData = productData => {
    const { productName, productType } = productData;
    const filePath = getProductDataPath(productName, productType);
    const fileData = JSON.stringify(productData, null, 4);

    //write product data
    fs.writeFileSync(filePath, fileData);

    serviceLog(services.fs, `Wrote ${productName} file`);

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

// Get all products data locally
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

// Get all products data from database
const getAllProductsDataV2 = async productType => {
    const productOptions = {
        attributes: [
            'id', 
            'active'
        ],
        include: [
            {
                model: ProductType,
                attributes: ['product_type']
            },
            { 
                model: Artist,
                attributes: ['name'],
            },
            { 
                model: AdditionalArtist,
                attributes: ['id'],
                include: [
                    {
                        model: Artist,
                        attributes: ['name']
                    }
                ] 
            },
            { 
                model: ProductPricing,
                attributes: [
                    'stripe_id',
                    'price'
                ],
                include: [
                    {
                        model: PurchaseType,
                        attributes: ['purchase_type']
                    }
                ]
            },
            { 
                model: MediaFile,
                attributes: [
                    'cover_art',
                    'preview'
                ]
            }
        ]
    };

    // If product type is track, include track details
    if (productType === track) {
        const trackWhere = { [Op.not]: [{ track_id: null }] };
        const trackInclude = [
            { 
                model: Track,
                attributes: { 
                    exclude: [
                        'id',
                        'createdAt', 
                        'updatedAt'
                    ] 
                }
            }
        ];

        productOptions.where = {...trackWhere, ...productOptions.where}
        productOptions.include = [...trackInclude, ...productOptions.include];
    };

    const productDetails = await Product.findAll(productOptions);

    serviceLog(services.sequelize, `Retrieved all products data for ${productType}`);

    return productDetails;
};

const formatProductsData = (productDetails) => {
    const formattedProductDetails = productDetails.map(productDetail => {
        const {
            id,
            active,
            product_type: { product_type: productType },
            artist: { name: artistName },
            additional_artists,
            product_pricings,
            media_file: { preview, cover_art: coverArt }
        } = productDetail.dataValues;
        const formattedAdditionalArtists = additional_artists.map(({ artist: { name } }) => name).join(', ');
        const formattedProductPricings = product_pricings.map(({
                purchase_type: { purchase_type },
                price,
                stripe_id
            }) => ({
                id: stripe_id,
                purchaseType: purchase_type,
                price
            })
        );
        let formattedProductDetails = {
            id,
            active,
            productType,
            artistName,
            additionalArtistNames: formattedAdditionalArtists,
            productPricing: formattedProductPricings,
            preview,
            coverArt
        };

        if(productDetail.track) {
            const { name, description } = productDetail.track;

            formattedProductDetails.productName = name;
            formattedProductDetails.description = description;
        };

        return formattedProductDetails;
    });

    return formattedProductDetails;
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

const saveProductData = async productData => {
    const { 
        productName,
        productType,
        artistName,
        additionalArtistNames,
        description,
        preview,
        coverArt,
        s3Keys,
        productPricing
    } = productData;

    // Use a transaction to ensure atomicity
    const createProduct = await sequelize.transaction(async transaction => {
        // Create product
        let productValues = {
            active: true,
            media_file: {
                preview,
                cover_art: coverArt,
            },
            playlist: {}
        };
        const productOptions = {
            include: [
                { model: MediaFile },
                { model: Playlist }
            ],
            transaction
        };
        
        if(productType === track) {
            const trackValues = {
                track: {
                    name: productName,
                    description
                }
            };
            const trackInclude = [
                { model: Track }
            ];

            productValues = { ...trackValues, ...productValues};
            productOptions.include = [ ...trackInclude, ...productOptions.include ];
        };
        
        const productInstance = await Product.create(productValues, productOptions);

        serviceLog(services.sequelize, `Created product ${productName} with media files, playlist entry and ${productType}`);

        // Create or find product type
        const productTypeOptions = {
            where: {
                product_type: productType
            },
            transaction
        };
        const [productTypeInstance] = await ProductType.findOrCreate(productTypeOptions);

        serviceLog(services.sequelize, `Created/found product type ${productType}`);

        // Create or find artist
        const artistOptions = {
            where: {
                name: artistName
            },
            transaction
        };
        const [artistInstance] = await Artist.findOrCreate(artistOptions);

        serviceLog(services.sequelize, `Created/found artist ${artistName}`);

        // Create or find additional artists
        const additionalArtistNamesArray = additionalArtistNames ? additionalArtistNames.split(', ') : [];
        const additionalArtistInstances = await Promise.all(
            additionalArtistNamesArray.map(async additionalArtistName => {
                const additionalArtistOptions = {
                    where: {
                        name: additionalArtistName
                    },
                    transaction
                };
                
                const [associatedArtistInstance] = await Artist.findOrCreate(additionalArtistOptions);
                
                const additionalArtistQuery = { 
                    artist_id: associatedArtistInstance.artist_id, 
                    product_id: productInstance.track_id 
                };

                const additionalArtistInstance = await AdditionalArtist.create(additionalArtistQuery, { transaction });

                return [associatedArtistInstance, additionalArtistInstance];
            })
        );

        serviceLog(services.sequelize, `Created/found additional artists ${additionalArtistNames}`);

        // Create s3 keys
        const s3KeyInstances = await Promise.all(
            Object.keys(s3Keys).map(async purchaseType => {
                // Create or find purchase type
                const purchaseTypeOptions = {
                    where: {
                        purchase_type: purchaseType
                    },
                    transaction
                };
                const [purchaseTypeInstance] = await PurchaseType.findOrCreate(purchaseTypeOptions);
                
                serviceLog(services.sequelize, `Created/found purchase type ${purchaseType}`);
                
                // Create s3 key
                const s3Key = s3Keys[purchaseType];
                const s3KeyValues = {
                    s3_key: s3Key
                };
                const s3KeyInstance = await S3Key.create(s3KeyValues, { transaction });

                serviceLog(services.sequelize, `Created s3 key ${s3Key}`);
                
                // Associate s3 key with purchase type
                await s3KeyInstance.setPurchase_type(purchaseTypeInstance, { transaction });
                
                serviceLog(services.sequelize, `Associated s3 key ${s3Key} with purchase type ${purchaseType}`);

                return s3KeyInstance;
            })
        );

        serviceLog(services.sequelize, `Created s3 keys`);

        // Create product pricings
        const productPricingInstances = await Promise.all(
            productPricing.map(async ({ id: stripe_id, purchaseType, price }) => {
                // Create or find purchase type
                const purchaseTypeOptions = {
                    where: {
                        purchase_type: purchaseType
                    },
                    transaction
                };
                const [purchaseTypeInstance] = await PurchaseType.findOrCreate(purchaseTypeOptions);
                
                serviceLog(services.sequelize, `Created/found purchase type ${purchaseType}`);
                
                // Create product pricing
                const numPrice = Number(price).toFixed(2);
                const productPricingValues = {
                    stripe_id,
                    price: numPrice
                };
                const productPricingInstance = await ProductPricing.create(productPricingValues, { transaction });
                
                serviceLog(services.sequelize, `Created product pricing ${stripe_id}`);

                // Associate product pricing with purchase type
                await productPricingInstance.setPurchase_type(purchaseTypeInstance, { transaction });
                
                serviceLog(services.sequelize, `Associated product pricing ${stripe_id} with purchase type ${purchaseType}`);

                return productPricingInstance;
            })
        );
        
        serviceLog(services.sequelize, `Created product pricings`);

        // Associate the created product and product type
        await productInstance.setProduct_type(productTypeInstance, { transaction });

        serviceLog(services.sequelize, `Associated product ${productName} with product type ${productType}`);

        // Associate the created product and artist
        await productInstance.setArtist(artistInstance, { transaction });
        
        serviceLog(services.sequelize, `Associated product ${productName} with artist ${artistName}`);

        // Associate the created product and additional artists
        if (!_.isEmpty(additionalArtistInstances)) {
            additionalArtistInstances.forEach(async ([associatedArtistInstance, additionalArtistInstance]) => {
                // Associate the additional artist with the artist
                await additionalArtistInstance.setArtist(associatedArtistInstance, { transaction });
                // Associate the created product and additional artist
                await productInstance.addAdditional_artists(additionalArtistInstance, { transaction });
            });
        }  
        
        serviceLog(services.sequelize, `Associated product ${productName} with additional artists ${additionalArtistNames}`);
        
        // Associate the created product and s3 keys
        await productInstance.addS3_keys(s3KeyInstances, { transaction });
        
        serviceLog(services.sequelize, `Associated product ${productName} with s3 keys`);

        // Associate the created product and product pricings
        await productInstance.addProduct_pricings(productPricingInstances, { transaction });
        
        serviceLog(services.sequelize, `Associated product ${productName} with product pricings`);

        return productInstance;
    });

    serviceLog(services.sequelize, `Successfully saved product data for ${productName}`);

    return createProduct;
};

module.exports = {
    createProducts,
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
    formatUploadFieldsForMulter,
    saveProductData,
    getAllProductsDataV2,
    formatProductsData
};