import React from 'react';
import {
    Route,
    Routes
} from 'react-router-dom';
import { Tracks } from './tracks';
import { Packs } from './packs';
import { Checkout } from './checkout';

function MainRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<Tracks />} />
            <Route exact path="/tracks" element={<Tracks />} />
            <Route exact path="/packs" element={<Packs />} />
            <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
    );
};

export default MainRoutes;