import _ from 'lodash/core';

const formatPriceDisplay = price => `$${price}`;

const formatCartItem = (productPricingItem, product) => ({
    ...product,
    selectedPricing: productPricingItem
});

const formatArtistNames = (artistName, additionalArtistNames) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`}`;

export {
    formatPriceDisplay,
    formatCartItem,
    formatArtistNames
};