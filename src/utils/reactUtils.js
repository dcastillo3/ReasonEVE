import _ from 'lodash/core';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const formatPriceDisplay = price => `$${price}`;

const formatArtistNames = (artistName, additionalArtistNames) =>
    `${artistName}${additionalArtistNames && `, ${additionalArtistNames}`}`;

const getPlayButtonIcon = (product, currTrack, trackPlaying) => 
    trackPlaying && (product.productName === currTrack.productName) ? PauseCircleIcon : PlayCircleIcon;

export {
    formatPriceDisplay,
    formatArtistNames,
    getPlayButtonIcon
};