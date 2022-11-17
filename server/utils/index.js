const { createStripeProduct } = require("../stripe");

const getTrackName = ({trackName, artistName, additionalArtistNames}) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`} - ${trackName}`;

const createTrackProducts = async (trackData) => {
    const {
        mp3Price,
        leasePrice,
        exclusivePrice
    } = trackData;
    const trackName = getTrackName(trackData);
    const mp3TrackName = `${trackName} | mp3`;
    const leaseTrackName = `${trackName} | lease`;
    const exclusiveTrackName = `${trackName} | exclusive`;
    const trackProducts = {
        mp3Product: await createStripeProduct(mp3TrackName, mp3Price),
        leaseProduct: await createStripeProduct(leaseTrackName, leasePrice),
        exclusiveProduct: await createStripeProduct(exclusiveTrackName, exclusivePrice)
    };

    return trackProducts;
};

module.exports = {
    getTrackName,
    createTrackProducts
};