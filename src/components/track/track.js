import React from 'react';
import _ from 'lodash/core';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './track.css';

function Track({ track }) {
    const {
        artistName,
        additionalArtistNames,
        trackName,
        mp3Price,
        leasePrice,
        exclusivePrice,
        coverArt
    } = track;

    return (
        <div>{trackName}</div>
    );
};

export default Track;