const { trackPurchaseTypes } = require("./tracksConsts");

const buildTrackName = ({productName, artistName, additionalArtistNames}, type) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`} - ${productName} | ${type}`;

const getTrackProductParams = productData => {
    const {
        mp3Price,
        leasePrice,
        exclusivePrice
    } = productData;
    let trackProductData = [
        {
            name: buildTrackName(productData, trackPurchaseTypes.mp3),
            price: mp3Price
        },
        {
            name: buildTrackName(productData, trackPurchaseTypes.lease),
            price: leasePrice
        },
        {
            name: buildTrackName(productData, trackPurchaseTypes.exclusive),
            price: exclusivePrice
        }
    ];

    return trackProductData;
};

const getTrackProductIds = products => products.reduce((prevValue, {name, default_price}) => {
    const productId = name.split('| ')[1];
    const trackId = {
        [productId]: default_price.id,
        ...prevValue
    };

    return trackId;
}, {});

const buildTrackProductPricing = (products, {mp3Price, leasePrice, exclusivePrice}) => {
    const trackProductIds = getTrackProductIds(products);
    //Sort productPricing as: mp3, lease, exclusive
    const productPricing = [
        {
            id: trackProductIds.mp3,
            purchaseType: trackPurchaseTypes.mp3,
            price: mp3Price
        },
        {
            id: trackProductIds.lease,
            purchaseType: trackPurchaseTypes.lease,
            price: leasePrice
        },
        {
            id: trackProductIds.exclusive,
            purchaseType: trackPurchaseTypes.exclusive,
            price: exclusivePrice
        }
    ];

    return productPricing;
};

const getInitialTrackData = ({mp3Price, leasePrice, exclusivePrice, ...InitialTrackData}) => InitialTrackData;

module.exports = {
    getTrackProductParams,
    buildTrackProductPricing,
    getInitialTrackData
};