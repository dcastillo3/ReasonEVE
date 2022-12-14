import React from 'react';
import _ from 'lodash/core';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './track.css';
import { Box } from '../styled';

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
        <Box>{trackName}</Box>
    );
};

export default Track;