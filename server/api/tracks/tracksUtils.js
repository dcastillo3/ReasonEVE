const { trackPurchaseTypes } = require("./tracksConsts");

const buildTrackName = ({productName, artistName, additionalArtistNames}, type) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`} - ${productName} | ${type}`;

const getTrackProductParams = (productData, { coverArt }) => {
    const {
        mp3Price,
        leasePrice,
        exclusivePrice,
        description
    } = productData;
    const coverArtUrls = [ coverArt ];
    let trackProductData = [
        {
            name: buildTrackName(productData, trackPurchaseTypes.mp3),
            description,
            price: mp3Price,
            images: coverArtUrls
        },
        {
            name: buildTrackName(productData, trackPurchaseTypes.lease),
            description,
            price: leasePrice,
            images: coverArtUrls
        },
        {
            name: buildTrackName(productData, trackPurchaseTypes.exclusive),
            description,
            price: exclusivePrice,
            images: coverArtUrls
        }
    ];

    return trackProductData;
};

const getTrackProductIds = stripeProducts => stripeProducts.reduce((prevValue, {name, default_price}) => {
    const productType = name.split('| ')[1];
    const trackId = {
        [productType]: default_price.id,
        ...prevValue
    };

    return trackId;
}, {});

const buildTrackProductPricing = (stripeProducts, {mp3Price, leasePrice, exclusivePrice}) => {
    const trackProductIds = getTrackProductIds(stripeProducts);
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