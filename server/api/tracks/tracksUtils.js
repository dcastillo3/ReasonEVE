const buildTrackName = ({trackName, artistName, additionalArtistNames}, type) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`} - ${trackName} | ${type}`;

const getTrackProductParams = productData => {
    const {
        mp3Price,
        leasePrice,
        exclusivePrice
    } = productData;
    let trackProductData = [
        {
            name: buildTrackName(productData, 'mp3'),
            price: mp3Price
        },
        {
            name: buildTrackName(productData, 'lease'),
            price: leasePrice
        },
        {
            name: buildTrackName(productData, 'exclusive'),
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

module.exports = {
    getTrackProductParams,
    getTrackProductIds
};