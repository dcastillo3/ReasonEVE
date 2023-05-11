import _ from 'lodash/core';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { productCardButtonStatus } from './consts';
import { buttonProps } from '../components/styled';

const formatPriceDisplay = price => `$${price}`;

const formatArtistNames = (artistName, additionalArtistNames) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`}`;

const getPlayButtonIcon = (product, currTrack, trackPlaying) => 
    trackPlaying && (product.productName === currTrack.productName) ? PauseCircleIcon : PlayCircleIcon;

const getCartButtonVariant = (product, cart) => {
    const productInCart = cart.some(({ productName }) => productName === product.productName);
    const cartButtonVariant = productInCart ? buttonProps.variant.background : buttonProps.variant.primary;

    return cartButtonVariant;
};

const getCartButtonText = (product, cart) => {
    const { active } = product;

    //Product is active
    if (active) {     
        const productInCart = cart.some(({ productName }) => productName === product.productName);
        const productCardButtonText = productInCart
            ? productCardButtonStatus.incart
            : productCardButtonStatus.available;

        return productCardButtonText;
        //Exclusive product has been sold
    } else return productCardButtonStatus.sold;
};

export {
    formatPriceDisplay,
    formatArtistNames,
    getPlayButtonIcon,
    getCartButtonVariant,
    getCartButtonText
};